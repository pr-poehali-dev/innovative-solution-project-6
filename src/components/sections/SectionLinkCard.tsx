import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

type Props = {
  to: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
  cta: string;
  imageUrl?: string;
};

const SectionLinkCard = ({ to, eyebrow, title, description, icon, cta, imageUrl }: Props) => (
  <section className="py-10 sm:py-16 px-4 sm:px-6">
    <div className="max-w-5xl mx-auto">
      <Link
        to={to}
        className="group block relative overflow-hidden rounded-2xl sm:rounded-3xl border border-accent/25 hover:border-accent/60 transition-colors bg-accent/5"
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            width="1200"
            height="400"
            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
          />
        )}

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-6 sm:p-8">
          <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/15 border border-accent/40 flex items-center justify-center flex-shrink-0">
            <Icon name={icon} size={28} className="text-accent" />
          </span>

          <div className="flex-1 min-w-0">
            <div className="text-accent text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-1">
              {eyebrow}
            </div>
            <h2 className="text-white font-display font-black text-xl sm:text-3xl tracking-tight leading-tight mb-2">
              {title}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-snug">
              {description}
            </p>
          </div>

          <span className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-black flex-shrink-0 w-full sm:w-auto"
            style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
          >
            {cta}
            <Icon name="ArrowRight" size={16} />
          </span>
        </div>
      </Link>
    </div>
  </section>
);

export default SectionLinkCard;
