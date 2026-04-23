import json
import os
import io
import urllib.request
import boto3
from PIL import Image


def handler(event: dict, context) -> dict:
    '''
    Business: конвертирует список картинок (URL) в webp и загружает в S3.
    Args: event с httpMethod POST и body {urls: [url, ...], quality?: 82}
    Returns: {mapping: {original_url: new_webp_url}}
    '''
    method = event.get('httpMethod', 'GET')
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

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    urls = body.get('urls') or []
    quality = int(body.get('quality', 82))

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    access_key = os.environ['AWS_ACCESS_KEY_ID']

    mapping = {}
    errors = []

    for url in urls:
        try:
            with urllib.request.urlopen(url, timeout=15) as r:
                raw = r.read()
            img = Image.open(io.BytesIO(raw))
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            out = io.BytesIO()
            img.save(out, 'WEBP', quality=quality, method=6)
            out.seek(0)

            filename = url.rstrip('/').split('/')[-1].rsplit('.', 1)[0] + '.webp'
            key = f'webp/{filename}'
            s3.put_object(
                Bucket='files',
                Key=key,
                Body=out.getvalue(),
                ContentType='image/webp',
                CacheControl='public, max-age=31536000, immutable',
            )
            mapping[url] = f'https://cdn.poehali.dev/projects/{access_key}/bucket/{key}'
        except Exception as e:
            errors.append({'url': url, 'error': str(e)})

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'mapping': mapping, 'errors': errors}),
    }
