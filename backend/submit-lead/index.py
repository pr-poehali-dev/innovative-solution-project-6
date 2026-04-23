import json
import os
import psycopg2
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime


def build_email_body(name: str, phone: str, comment: str, lead_id: int) -> tuple[str, str]:
    """Формирует plain text и HTML версии письма."""
    now = datetime.now().strftime("%d.%m.%Y %H:%M")
    phone_digits = "".join(ch for ch in phone if ch.isdigit())
    tel_link = f"+{phone_digits}" if phone_digits else phone

    cargo_line_txt = ""
    cargo_block_html = ""
    if comment:
        cargo_line_txt = f"\n📦 Что перевозим:\n{comment}\n"
        cargo_block_html = (
            '<tr><td style="padding:14px 20px;background:#fff8e6;border-left:4px solid #e8a820;">'
            '<div style="font-size:12px;color:#8a6d1a;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:6px;">'
            '📦 Что перевозим'
            '</div>'
            f'<div style="font-size:16px;color:#1a1a1a;line-height:1.5;font-weight:500;">{comment}</div>'
            '</td></tr>'
        )
    else:
        cargo_block_html = (
            '<tr><td style="padding:12px 20px;background:#f5f5f5;color:#888;font-size:13px;font-style:italic;">'
            'Груз не указан — уточните у клиента'
            '</td></tr>'
        )

    text_body = (
        f"Новая заявка #{lead_id}\n"
        f"Время: {now}\n\n"
        f"👤 Имя: {name}\n"
        f"📞 Телефон: {phone}\n"
        f"{cargo_line_txt}\n"
        f"Перезвоните клиенту как можно скорее."
    )

    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:20px;background:#f4f4f4;font-family:Arial,sans-serif;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
        <tr>
          <td style="padding:20px 24px;background:linear-gradient(135deg,#e8a820 0%,#c8850a 100%);color:#000;">
            <div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;opacity:0.8;">Новая заявка с сайта</div>
            <div style="font-size:22px;font-weight:900;margin-top:4px;">Заявка #{lead_id}</div>
            <div style="font-size:13px;opacity:0.8;margin-top:4px;">{now}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px;">
            <div style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:4px;">👤 Имя</div>
            <div style="font-size:18px;color:#1a1a1a;font-weight:700;margin-bottom:18px;">{name}</div>
            <div style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:4px;">📞 Телефон</div>
            <div style="font-size:20px;margin-bottom:6px;">
              <a href="tel:{tel_link}" style="color:#c8850a;font-weight:800;text-decoration:none;">{phone}</a>
            </div>
          </td>
        </tr>
        {cargo_block_html}
        <tr>
          <td style="padding:20px;background:#fafafa;text-align:center;">
            <a href="tel:{tel_link}" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#f5d060 0%,#e8a820 50%,#c8850a 100%);color:#000;font-weight:900;text-decoration:none;border-radius:999px;font-size:15px;">
              📞 Перезвонить клиенту
            </a>
            <div style="font-size:12px;color:#888;margin-top:12px;">Письмо отправлено автоматически с сайта Фаворит НН</div>
          </td>
        </tr>
      </table>
    </body>
    </html>
    """

    return text_body, html_body


def send_email(name: str, phone: str, comment: str, lead_id: int):
    msg = MIMEMultipart("alternative")

    # Тема письма включает тип груза, если указан
    if comment:
        short_cargo = comment[:40] + ("…" if len(comment) > 40 else "")
        msg["Subject"] = f"Заявка #{lead_id}: {name} — {short_cargo}"
    else:
        msg["Subject"] = f"Заявка #{lead_id}: {name} — {phone}"

    msg["From"] = "960188@list.ru"
    msg["To"] = "960188@list.ru"

    text_body, html_body = build_email_body(name, phone, comment, lead_id)

    msg.attach(MIMEText(text_body, "plain", "utf-8"))
    msg.attach(MIMEText(html_body, "html", "utf-8"))

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

    try:
        send_email(name, phone, comment, lead_id)
    except Exception as e:
        print(f"Email send error: {e}")

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'id': lead_id}, ensure_ascii=False)
    }
