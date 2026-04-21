import json
import os
import psycopg2
import smtplib
from email.mime.text import MIMEText


def send_email(name: str, phone: str, comment: str, lead_id: int):
    msg = MIMEText(
        f"Новая заявка #{lead_id}\n\n"
        f"Имя: {name}\n"
        f"Телефон: {phone}\n"
        f"Комментарий: {comment or '—'}",
        "plain",
        "utf-8"
    )
    msg["Subject"] = f"Новая заявка с сайта — {name}"
    msg["From"] = "960188@list.ru"
    msg["To"] = "960188@list.ru"

    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as smtp:
        smtp.login("960188@list.ru", os.environ["MAIL_PASSWORD"])
        smtp.send_message(msg)


def handler(event: dict, context) -> dict:
    """Сохраняет заявку от клиента в базу данных и отправляет уведомление на почту."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = (body.get('name') or '').strip()
    phone = (body.get('phone') or '').strip()
    comment = (body.get('comment') or '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'}, ensure_ascii=False)
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO leads (name, phone, comment) VALUES (%s, %s, %s) RETURNING id",
        (name, phone, comment)
    )
    lead_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    send_email(name, phone, comment, lead_id)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'id': lead_id}, ensure_ascii=False)
    }
