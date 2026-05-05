import { driverRows, truckRows } from "./truckCardData";

const renderTable = (rows: [string, string][]) => (
  <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(13,148,136,0.45)" }}>
    <tbody>
      {rows.map(([label, value], i) => (
        <tr key={i}>
          <td
            style={{
              padding: "11px 14px",
              background: "rgba(45,212,191,0.18)",
              borderBottom: i < rows.length - 1 ? "1px solid rgba(13,148,136,0.35)" : "none",
              borderRight: "1px solid rgba(13,148,136,0.35)",
              width: "45%",
              verticalAlign: "middle",
              fontSize: 13,
              color: "#0f766e",
              fontWeight: 700,
            }}
          >
            {label}
          </td>
          <td
            style={{
              padding: "11px 14px",
              background: "#ffffff",
              borderBottom: i < rows.length - 1 ? "1px solid rgba(13,148,136,0.35)" : "none",
              verticalAlign: "middle",
              fontSize: 14,
              color: "#1f2937",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {value}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const TruckCardPreview = () => {
  return (
    <div
      className="max-w-[640px] mx-auto"
      style={{
        background: "linear-gradient(135deg, #f0fdfa 0%, #f8fafc 50%, #f0fdfa 100%)",
        border: "2px solid rgba(13,148,136,0.55)",
        borderRadius: 16,
        padding: 28,
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 10px 30px rgba(13,148,136,0.15)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid rgba(13,148,136,0.3)" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 4, color: "#0d9488", marginBottom: 4 }}>ООО «ФАВОРИТ»</div>
          <div style={{ fontSize: 11, color: "#64748b" }}>аренда манипуляторов · Нижний Новгород</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#64748b" }}>Сайт</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#b45309" }}>фаварит.рф</div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 999, background: "rgba(45,212,191,0.2)", border: "1px solid rgba(13,148,136,0.5)", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#0d9488", marginBottom: 12 }}>
          Карточка техники
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", margin: 0 }}>FAW J6P-390 + КМУ</h1>
      </div>

      <div style={{ marginBottom: 20 }}>{renderTable(truckRows)}</div>

      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 999, background: "rgba(45,212,191,0.2)", border: "1px solid rgba(13,148,136,0.5)", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#0d9488" }}>
          Карточка водителя
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>{renderTable(driverRows)}</div>

      {/* Контакты директора и водителя */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingTop: 16, borderTop: "1px solid rgba(13,148,136,0.3)", marginBottom: 10 }}>
        <div style={{ padding: 12, borderRadius: 10, background: "rgba(252,211,77,0.25)", border: "1px solid rgba(180,83,9,0.5)" }}>
          <div style={{ fontSize: 9, color: "#92400e", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>Директор</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#b45309", marginTop: 6 }}>+7 960 169-09-90</div>
        </div>
        <div style={{ padding: 12, borderRadius: 10, background: "rgba(45,212,191,0.25)", border: "1px solid rgba(13,148,136,0.5)" }}>
          <div style={{ fontSize: 9, color: "#0f766e", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>Водитель</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginTop: 6 }}>+7 960 188-30-84</div>
        </div>
      </div>

      <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(45,212,191,0.18)", border: "1px solid rgba(13,148,136,0.4)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#475569" }}>Подробнее на сайте:</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#b45309" }}>фаварит.рф</span>
      </div>
    </div>
  );
};

export default TruckCardPreview;
