import Icon from "@/components/ui/icon";
import PhoneButton from "@/components/ui/PhoneButton";
import { MATERIALS_PHONE, MATERIALS_PHONE_LABEL } from "@/lib/materialsContacts";

const POINTS = [
  { icon: "Clock", title: "Всегда готов к выезду", text: "Привезём в удобный день, часто — в день заказа" },
  { icon: "UserCheck", title: "Профессиональные водители", text: "Опытные операторы КМУ, аккуратно работают с грузом" },
  { icon: "Package", title: "Разгрузка поддонами", text: "Ставим блоки краном на участок. Для разгрузки нужны стропальщики" },
  { icon: "ShieldCheck", title: "Груз в сохранности", text: "Крепим и везём бережно — без сколов и боя" },
];

const DeliveryPromo = () => (
  <section className="mt-10 rounded-3xl border border-accent/30 bg-card/60 overflow-hidden">
    <div className="grid lg:grid-cols-[2fr_3fr]">
      <div className="grid grid-cols-1 gap-1 bg-black/20">
        {[
          {
            src: "/img/faw-poritep-delivery.webp",
            alt: "Манипулятор FAW «Фаворит» с газобетонными блоками «Поритеп»",
            pos: "object-[60%_center]",
          },
          {
            src: "/img/poritep-unloaded-site.webp",
            alt: "Блоки «Поритеп» разгружены манипулятором на объекте",
            pos: "object-[40%_center]",
          },
        ].map((p) => (
          <div key={p.src} className="relative h-[210px] sm:h-[260px] lg:h-auto lg:min-h-[180px] overflow-hidden group">
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover ${p.pos} transition-transform duration-700 group-hover:scale-105`}
            />
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-8 flex flex-col justify-center">
        <p className="text-xs uppercase tracking-wider text-accent font-bold mb-2">Доставка своим транспортом</p>
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
          Привезём блоки и разгрузим краном-манипулятором
        </h2>
        <p className="text-muted-foreground mb-6">
          Свой манипулятор FAW с краном — грузим на заводе и доставляем прямо на ваш участок по Нижнему Новгороду и области.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {POINTS.map((p) => (
            <div key={p.title} className="flex gap-3 rounded-2xl bg-black/15 border border-white/10 p-3">
              <span className="w-10 h-10 shrink-0 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                <Icon name={p.icon} size={20} />
              </span>
              <div>
                <p className="text-sm font-black text-white leading-tight">{p.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <PhoneButton size="md" className="rounded-xl" phone={MATERIALS_PHONE} label={MATERIALS_PHONE_LABEL} />
          <span className="text-sm text-muted-foreground">Позвоните — назовём цену доставки</span>
        </div>
      </div>
    </div>
  </section>
);

export default DeliveryPromo;