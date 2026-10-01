import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

const LAT = 56.274655;
const LNG = 43.85133;
const ZOOM = 15;

const LiveMap = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !boxRef.current) return;
    let map: import("leaflet").Map | null = null;
    let cancelled = false;

    import("leaflet").then(({ default: L }) => {
      if (cancelled || !boxRef.current) return;
      const isTouch = L.Browser.mobile;
      map = L.map(boxRef.current, {
        center: [LAT, LNG],
        zoom: ZOOM,
        scrollWheelZoom: false,
        dragging: !isTouch,
        attributionControl: true,
      });
      map.attributionControl.setPrefix(false);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        iconSize: [0, 0],
        html: `
          <div style="position:relative;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;pointer-events:none">
            <div style="background:#0e1420;border:2px solid #e8a820;border-radius:8px;padding:3px 8px;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,.35);line-height:1.15;text-align:center">
              <div style="color:#f5d060;font-weight:800;font-size:12px">Фаворит</div>
              <div style="color:#fff;font-size:10px;opacity:.85">аренда манипуляторов</div>
            </div>
            <div style="width:2px;height:8px;background:#e8a820"></div>
            <div style="width:14px;height:14px;border-radius:50%;background:#e53935;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4)"></div>
          </div>`,
      });
      L.marker([LAT, LNG], { icon, keyboard: false }).addTo(map);
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [visible]);

  return (
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-accent/20 bg-zinc-200 h-[300px] sm:h-[400px] isolate">
      <div ref={boxRef} className="absolute inset-0" aria-label="Карта — ООО Фаворит, Нижний Новгород, Шуваловский проезд" />
    </div>
  );
};

export default LiveMap;
