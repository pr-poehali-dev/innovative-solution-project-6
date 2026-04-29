import json
import base64
import io
import urllib.request
from PIL import Image, ImageDraw, ImageFont


PHOTO_URL = 'https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/0971f110-23ca-4559-bcb8-7e40f7137c27.jpg'
LOGO_URL = 'https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/a0ccaed0-3d0e-42c5-b307-61b76dc08802.png'
PHONE = '+7 (960) 188-30-84'


def _fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=20) as resp:
        return resp.read()


def _font(size: int, bold: bool = False):
    candidates = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            continue
    return ImageFont.load_default()


def _make_banner() -> bytes:
    photo = Image.open(io.BytesIO(_fetch(PHOTO_URL))).convert('RGBA')
    logo = Image.open(io.BytesIO(_fetch(LOGO_URL))).convert('RGBA')

    W, H = photo.size
    canvas = photo.copy()

    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # ---- Логотип сверху-слева ----
    logo_w = int(W * 0.22)
    ratio = logo.height / logo.width
    logo_h = int(logo_w * ratio)
    logo_resized = logo.resize((logo_w, logo_h), Image.LANCZOS)
    lx = int(W * 0.025)
    ly = int(H * 0.04)
    pad = 10
    draw.rounded_rectangle(
        [lx - pad, ly - pad, lx + logo_w + pad, ly + logo_h + pad],
        radius=14,
        fill=(15, 23, 42, 220),
    )

    # ---- Нижняя плашка с градиентом ----
    bar_h = int(H * 0.18)
    bar_y = H - bar_h
    for i in range(bar_h):
        alpha = int(255 * (i / bar_h) ** 1.2 * 0.95)
        draw.rectangle([0, bar_y + i, W, bar_y + i + 1], fill=(15, 23, 42, alpha))

    # Акцентная золотая полоса
    accent_h = max(4, int(H * 0.005))
    draw.rectangle([0, bar_y, W, bar_y + accent_h], fill=(212, 164, 55, 255))

    canvas = Image.alpha_composite(canvas, overlay)
    canvas.paste(logo_resized, (lx, ly), logo_resized)

    # Текст рисуем в финале (без альфы)
    final = canvas.convert('RGB')
    fd = ImageDraw.Draw(final)

    caption_size = max(20, int(H * 0.028))
    caption_font = _font(caption_size, bold=True)
    cta_size = max(28, int(H * 0.045))
    cta_font = _font(cta_size, bold=True)
    phone_size = max(48, int(H * 0.075))
    phone_font = _font(phone_size, bold=True)

    cap_x = int(W * 0.04)
    cap_y = bar_y + int(bar_h * 0.22)
    fd.text((cap_x, cap_y), 'АРЕНДА МАНИПУЛЯТОРОВ · НИЖНИЙ НОВГОРОД',
            font=caption_font, fill=(212, 164, 55))

    cta_y = bar_y + int(bar_h * 0.55)
    fd.text((cap_x, cta_y), 'ЗВОНИТЕ:', font=cta_font, fill=(255, 255, 255))

    # Телефон справа
    phone_text = PHONE
    bbox = fd.textbbox((0, 0), phone_text, font=phone_font)
    phone_w = bbox[2] - bbox[0]
    phone_h = bbox[3] - bbox[1]
    phone_x = W - int(W * 0.04) - phone_w
    phone_y = bar_y + int(bar_h * 0.5) - phone_h // 2

    # Тень
    fd.text((phone_x + 3, phone_y + 3), phone_text, font=phone_font, fill=(0, 0, 0))
    fd.text((phone_x, phone_y), phone_text, font=phone_font, fill=(255, 255, 255))

    # Иконка телефона в круге слева от номера
    icon_d = int(phone_size * 1.0)
    icon_cx = phone_x - icon_d // 2 - 16
    icon_cy = phone_y + phone_h // 2
    fd.ellipse(
        [icon_cx - icon_d // 2, icon_cy - icon_d // 2,
         icon_cx + icon_d // 2, icon_cy + icon_d // 2],
        fill=(212, 164, 55),
    )
    icon_font = _font(int(icon_d * 0.7), bold=True)
    icon_text = '☎'
    ibbox = fd.textbbox((0, 0), icon_text, font=icon_font)
    iw = ibbox[2] - ibbox[0]
    ih = ibbox[3] - ibbox[1]
    fd.text((icon_cx - iw // 2, icon_cy - ih // 2 - 4),
            icon_text, font=icon_font, fill=(15, 23, 42))

    out = io.BytesIO()
    final.save(out, format='JPEG', quality=92, optimize=True)
    return out.getvalue()


def handler(event, context):
    '''
    Генерирует рекламный баннер для Яндекс Директ:
    фото манипулятора + логотип ООО Фаворит + телефон.
    Возвращает JPEG в base64.
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    img_bytes = _make_banner()
    b64 = base64.b64encode(img_bytes).decode('ascii')

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'image/jpeg',
            'Access-Control-Allow-Origin': '*',
        },
        'isBase64Encoded': True,
        'body': b64,
    }
