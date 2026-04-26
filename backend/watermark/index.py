import json
import os
import io
import math
import urllib.request
import boto3
from PIL import Image, ImageDraw, ImageFont


def add_diagonal_watermark(image_bytes: bytes, text: str = 'фаварит.рф', opacity_pct: int = 10) -> bytes:
    """Накладывает диагональный повторяющийся водяной знак."""
    img = Image.open(io.BytesIO(image_bytes)).convert('RGBA')
    width, height = img.size

    txt_layer = Image.new('RGBA', (width, height), (255, 255, 255, 0))
    draw = ImageDraw.Draw(txt_layer)

    font_size = max(28, int(min(width, height) / 18))
    font = None
    font_paths = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf',
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                font = ImageFont.truetype(fp, font_size)
                break
            except Exception:
                continue
    if font is None:
        font = ImageFont.load_default()

    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]

    alpha = int(255 * opacity_pct / 100)

    diagonal = int(math.sqrt(width * width + height * height))
    step_x = int(text_w * 1.8)
    step_y = int(text_h * 5)

    big_layer = Image.new('RGBA', (diagonal, diagonal), (255, 255, 255, 0))
    big_draw = ImageDraw.Draw(big_layer)

    for y in range(0, diagonal, step_y):
        offset = (y // step_y) % 2 * (step_x // 2)
        for x in range(-step_x, diagonal, step_x):
            big_draw.text(
                (x + offset, y),
                text,
                font=font,
                fill=(255, 255, 255, alpha),
                stroke_width=2,
                stroke_fill=(0, 0, 0, int(alpha * 0.6))
            )

    rotated = big_layer.rotate(-30, resample=Image.BICUBIC, expand=False)

    rx, ry = rotated.size
    cx = (rx - width) // 2
    cy = (ry - height) // 2
    cropped = rotated.crop((cx, cy, cx + width, cy + height))

    watermarked = Image.alpha_composite(img, cropped)

    out = io.BytesIO()
    if watermarked.mode == 'RGBA':
        watermarked = watermarked.convert('RGB')
    watermarked.save(out, format='WEBP', quality=88, method=6)
    return out.getvalue()


def handler(event: dict, context) -> dict:
    """
    Накладывает водяной знак фаварит.рф на список картинок и заливает в S3.
    Возвращает маппинг старый URL → новый URL.
    """
    method = event.get('httpMethod', 'POST')
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    body_raw = event.get('body') or '{}'
    try:
        body = json.loads(body_raw) if isinstance(body_raw, str) else body_raw
    except Exception:
        body = {}

    urls = body.get('urls') or []
    text = body.get('text') or 'фаварит.рф'
    opacity = int(body.get('opacity') or 10)

    if not urls:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'urls required'}),
        }

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    results = []
    for url in urls:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = resp.read()

            wm_bytes = add_diagonal_watermark(data, text=text, opacity_pct=opacity)

            base = url.rstrip('/').split('/')[-1]
            name_no_ext = base.rsplit('.', 1)[0]
            new_key = f'wm/{name_no_ext}.webp'

            s3.put_object(
                Bucket='files',
                Key=new_key,
                Body=wm_bytes,
                ContentType='image/webp',
            )

            cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{new_key}"
            results.append({'old': url, 'new': cdn_url, 'ok': True})
        except Exception as e:
            results.append({'old': url, 'new': None, 'ok': False, 'error': str(e)})

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'results': results}, ensure_ascii=False),
    }
