import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const SITE_URL = "https://фаварит.рф";

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.to ? { item: `${SITE_URL}${item.to}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <nav aria-label="Хлебные крошки" className="mb-5 sm:mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1"
                  >
                    {i === 0 && <Icon name="Home" size={13} />}
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white font-semibold inline-flex items-center gap-1">
                    {i === 0 && <Icon name="Home" size={13} className="text-accent" />}
                    {item.label}
                  </span>
                )}
                {!isLast && <Icon name="ChevronRight" size={13} className="text-accent/40" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;