import { useState } from "react";
import OrderModal from "@/components/ui/OrderModal";
import func2url from "../../../backend/func2url.json";
import EmailRequisitesModal from "./bottom/EmailRequisitesModal";
import HowItWorksSection from "./bottom/HowItWorksSection";
import PricingAndCtaSection from "./bottom/PricingAndCtaSection";
import MapAndRequisitesSection from "./bottom/MapAndRequisitesSection";

interface BottomSectionsProps {
  visibleSections: Record<string, boolean>;
}

const REQUISITES_TEXT = `Общество с ограниченной ответственностью «ФАВОРИТ»
ООО «ФАВОРИТ»
ИНН: 5250077990 / КПП: 525001001
ОГРН: 1235200013531
Юридический адрес: 607657, Нижегородская область, Кстовский М.О., г. Кстово, 6-й м-он, д. 2, офис 13
Р/с: 40702810316020000009
Банк: АО «АЛЬФА-БАНК»
К/с: 30101810200000000593
БИК: 044525593`;

const BottomSections = ({ visibleSections }: BottomSectionsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "success" | "error">("idle");
  const [emailError, setEmailError] = useState("");

  const handleSendEmail = async () => {
    const value = emailValue.trim();
    if (!value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setEmailStatus("error");
      setEmailError("Укажите корректный email");
      return;
    }
    setEmailSending(true);
    setEmailStatus("idle");
    setEmailError("");
    try {
      const res = await fetch(func2url["send-requisites"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Не удалось отправить письмо");
      }
      setEmailStatus("success");
      setTimeout(() => {
        setEmailModalOpen(false);
        setEmailStatus("idle");
        setEmailValue("");
      }, 2000);
    } catch (e) {
      setEmailStatus("error");
      setEmailError(e instanceof Error ? e.message : "Ошибка отправки");
    } finally {
      setEmailSending(false);
    }
  };

  const handleCopyRequisites = () => {
    navigator.clipboard.writeText(REQUISITES_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadPdf = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const today = new Date().toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
    printWindow.document.write(`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8"/>
  <title>Реквизиты ООО ФАВОРИТ</title>
  <style>
    @page { size: A4; margin: 20mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 12pt; color: #111; }
    .header { text-align: center; margin-bottom: 24px; }
    .header img { width: 80px; height: 80px; object-fit: cover; border-radius: 12px; margin-bottom: 10px; }
    .header h1 { font-size: 15pt; font-weight: bold; margin-bottom: 4px; }
    .header p { font-size: 10pt; color: #666; }
    .meta { display: flex; justify-content: space-between; font-size: 9pt; color: #888; margin-bottom: 16px; padding: 8px 12px; background: #f7f7f7; border-radius: 6px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    tr { border-bottom: 1px solid #e5e5e5; }
    td { padding: 8px 6px; vertical-align: top; }
    td:first-child { font-size: 9pt; color: #888; width: 38%; white-space: nowrap; }
    td:last-child { font-size: 11pt; font-weight: 500; }
    .divider { border-top: 2px solid #ddd; margin: 12px 0; }
    .footer { margin-top: 24px; padding-top: 12px; border-top: 1px solid #ddd; text-align: center; font-size: 9pt; color: #666; }
    .footer strong { color: #111; font-size: 11pt; display: block; margin-bottom: 4px; }
  </style>
</head>
<body>
  <div class="header">
    <img src="https://cdn.poehali.dev/projects/9addb698-8864-4aa0-966e-52239521a692/bucket/webp/ab248d6b-acc2-452d-a331-85642e74a1ee.webp" alt="Фаворит"/>
    <h1>ООО «ФАВОРИТ»</h1>
    <p>Реквизиты организации</p>
  </div>
  <div class="meta">
    <span>Дата формирования: ${today}</span>
    <span>Телефон: +7 960 169-09-90</span>
  </div>
  <table>
    <tr><td>Полное название</td><td>Общество с ограниченной ответственностью «ФАВОРИТ»</td></tr>
    <tr><td>Сокращённое название</td><td>ООО «ФАВОРИТ»</td></tr>
    <tr><td>ИНН / КПП</td><td>5250077990 / 525001001</td></tr>
    <tr><td>ОГРН</td><td>1235200013531</td></tr>
    <tr><td>Юридический адрес</td><td>607657, Нижегородская область, Кстовский М.О., г. Кстово, 6-й м-он, д. 2, офис 13</td></tr>
    <tr><td>Расчётный счёт</td><td>40702810316020000009</td></tr>
    <tr><td>Банк</td><td>АО «АЛЬФА-БАНК»</td></tr>
    <tr><td>Корр. счёт</td><td>30101810200000000593</td></tr>
    <tr><td>БИК</td><td>044525593</td></tr>
  </table>
  <div class="footer">
    <strong>Связаться с нами</strong>
    Телефон: +7 960 169-09-90 · Нижний Новгород, Шуваловский проезд, 7<br/>
    Работаем без выходных · Подача техники от 1 часа
  </div>
</body>
</html>`);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <>
      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <EmailRequisitesModal
        open={emailModalOpen}
        emailValue={emailValue}
        emailSending={emailSending}
        emailStatus={emailStatus}
        emailError={emailError}
        onClose={() => setEmailModalOpen(false)}
        onEmailChange={(value) => {
          setEmailValue(value);
          setEmailStatus("idle");
          setEmailError("");
        }}
        onSend={handleSendEmail}
      />

      <HowItWorksSection visibleSections={visibleSections} />

      <PricingAndCtaSection
        visibleSections={visibleSections}
        onOpenModal={() => setModalOpen(true)}
      />

      <MapAndRequisitesSection
        copied={copied}
        onCopyRequisites={handleCopyRequisites}
        onDownloadPdf={handleDownloadPdf}
        onOpenEmailModal={() => {
          setEmailModalOpen(true);
          setEmailStatus("idle");
          setEmailError("");
        }}
      />
    </>
  );
};

export default BottomSections;
