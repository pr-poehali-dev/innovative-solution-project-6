import json
import os
import re
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


REQUISITES_HTML = """
<div style="font-family: Arial, sans-serif; color: #111; max-width: 640px; margin: 0 auto; padding: 24px;">
  <div style="text-align: center; margin-bottom: 24px;">
    <h1 style="font-size: 20px; margin: 0 0 4px; color: #111;">ООО «ФАВОРИТ»</h1>
    <p style="font-size: 13px; color: #888; margin: 0;">Реквизиты организации</p>
  </div>
  <table style="width: 100%; border-collapse: collapse;">
    <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 6px; font-size: 12px; color: #888; width: 40%;">Полное название</td><td style="padding: 10px 6px; font-weight: 500;">Общество с ограниченной ответственностью «ФАВОРИТ»</td></tr>
    <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 6px; font-size: 12px; color: #888;">Сокращённое</td><td style="padding: 10px 6px; font-weight: 500;">ООО «ФАВОРИТ»</td></tr>
    <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 6px; font-size: 12px; color: #888;">ИНН / КПП</td><td style="padding: 10px 6px; font-weight: 500;">5250077990 / 525001001</td></tr>
    <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 6px; font-size: 12px; color: #888;">ОГРН</td><td style="padding: 10px 6px; font-weight: 500;">1235200013531</td></tr>
    <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 6px; font-size: 12px; color: #888;">Юридический адрес</td><td style="padding: 10px 6px; font-weight: 500;">607657, Нижегородская обл., Кстовский М.О., г. Кстово, 6-й м-он, д. 2, офис 13</td></tr>
    <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 6px; font-size: 12px; color: #888;">Расчётный счёт</td><td style="padding: 10px 6px; font-weight: 500;">40702810316020000009</td></tr>
    <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 6px; font-size: 12px; color: #888;">Банк</td><td style="padding: 10px 6px; font-weight: 500;">АО «АЛЬФА-БАНК»</td></tr>
    <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 6px; font-size: 12px; color: #888;">Корр. счёт</td><td style="padding: 10px 6px; font-weight: 500;">30101810200000000593</td></tr>
    <tr><td style="padding: 10px 6px; font-size: 12px; color: #888;">БИК</td><td style="padding: 10px 6px; font-weight: 500;">044525593</td></tr>
  </table>
  <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #ddd; text-align: center; font-size: 12px; color: #666;">
    <strong style="color: #111; font-size: 14px; display: block; margin-bottom: 4px;">Связаться с нами</strong>
    Телефон: +7 960 169-09-90 · Нижний Новгород, Шуваловский проезд, 7<br/>
    Работаем без выходных · Подача техники от 1 часа
  </div>
</div>
"""

REQUISITES_TEXT = """ООО «ФАВОРИТ» — Реквизиты организации

Полное название: Общество с ограниченной ответственностью «ФАВОРИТ»
Сокращённое: ООО «ФАВОРИТ»
ИНН / КПП: 5250077990 / 525001001
ОГРН: 1235200013531
Юридический адрес: 607657, Нижегородская обл., Кстовский М.О., г. Кстово, 6-й м-он, д. 2, офис 13
Расчётный счёт: 40702810316020000009
Банк: АО «АЛЬФА-БАНК»
Корр. счёт: 30101810200000000593
БИК: 044525593

Контакты: +7 960 169-09-90, Нижний Новгород, Шуваловский проезд, 7"""


def is_valid_email(email: str) -> bool:
    return bool(re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email))


def handler(event: dict, context) -> dict:
    """Отправляет реквизиты ООО ФАВОРИТ на указанный email."""

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
    email = (body.get('email') or '').strip()

    if not email or not is_valid_email(email):
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Укажите корректный email'}, ensure_ascii=False)
        }

    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Реквизиты ООО «ФАВОРИТ»'
    msg['From'] = '960188@list.ru'
    msg['To'] = email
    msg.attach(MIMEText(REQUISITES_TEXT, 'plain', 'utf-8'))
    msg.attach(MIMEText(REQUISITES_HTML, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as smtp:
        smtp.login('960188@list.ru', os.environ['MAIL_PASSWORD'])
        smtp.send_message(msg)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True}, ensure_ascii=False)
    }
