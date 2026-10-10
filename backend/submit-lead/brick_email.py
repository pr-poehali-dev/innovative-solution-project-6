import os
import smtplib
from datetime import datetime, timedelta, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from html import escape

ORDER_EMAIL = "960188@list.ru"
GOLD = "linear-gradient(135deg,#f5d060 0%,#e8a820 50%,#c8850a 100%)"


def _rub(v) -> str:
    try:
        return f"{int(round(float(v))):,}".replace(",", " ") + " ₽"
    except (TypeError, ValueError):
        return "—"


def _num(v, digits: int = 1) -> str:
    try:
        f = float(v)
    except (TypeError, ValueError):
        return "—"
    s = f"{f:.{digits}f}".rstrip("0").rstrip(".")
    return s.replace(".", ",")


def _e(v) -> str:
    return escape(str(v if v is not None else ""))


def build_brick_email(name: str, phone: str, order: dict, lead_id: int) -> tuple[str, str, str]:
    """Собирает тему, текст и HTML письма о заказе кирпича."""
    items = order.get("items") or []
    delivery = order.get("delivery") or None
    address = (order.get("address") or "").strip()
    bricks_total = float(order.get("bricksTotal") or 0)
    delivery_cost = float((delivery or {}).get("cost") or 0)
    grand = bricks_total + delivery_cost
    total_qty = sum(int(i.get("qty") or 0) for i in items)
    total_packs = sum(int(i.get("packs") or 0) for i in items)
    total_weight = sum(float(i.get("weightKg") or 0) for i in items)
    now = (datetime.now(timezone.utc) + timedelta(hours=3)).strftime("%d.%m.%Y %H:%M")
    tel = "".join(ch for ch in phone if ch.isdigit() or ch == "+")

    subject = f"🧱 Заказ кирпича #{lead_id}: {name} — {total_packs} уп. на {_rub(grand)}"

    rows = ""
    for i in items:
        rows += f"""
      <tr>
        <td style="padding:12px 10px;border-bottom:1px solid #eee;">
          <div style="font-weight:800;color:#111;font-size:14px;">{_e(i.get('name'))}</div>
          <div style="color:#777;font-size:12px;margin-top:2px;">{_rub(i.get('price'))} за шт · {_e(i.get('qty'))} шт</div>
        </td>
        <td style="padding:12px 10px;border-bottom:1px solid #eee;text-align:center;font-weight:800;color:#111;white-space:nowrap;">{_e(i.get('packs'))} уп.</td>
        <td style="padding:12px 10px;border-bottom:1px solid #eee;text-align:center;color:#444;white-space:nowrap;">{_num(float(i.get('weightKg') or 0) / 1000)} т</td>
        <td style="padding:12px 10px;border-bottom:1px solid #eee;text-align:right;font-weight:900;color:#111;white-space:nowrap;">{_rub(i.get('sum'))}</td>
      </tr>"""

    is_local = bool((delivery or {}).get("local"))
    delivery_html = ""
    if delivery and is_local:
        delivery_html = f"""
  <tr><td style="padding:0 24px 18px;">
    <div style="border:1px solid #f0d58a;background:#fffaf0;border-radius:14px;padding:16px 18px;">
      <div style="font-size:12px;font-weight:900;color:#b07a06;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">🚚 Доставка по городу / рядом</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#222;">
        <tr><td style="padding:3px 0;color:#777;">Куда</td><td style="padding:3px 0;text-align:right;font-weight:800;">{_e(delivery.get('city'))}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Расстояние</td><td style="padding:3px 0;text-align:right;font-weight:800;">{_num(delivery.get('km'))} км</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Манипулятор</td><td style="padding:3px 0;text-align:right;font-weight:800;">{_e(delivery.get('truck'))} · рейсов {_e(delivery.get('trips'))}</td></tr>
        <tr><td style="padding:8px 0 0;font-weight:900;">Стоимость доставки</td><td style="padding:8px 0 0;text-align:right;font-weight:900;color:#c8850a;">назвать клиенту при звонке</td></tr>
      </table>
    </div>
  </td></tr>"""
    elif delivery:
        delivery_html = f"""
  <tr><td style="padding:0 24px 18px;">
    <div style="border:1px solid #f0d58a;background:#fffaf0;border-radius:14px;padding:16px 18px;">
      <div style="font-size:12px;font-weight:900;color:#b07a06;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">🚚 Доставка манипулятором</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#222;">
        <tr><td style="padding:3px 0;color:#777;">Куда</td><td style="padding:3px 0;text-align:right;font-weight:800;">{_e(delivery.get('city'))}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Расстояние</td><td style="padding:3px 0;text-align:right;font-weight:800;">{_num(delivery.get('km'))} км (в одну сторону)</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Манипулятор</td><td style="padding:3px 0;text-align:right;font-weight:800;">{_e(delivery.get('truck'))}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Рейсов</td><td style="padding:3px 0;text-align:right;font-weight:800;">{_e(delivery.get('trips'))}</td></tr>
        <tr><td style="padding:3px 0;color:#777;">Расчёт</td><td style="padding:3px 0;text-align:right;color:#555;">{_num(delivery.get('km'))} км × 2 × {_e(delivery.get('rate') or 120)} ₽ × {_e(delivery.get('trips'))}</td></tr>
        <tr><td style="padding:8px 0 0;font-weight:900;">Стоимость доставки</td><td style="padding:8px 0 0;text-align:right;font-weight:900;font-size:16px;">{_rub(delivery_cost)}</td></tr>
      </table>
    </div>
  </td></tr>"""
    else:
        delivery_html = """
  <tr><td style="padding:0 24px 18px;">
    <div style="border:1px dashed #ddd;border-radius:14px;padding:14px 18px;color:#777;font-size:13px;">
      🚚 Доставку клиент не рассчитывал — уточните адрес и посчитайте при звонке.
    </div>
  </td></tr>"""

    address_html = (
        f"""<div style="margin-top:6px;font-size:14px;color:#333;">📍 {_e(address)}</div>""" if address else ""
    )

    html = f"""<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#eef0f3;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#eef0f3;padding:24px 10px;"><tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.08);">

  <tr><td style="background:#1c2230;padding:26px 24px;text-align:center;">
    <div style="font-size:11px;letter-spacing:4px;color:#f5d680;text-transform:uppercase;font-weight:700;">ООО «Фаворит» · магазин кирпича</div>
    <div style="font-size:26px;font-weight:900;color:#ffffff;margin-top:8px;">🧱 Новый заказ кирпича</div>
    <div style="display:inline-block;margin-top:10px;padding:5px 14px;border-radius:999px;background:{GOLD};color:#000;font-weight:900;font-size:13px;">№ {lead_id} · {now}</div>
  </td></tr>

  <tr><td style="padding:22px 24px 10px;">
    <div style="border-radius:14px;background:#f6f7f9;padding:16px 18px;">
      <div style="font-size:12px;font-weight:900;color:#888;text-transform:uppercase;letter-spacing:1px;">Клиент</div>
      <div style="font-size:20px;font-weight:900;color:#111;margin-top:4px;">{_e(name)}</div>
      <div style="margin-top:4px;"><a href="tel:{_e(tel)}" style="font-size:18px;font-weight:900;color:#c8850a;text-decoration:none;">📞 {_e(phone)}</a></div>
      {address_html}
    </div>
  </td></tr>

  <tr><td style="padding:12px 24px 6px;">
    <div style="font-size:12px;font-weight:900;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Состав заказа</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse;">
      <tr style="background:#f6f7f9;">
        <th style="padding:9px 10px;text-align:left;font-size:11px;color:#888;text-transform:uppercase;">Товар</th>
        <th style="padding:9px 10px;text-align:center;font-size:11px;color:#888;text-transform:uppercase;">Упак.</th>
        <th style="padding:9px 10px;text-align:center;font-size:11px;color:#888;text-transform:uppercase;">Вес</th>
        <th style="padding:9px 10px;text-align:right;font-size:11px;color:#888;text-transform:uppercase;">Сумма</th>
      </tr>{rows}
      <tr>
        <td style="padding:12px 10px;font-weight:900;color:#111;">Итого кирпич · {total_qty:,} шт</td>
        <td style="padding:12px 10px;text-align:center;font-weight:900;color:#111;white-space:nowrap;">{total_packs} уп.</td>
        <td style="padding:12px 10px;text-align:center;font-weight:900;color:#111;white-space:nowrap;">{_num(total_weight / 1000)} т</td>
        <td style="padding:12px 10px;text-align:right;font-weight:900;color:#111;white-space:nowrap;">{_rub(bricks_total)}</td>
      </tr>
    </table>
    <div style="font-size:11px;color:#999;margin-top:2px;">В упаковке (на поддоне) 336 шт</div>
  </td></tr>
{delivery_html}
  <tr><td style="padding:0 24px 22px;">
    <div style="background:{GOLD};border-radius:16px;padding:18px 20px;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="font-size:15px;font-weight:900;color:#000;">ИТОГО К ОПЛАТЕ{' с доставкой' if delivery and not is_local else ' (без доставки)'}</td>
        <td style="text-align:right;font-size:28px;font-weight:900;color:#000;white-space:nowrap;">{_rub(grand)}</td>
      </tr></table>
    </div>
  </td></tr>

  <tr><td style="padding:0 24px 26px;text-align:center;">
    <a href="tel:{_e(tel)}" style="display:inline-block;padding:14px 32px;background:#1c2230;color:#f5d680;font-weight:900;text-decoration:none;border-radius:999px;font-size:15px;">📞 Перезвонить клиенту</a>
    <div style="font-size:12px;color:#999;margin-top:10px;">Клиенту обещали перезвонить в течение 5 минут</div>
  </td></tr>

  <tr><td style="background:#f6f7f9;padding:14px 24px;text-align:center;font-size:11px;color:#999;">
    Заказ оформлен на сайте фаварит.рф · магазин кирпича
  </td></tr>
</table>
</td></tr></table>
</body></html>""".replace(f"{total_qty:,}", f"{total_qty:,}".replace(",", " "))

    lines = [f"НОВЫЙ ЗАКАЗ КИРПИЧА № {lead_id} ({now})", "", f"Клиент: {name}", f"Телефон: {phone}"]
    if address:
        lines.append(f"Адрес: {address}")
    lines += ["", "СОСТАВ:"]
    for i in items:
        lines.append(
            f"• {i.get('name')} — {i.get('qty')} шт, {i.get('packs')} уп., "
            f"{_num(float(i.get('weightKg') or 0) / 1000)} т — {_rub(i.get('sum'))}"
        )
    lines.append(f"Итого кирпич: {total_packs} уп., {_num(total_weight / 1000)} т — {_rub(bricks_total)}")
    if delivery and is_local:
        lines += ["", f"ДОСТАВКА: {delivery.get('city')}, {_num(delivery.get('km'))} км — по городу, цену назвать при звонке"]
    elif delivery:
        lines += [
            "",
            f"ДОСТАВКА: {delivery.get('city')}, {_num(delivery.get('km'))} км, манипулятор {delivery.get('truck')}, "
            f"рейсов {delivery.get('trips')} — {_rub(delivery_cost)}",
        ]
    lines += ["", f"ИТОГО: {_rub(grand)}"]
    return subject, "\n".join(lines), html


def send_brick_email(name: str, phone: str, order: dict, lead_id: int) -> None:
    """Отправляет красивое письмо о заказе кирпича на почту компании."""
    subject, text, html = build_brick_email(name, phone, order, lead_id)
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = ORDER_EMAIL
    msg["To"] = ORDER_EMAIL
    msg.attach(MIMEText(text, "plain", "utf-8"))
    msg.attach(MIMEText(html, "html", "utf-8"))
    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as smtp:
        smtp.login(ORDER_EMAIL, os.environ["MAIL_PASSWORD"])
        smtp.send_message(msg)
