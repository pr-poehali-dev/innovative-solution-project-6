import Icon from "@/components/ui/icon";

type Props = {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  fromAddr: string;
  setFromAddr: (v: string) => void;
  toAddr: string;
  setToAddr: (v: string) => void;
  cargo: string;
  setCargo: (v: string) => void;
  onFieldFocus?: (e: React.FocusEvent<HTMLElement>) => void;
};

const LeadFormFields = ({
  name,
  setName,
  phone,
  setPhone,
  fromAddr,
  setFromAddr,
  toAddr,
  setToAddr,
  cargo,
  setCargo,
  onFieldFocus,
}: Props) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-1.5">
        <div className="relative flex-1">
          <Icon name="User" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
          <input
            type="text"
            placeholder="Имя или компания"
            value={name}
            onChange={e => setName(e.target.value)}
            onFocus={onFieldFocus}
            required
            autoComplete="name"
            style={{ scrollMarginTop: "90px", scrollMarginBottom: "20px" }}
            className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 h-11 sm:h-10 text-white placeholder:text-white/50 text-base sm:text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
          />
        </div>
        <div className="relative flex-1">
          <Icon name="Phone" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Телефон +7 (___) ___-__-__"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            onFocus={onFieldFocus}
            required
            style={{ scrollMarginTop: "90px", scrollMarginBottom: "20px" }}
            className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 h-11 sm:h-10 text-base sm:text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-1.5">
        <div className="relative flex-1">
          <Icon name="MapPin" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
          <input
            type="text"
            placeholder="Откуда (адрес погрузки)"
            value={fromAddr}
            onChange={e => setFromAddr(e.target.value)}
            onFocus={onFieldFocus}
            style={{ scrollMarginTop: "90px", scrollMarginBottom: "20px" }}
            className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 h-11 sm:h-10 text-base sm:text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
          />
        </div>
        <div className="relative flex-1">
          <Icon name="Flag" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
          <input
            type="text"
            placeholder="Куда (адрес разгрузки)"
            value={toAddr}
            onChange={e => setToAddr(e.target.value)}
            onFocus={onFieldFocus}
            style={{ scrollMarginTop: "90px", scrollMarginBottom: "20px" }}
            className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 h-11 sm:h-10 text-base sm:text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
          />
        </div>
      </div>
      <div className="relative">
        <Icon name="Package" size={14} className="absolute left-3 top-3 text-accent/70 pointer-events-none" />
        <textarea
          rows={2}
          placeholder="Что везём (груз, вес, размеры, подъездные пути для техники)"
          value={cargo}
          onChange={e => setCargo(e.target.value)}
          onFocus={onFieldFocus}
          style={{ scrollMarginTop: "90px", scrollMarginBottom: "20px" }}
          className="w-full bg-white/[0.07] border border-white/20 rounded-lg pl-9 pr-3 py-3 sm:py-2.5 text-base sm:text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all resize-none leading-snug"
        />
      </div>
    </>
  );
};

export default LeadFormFields;