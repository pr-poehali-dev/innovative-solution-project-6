import Icon from "@/components/ui/icon";

export const SLINGER_TEXT =
  "Важно: при разгрузке манипулятором на объекте нужен стропальщик с удостоверением";

type Props = { className?: string };

const SlingerNotice = ({ className = "" }: Props) => (
  <div className={`flex gap-2.5 rounded-xl border border-amber-400/40 bg-amber-400/10 px-3 py-2.5 ${className}`}>
    <Icon name="TriangleAlert" size={16} className="text-amber-300 shrink-0 mt-0.5" />
    <p className="text-xs leading-snug text-amber-100">
      <span className="font-bold text-amber-300">Нужен стропальщик.</span> При разгрузке манипулятором на
      объекте должен быть стропальщик с удостоверением — он цепляет и принимает груз.
    </p>
  </div>
);

export default SlingerNotice;
