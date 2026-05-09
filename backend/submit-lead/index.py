import json
import os
import uuid
import psycopg2
import smtplib
import boto3
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from datetime import datetime


DIRECTOR_EMAIL = "Avrora.888@bk.ru"
SENDER_EMAIL = "960188@list.ru"


def esc(s) -> str:
    if s is None:
        return ""
    return (
        str(s)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def fld(value, placeholder: str = "_______________________________") -> str:
    if value and str(value).strip():
        return esc(str(value).strip())
    return placeholder


def format_date_long(iso: str) -> str:
    if not iso:
        return "«___» __________ 20___ г."
    try:
        parts = iso.split(".")
        if len(parts) == 3:
            day, month, year = parts
            months = [
                "января", "февраля", "марта", "апреля", "мая", "июня",
                "июля", "августа", "сентября", "октября", "ноября", "декабря",
            ]
            return f"«{day}» {months[int(month) - 1]} {year} г."
    except Exception:
        pass
    return esc(iso)


def build_contract_html(d: dict) -> str:
    body = f"""
    <h1 style="text-align:center;font-size:16pt;margin-bottom:8px;">ДОГОВОР АРЕНДЫ ТЕХНИКИ С ЭКИПАЖЕМ № {fld(d.get('contractNumber'), '___')}</h1>
    <p style="text-align:center;font-size:11pt;margin-bottom:18px;">г. Нижний Новгород · {format_date_long(d.get('date', ''))}</p>
    <p><b>Общество с ограниченной ответственностью «ФАВОРИТ»</b> (ИНН 5250077990, ОГРН 1235200013531), именуемое в дальнейшем «Арендодатель», в лице директора, действующего на основании Устава, с одной стороны, и <b>{fld(d.get('tenantName'))}</b>, в лице {fld(d.get('tenantSignatory'))}, именуемый(ая) в дальнейшем «Арендатор», с другой стороны, заключили настоящий договор о нижеследующем:</p>
    <h2>1. Предмет договора</h2>
    <p>1.1. Арендодатель предоставляет Арендатору во временное владение и пользование транспортное средство с экипажем — <b>{fld(d.get('technique'))}</b> для выполнения работ Арендатора по адресу: <b>{fld(d.get('workAddress'))}</b>.</p>
    <p>1.2. Арендодатель своими силами оказывает услуги по управлению техникой и её технической эксплуатации.</p>
    <h2>2. Стоимость и порядок оплаты</h2>
    <p>2.1. Стоимость аренды — <b>{fld(d.get('totalSum'), 'согласно действующему прайс-листу')}</b>.</p>
    <p>2.2. Минимальный заказ — 4 часа работы техники.</p>
    <p>2.3. Оплата производится наличными, переводом на расчётный счёт или картой. Для юр. лиц — по безналичному расчёту с НДС 22%.</p>
    <p>2.4. Закрывающие документы: акт выполненных работ, счёт-фактура, УПД (Диадок/СБИС).</p>
    <h2>3. Права и обязанности сторон</h2>
    <p>3.1. <b>Арендодатель обязуется:</b></p>
    <ul>
      <li>Подать исправную технику в согласованное время и место;</li>
      <li>Обеспечить квалифицированного оператора;</li>
      <li>Нести расходы по содержанию техники, ГСМ и страхованию;</li>
      <li>Соблюдать требования безопасности при выполнении работ.</li>
    </ul>
    <p>3.2. <b>Арендатор обязуется:</b></p>
    <ul>
      <li>Своевременно оплачивать услуги;</li>
      <li>Обеспечить условия для подъезда и работы техники;</li>
      <li>Не использовать технику для перевозки запрещённых грузов;</li>
      <li>Подписать акт выполненных работ по окончании смены.</li>
    </ul>
    <h2>4. Ответственность сторон</h2>
    <p>4.1. За несвоевременную оплату Арендатор уплачивает пени 0,1% от суммы задолженности за каждый день просрочки.</p>
    <p>4.2. Стороны освобождаются от ответственности при форс-мажоре.</p>
    <h2>5. Срок действия и прочие условия</h2>
    <p>5.1. Договор вступает в силу с момента подписания и действует до полного исполнения сторонами своих обязательств.</p>
    <p>5.2. Все споры решаются путём переговоров, а в случае недостижения согласия — в Арбитражном суде Нижегородской области.</p>
    <p>5.3. Договор составлен в 2-х экземплярах, имеющих равную юридическую силу.</p>
    <h2>6. Реквизиты сторон</h2>
    <table style="width:100%;border-collapse:collapse;margin-top:10px;">
      <tr>
        <td style="vertical-align:top;width:50%;padding:6px;border:1px solid #999;">
          <p><b>Арендодатель:</b></p>
          <p>ООО «ФАВОРИТ»</p>
          <p>ИНН 5250077990 / КПП 525001001</p>
          <p>ОГРН 1235200013531</p>
          <p>607657, Нижегородская обл., г. Кстово, 6-й м-он, д. 2, оф. 13</p>
          <p>Р/с 40702810316020000009</p>
          <p>АО «АЛЬФА-БАНК»</p>
          <p>К/с 30101810200000000593, БИК 044525593</p>
          <p>Тел.: +7 (960) 169-09-90</p>
          <p style="margin-top:30px;border-top:1px solid #000;padding-top:4px;">Директор ___________________ / ___________ /</p>
        </td>
        <td style="vertical-align:top;width:50%;padding:6px;border:1px solid #999;">
          <p><b>Арендатор:</b></p>
          <p>{fld(d.get('tenantName'))}</p>
          <p>ИНН {fld(d.get('tenantInn'), '_____________')} / КПП {fld(d.get('tenantKpp'), '___________')}</p>
          <p>ОГРН {fld(d.get('tenantOgrn'), '____________________________')}</p>
          <p>Адрес: {fld(d.get('tenantAddress'), '__________________________')}</p>
          <p>Р/с {fld(d.get('tenantAccount'), '_____________________________')}</p>
          <p>Банк: {fld(d.get('tenantBank'), '____________________________')}</p>
          <p>Тел.: {fld(d.get('tenantPhone'), '_____________________________')}</p>
          <p style="margin-top:30px;border-top:1px solid #000;padding-top:4px;">Подпись ___________________ / {fld(d.get('tenantSignatory'), '___________')} /</p>
        </td>
      </tr>
    </table>
    """
    return f"""<!DOCTYPE html>
<html lang="ru"><head><meta charset="utf-8" /><title>Договор аренды техники — ООО ФАВОРИТ</title>
<style>
@page {{ size: A4; margin: 18mm; }}
body {{ font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; padding: 20px; max-width: 800px; margin: 0 auto; background: #fff; }}
h1 {{ text-align: center; font-size: 16pt; margin-bottom: 8px; }}
h2 {{ font-size: 13pt; margin-top: 18px; margin-bottom: 6px; }}
p {{ margin: 4px 0; }}
ul {{ padding-left: 20px; margin: 6px 0; }}
table {{ border-collapse: collapse; }}
td, th {{ border: 1px solid #999; padding: 6px; vertical-align: top; }}
</style></head><body>{body}</body></html>"""


def upload_contract_to_s3(contract_html: str, contract_num: str, tenant: str) -> str:
    """Загружает HTML договора в S3 и возвращает публичную ссылку."""
    try:
        access_key = os.environ.get("AWS_ACCESS_KEY_ID")
        secret_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
        if not access_key or not secret_key:
            return ""

        s3 = boto3.client(
            "s3",
            endpoint_url="https://bucket.poehali.dev",
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
        )
        safe_tenant = "".join(ch if ch.isalnum() or ch in "-_" else "_" for ch in tenant)[:40]
        safe_num = "".join(ch if ch.isalnum() or ch in "-_" else "_" for ch in contract_num)[:20]
        key = f"contracts/{datetime.now().strftime('%Y%m%d')}-{safe_num}-{safe_tenant}-{uuid.uuid4().hex[:8]}.html"

        s3.put_object(
            Bucket="files",
            Key=key,
            Body=contract_html.encode("utf-8"),
            ContentType="text/html; charset=utf-8",
        )
        return f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"
    except Exception as e:
        print(f"S3 upload error: {e}")
        return ""


def send_contract_email(d: dict) -> None:
    now = datetime.now().strftime("%d.%m.%Y %H:%M")
    contract_html = build_contract_html(d)

    tenant = (d.get("tenantName") or "без имени").strip() or "без имени"
    contract_num = (d.get("contractNumber") or "шаблон").strip() or "шаблон"
    phone = d.get("tenantPhone") or "—"

    # Загружаем договор в S3 для онлайн-просмотра
    online_url = upload_contract_to_s3(contract_html, contract_num, tenant)

    online_block = ""
    online_text = ""
    if online_url:
        online_block = f"""
  <tr><td style="padding:20px;background:#f0f9ff;border-top:1px solid #d0e8f5;text-align:center;">
    <div style="font-size:12px;color:#0369a1;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:10px;">Открыть договор онлайн</div>
    <a href="{esc(online_url)}" target="_blank" style="display:inline-block;padding:14px 30px;background:linear-gradient(135deg,#0ea5e9 0%,#0369a1 100%);color:#fff;font-weight:900;text-decoration:none;border-radius:999px;font-size:15px;box-shadow:0 4px 12px rgba(14,165,233,0.3);">
      🔗 Посмотреть договор в браузере
    </a>
    <div style="font-size:11px;color:#666;margin-top:10px;">Открывается без скачивания · можно распечатать или сохранить в PDF</div>
  </td></tr>"""
        online_text = f"\n🔗 Открыть договор онлайн: {online_url}\n"

    email_html = f"""<!DOCTYPE html>
<html><body style="margin:0;padding:20px;background:#f4f4f4;font-family:Arial,sans-serif;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
  <tr><td style="padding:20px 24px;background:linear-gradient(135deg,#e8a820 0%,#c8850a 100%);color:#000;">
    <div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;opacity:0.8;">Новый заполненный договор</div>
    <div style="font-size:22px;font-weight:900;margin-top:4px;">Договор № {esc(contract_num)}</div>
    <div style="font-size:13px;opacity:0.8;margin-top:4px;">{now}</div>
  </td></tr>
  <tr><td style="padding:20px;">
    <div style="font-size:13px;color:#888;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:6px;">Арендатор</div>
    <div style="font-size:17px;color:#1a1a1a;font-weight:700;margin-bottom:14px;">{esc(tenant)}</div>
    <table cellpadding="6" style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="color:#666;width:40%;">ИНН</td><td><b>{esc(d.get('tenantInn') or '—')}</b></td></tr>
      <tr><td style="color:#666;">КПП</td><td>{esc(d.get('tenantKpp') or '—')}</td></tr>
      <tr><td style="color:#666;">ОГРН</td><td>{esc(d.get('tenantOgrn') or '—')}</td></tr>
      <tr><td style="color:#666;">Телефон</td><td><a href="tel:{esc(phone)}" style="color:#c8850a;font-weight:700;">{esc(phone)}</a></td></tr>
      <tr><td style="color:#666;">Адрес</td><td>{esc(d.get('tenantAddress') or '—')}</td></tr>
      <tr><td style="color:#666;">Подписант</td><td>{esc(d.get('tenantSignatory') or '—')}</td></tr>
      <tr><td style="color:#666;">Расч. счёт</td><td>{esc(d.get('tenantAccount') or '—')}</td></tr>
      <tr><td style="color:#666;">Банк</td><td>{esc(d.get('tenantBank') or '—')}</td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:14px 20px;background:#fff8e6;border-top:1px solid #f0e0b0;">
    <div style="font-size:13px;color:#8a6d1a;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:8px;">Параметры аренды</div>
    <div style="font-size:14px;line-height:1.6;color:#1a1a1a;">
      <b>Техника:</b> {esc(d.get('technique') or '—')}<br/>
      <b>Адрес работ:</b> {esc(d.get('workAddress') or '—')}<br/>
      <b>Стоимость:</b> {esc(d.get('totalSum') or '—')}
    </div>
  </td></tr>
{online_block}
  <tr><td style="padding:18px 20px;background:#fafafa;text-align:center;border-top:1px solid #eee;">
    <div style="font-size:13px;color:#444;margin-bottom:10px;">Договор также приложен к письму в формате HTML — можно скачать, распечатать или сохранить в PDF.</div>
    <a href="tel:{esc(phone)}" style="display:inline-block;padding:10px 22px;background:linear-gradient(135deg,#f5d060 0%,#e8a820 50%,#c8850a 100%);color:#000;font-weight:900;text-decoration:none;border-radius:999px;font-size:14px;">📞 Перезвонить клиенту</a>
  </td></tr>
</table></body></html>"""

    msg = MIMEMultipart("mixed")
    msg["Subject"] = f"Договор аренды № {contract_num}: {tenant}"
    msg["From"] = SENDER_EMAIL
    msg["To"] = DIRECTOR_EMAIL

    alt = MIMEMultipart("alternative")
    text_body = (
        f"Новый заполненный договор № {contract_num}\nВремя: {now}\n\n"
        f"Арендатор: {tenant}\nИНН: {d.get('tenantInn') or '—'}\n"
        f"Телефон: {phone}\nАдрес: {d.get('tenantAddress') or '—'}\n\n"
        f"Техника: {d.get('technique') or '—'}\n"
        f"Адрес работ: {d.get('workAddress') or '—'}\n"
        f"Стоимость: {d.get('totalSum') or '—'}\n"
        f"{online_text}\n"
        f"К письму также приложен готовый договор."
    )
    alt.attach(MIMEText(text_body, "plain", "utf-8"))
    alt.attach(MIMEText(email_html, "html", "utf-8"))
    msg.attach(alt)

    attachment = MIMEApplication(contract_html.encode("utf-8"), _subtype="html")
    safe_tenant = "".join(ch if ch.isalnum() or ch in "-_" else "_" for ch in tenant)[:40]
    filename = f"Dogovor-{contract_num}-{safe_tenant}.html"
    attachment.add_header("Content-Disposition", "attachment", filename=filename)
    msg.attach(attachment)

    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as smtp:
        smtp.login(SENDER_EMAIL, os.environ["MAIL_PASSWORD"])
        smtp.send_message(msg)


def parse_comment(comment: str) -> dict:
    """Разбирает строку комментария вида 'Груз: ... · Откуда: ... · Куда: ...' на части."""
    parts = {"cargo": "", "from": "", "to": "", "rest": ""}
    if not comment:
        return parts
    chunks = [c.strip() for c in comment.split("·")]
    rest_lines = []
    for chunk in chunks:
        low = chunk.lower()
        if low.startswith("груз:"):
            parts["cargo"] = chunk[5:].strip()
        elif low.startswith("откуда:"):
            parts["from"] = chunk[7:].strip()
        elif low.startswith("куда:"):
            parts["to"] = chunk[5:].strip()
        elif chunk:
            rest_lines.append(chunk)
    parts["rest"] = " · ".join(rest_lines)
    return parts


def build_email_body(name: str, phone: str, comment: str, lead_id: int) -> tuple[str, str]:
    """Формирует plain text и HTML версии письма."""
    now = datetime.now().strftime("%d.%m.%Y %H:%M")
    phone_digits = "".join(ch for ch in phone if ch.isdigit())
    tel_link = f"+{phone_digits}" if phone_digits else phone

    parsed = parse_comment(comment)
    cargo_text = parsed["cargo"] or parsed["rest"] or comment
    from_addr = parsed["from"]
    to_addr = parsed["to"]

    cargo_line_txt = ""
    cargo_block_html = ""
    if cargo_text:
        cargo_line_txt = f"\n📦 Что перевозим:\n{cargo_text}\n"
        cargo_block_html = (
            '<tr><td style="padding:14px 20px;background:#fff8e6;border-left:4px solid #e8a820;">'
            '<div style="font-size:12px;color:#8a6d1a;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:6px;">'
            '📦 Что перевозим / нюансы'
            '</div>'
            f'<div style="font-size:16px;color:#1a1a1a;line-height:1.5;font-weight:500;">{cargo_text}</div>'
            '</td></tr>'
        )
    else:
        cargo_block_html = (
            '<tr><td style="padding:12px 20px;background:#f5f5f5;color:#888;font-size:13px;font-style:italic;">'
            'Груз не указан — уточните у клиента'
            '</td></tr>'
        )

    route_block_html = ""
    route_line_txt = ""
    if from_addr or to_addr:
        from_html = from_addr or '<span style="color:#aaa;">—</span>'
        to_html = to_addr or '<span style="color:#aaa;">—</span>'
        route_block_html = (
            '<tr><td style="padding:14px 20px;background:#f0f9ff;border-left:4px solid #0ea5e9;">'
            '<div style="font-size:12px;color:#0369a1;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:8px;">'
            '🗺 Маршрут'
            '</div>'
            f'<div style="font-size:14px;color:#1a1a1a;line-height:1.6;"><b>Откуда:</b> {from_html}</div>'
            f'<div style="font-size:14px;color:#1a1a1a;line-height:1.6;"><b>Куда:</b> {to_html}</div>'
            '</td></tr>'
        )
        route_line_txt = (
            f"\n🗺 Маршрут:\n"
            f"  Откуда: {from_addr or '—'}\n"
            f"  Куда:   {to_addr or '—'}\n"
        )

    text_body = (
        f"Новая заявка #{lead_id}\n"
        f"Время: {now}\n\n"
        f"👤 Имя: {name}\n"
        f"📞 Телефон: {phone}\n"
        f"{cargo_line_txt}"
        f"{route_line_txt}\n"
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
        {route_block_html}
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

    # Ветка для отправки заполненного договора директору
    if body.get('type') == 'contract':
        try:
            send_contract_email(body)
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'error': f'Не удалось отправить письмо: {e}'}, ensure_ascii=False),
            }
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'success': True}, ensure_ascii=False),
        }

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