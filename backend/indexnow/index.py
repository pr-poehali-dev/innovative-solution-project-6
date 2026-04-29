import json
import urllib.request
import urllib.error

INDEXNOW_KEY = 'a7f3k9m2p4q8r5n1'
HOST = 'xn--80aafz3bni.xn--p1ai'
KEY_LOCATION = f'https://{HOST}/{INDEXNOW_KEY}.txt'


def handler(event: dict, context) -> dict:
    '''
    Отправка URL в IndexNow (Яндекс) для мгновенной индексации.
    POST: { "urls": ["https://xn--80aafz3bni.xn--p1ai/page1", ...] }
    Принимает один или несколько URL и отправляет их в Яндекс.
    '''
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Method not allowed'})
        }

    body_str = event.get('body', '{}') or '{}'
    body = json.loads(body_str)
    urls = body.get('urls', [])

    if isinstance(urls, str):
        urls = [urls]

    if not urls:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'urls required'})
        }

    payload = {
        'host': HOST,
        'key': INDEXNOW_KEY,
        'keyLocation': KEY_LOCATION,
        'urlList': urls
    }

    req = urllib.request.Request(
        'https://yandex.com/indexnow',
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json; charset=utf-8'},
        method='POST'
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            status = resp.status
            response_body = resp.read().decode('utf-8', errors='ignore')
    except urllib.error.HTTPError as e:
        status = e.code
        response_body = e.read().decode('utf-8', errors='ignore')
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': str(e)})
        }

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({
            'success': status in (200, 202),
            'yandex_status': status,
            'sent_urls': len(urls),
            'response': response_body
        })
    }
