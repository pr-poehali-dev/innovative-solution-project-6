import json
import re
import urllib.request
import urllib.error

INDEXNOW_KEY = 'a7f3k9m2p4q8r5n1'
HOST = 'xn--80aafz3bni.xn--p1ai'
KEY_LOCATION = f'https://{HOST}/{INDEXNOW_KEY}.txt'
SITEMAP_URL = f'https://{HOST}/sitemap.xml'


def fetch_sitemap_urls() -> list:
    req = urllib.request.Request(SITEMAP_URL, headers={'User-Agent': 'IndexNow-Bot'})
    with urllib.request.urlopen(req, timeout=15) as resp:
        xml = resp.read().decode('utf-8', errors='ignore')
    return re.findall(r'<loc>([^<]+)</loc>', xml)


def _send_indexnow(endpoint: str, urls: list) -> dict:
    payload = {
        'host': HOST,
        'key': INDEXNOW_KEY,
        'keyLocation': KEY_LOCATION,
        'urlList': urls
    }
    req = urllib.request.Request(
        endpoint,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json; charset=utf-8'},
        method='POST'
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return {'status': resp.status, 'body': resp.read().decode('utf-8', errors='ignore')}
    except urllib.error.HTTPError as e:
        return {'status': e.code, 'body': e.read().decode('utf-8', errors='ignore')}
    except Exception as e:
        return {'status': 0, 'body': str(e)}


def send_to_yandex(urls: list) -> dict:
    return _send_indexnow('https://yandex.com/indexnow', urls)


def send_to_bing(urls: list) -> dict:
    return _send_indexnow('https://www.bing.com/indexnow', urls)


def send_to_indexnow_org(urls: list) -> dict:
    return _send_indexnow('https://api.indexnow.org/indexnow', urls)


def handler(event: dict, context) -> dict:
    '''
    Отправка URL в IndexNow для Яндекса, Bing и общего пула IndexNow.org.
    POST { "urls": ["..."] } — отправить конкретные URL.
    POST { "all": true } — прочитать sitemap.xml и отправить все URL разом.
    Bing IndexNow используется Bing/Yahoo/DuckDuckGo/Ecosia.
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
    send_all = body.get('all', False)

    if send_all:
        try:
            urls = fetch_sitemap_urls()
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': cors_headers,
                'body': json.dumps({'error': f'sitemap fetch failed: {e}'})
            }

    if isinstance(urls, str):
        urls = [urls]

    if not urls:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'urls required'})
        }

    yandex_result = send_to_yandex(urls)
    bing_result = send_to_bing(urls)
    org_result = send_to_indexnow_org(urls)

    any_ok = (
        yandex_result['status'] in (200, 202)
        or bing_result['status'] in (200, 202)
        or org_result['status'] in (200, 202)
    )

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({
            'success': any_ok,
            'yandex_status': yandex_result['status'],
            'bing_status': bing_result['status'],
            'indexnow_org_status': org_result['status'],
            'sent_urls': len(urls),
            'response': yandex_result['body'],
            'bing_response': bing_result['body'],
            'indexnow_org_response': org_result['body']
        })
    }