import { useEffect, useRef, useState } from "react";

const LAT = 56.274655;
const LNG = 43.85133;
const ZOOM = 15;
const API_SRC = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";

type YMaps = {
  ready: (cb: () => void) => void;
  Map: new (el: HTMLElement, state: object, options?: object) => YMap;
  Placemark: new (coords: number[], props: object, options: object) => unknown;
};
type YMap = {
  geoObjects: { add: (o: unknown) => void };
  behaviors: { disable: (b: string | string[]) => void };
  destroy: () => void;
};

declare global {
  interface Window {
    ymaps?: YMaps;
  }
}

let loader: Promise<YMaps> | null = null;
const loadYmaps = () => {
  if (window.ymaps) return new Promise<YMaps>((res) => window.ymaps!.ready(() => res(window.ymaps!)));
  if (!loader) {
    loader = new Promise<YMaps>((res, rej) => {
      const s = document.createElement("script");
      s.src = API_SRC;
      s.async = true;
      s.onload = () => window.ymaps!.ready(() => res(window.ymaps!));
      s.onerror = () => {
        loader = null;
        rej(new Error("ymaps"));
      };
      document.head.appendChild(s);
    });
  }
  return loader;
};

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
    if (!visible) return;
    let map: YMap | null = null;
    let cancelled = false;

    loadYmaps()
      .then((ymaps) => {
        if (cancelled || !boxRef.current) return;
        map = new ymaps.Map(
          boxRef.current,
          { center: [LAT, LNG], zoom: ZOOM, controls: ["zoomControl"] },
          { suppressMapOpenBlock: true, yandexMapDisablePoiInteractivity: true }
        );
        map.behaviors.disable("scrollZoom");
        if (window.matchMedia("(pointer: coarse)").matches) map.behaviors.disable("drag");
        map.geoObjects.add(
          new ymaps.Placemark(
            [LAT, LNG],
            { iconCaption: "Фаворит", hintContent: "Фаворит — аренда манипуляторов" },
            { preset: "islands#redDotIconWithCaption" }
          )
        );
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      map?.destroy();
    };
  }, [visible]);

  return (
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-accent/20 bg-zinc-200 h-[300px] sm:h-[400px] isolate">
      <div ref={boxRef} className="absolute inset-0" aria-label="Карта — ООО Фаворит, Нижний Новгород, Шуваловский проезд" />
    </div>
  );
};

export default LiveMap;
