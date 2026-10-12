import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { SHOP_PUBLIC } from "@/data/shopVisibility";

type Props = { className?: string; iconOnlyMobile?: boolean };

const ShopHeaderButton = ({ className = "", iconOnlyMobile = false }: Props) => {
  if (!SHOP_PUBLIC) return null;
  return (
    <Link
      to="/stroymaterialy/kirpich"
      aria-label="Магазин стройматериалов"
      className={`relative inline-flex items-center justify-center gap-1.5 h-9 sm:h-10 ${iconOnlyMobile ? "w-9 sm:w-auto px-0 sm:px-4" : "px-2.5 sm:px-4"} rounded-full font-black text-black text-xs sm:text-sm whitespace-nowrap shadow-lg shadow-amber-500/25 hover:scale-105 transition-transform ${className}`}
      style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
    >
      <Icon name="ShoppingCart" size={16} />
      <span className={iconOnlyMobile ? "hidden sm:inline" : ""}>Магазин</span>
    </Link>
  );
};

export default ShopHeaderButton;
