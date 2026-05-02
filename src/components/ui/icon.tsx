import React from 'react';
import {
  AlertCircle, Anchor, ArrowLeft, ArrowRight, BadgeCheck, BadgePercent,
  BadgeRussianRuble, Briefcase, Building2, Calculator, Calendar,
  CalendarClock, Check, CheckCircle, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, ChevronUp, ClipboardCheck, Clock,
  Construction, Copy, CreditCard, Crown, Download, Droplets,
  ExternalLink, Factory, FileBadge, FileCheck, FileText, Fingerprint,
  Flag, Flame, Folder, Hammer, HardHat, Hash, Headphones, HelpCircle,
  Home, Info, Landmark, Layout, Loader2, Mail, MapPin, MapPinOff, Menu,
  MessageCircle, MessageSquare, MoveHorizontal, MoveUpRight, Package,
  Phone, PhoneCall, PlusCircle, Printer, ReceiptText, RefreshCw, Rocket,
  Scaling, Search, Send, Share2, Shield, ShieldCheck, ShoppingCart,
  Sparkles, Star, Tag, TreePine, TrendingUp, Truck, User, UserCheck,
  Users, Wallet, Warehouse, Weight, Wrench, X, XCircle, Zap,
  type LucideProps,
} from 'lucide-react';

const ICONS: Record<string, React.FC<LucideProps>> = {
  AlertCircle, Anchor, ArrowLeft, ArrowRight, BadgeCheck, BadgePercent,
  BadgeRussianRuble, Briefcase, Building2, Calculator, Calendar,
  CalendarClock, Check, CheckCircle, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, ChevronUp, ClipboardCheck, Clock,
  Construction, Copy, CreditCard, Crown, Download, Droplets,
  ExternalLink, Factory, FileBadge, FileCheck, FileText, Fingerprint,
  Flag, Flame, Folder, Hammer, HardHat, Hash, Headphones, HelpCircle,
  Home, Info, Landmark, Layout, Loader2, Mail, MapPin, MapPinOff, Menu,
  MessageCircle, MessageSquare, MoveHorizontal, MoveUpRight, Package,
  Phone, PhoneCall, PlusCircle, Printer, ReceiptText, RefreshCw, Rocket,
  Scaling, Search, Send, Share2, Shield, ShieldCheck, ShoppingCart,
  Sparkles, Star, Tag, TreePine, TrendingUp, Truck, User, UserCheck,
  Users, Wallet, Warehouse, Weight, Wrench, X, XCircle, Zap,
};

interface IconProps extends LucideProps {
  name: string;
  fallback?: string;
}

const Icon: React.FC<IconProps> = ({ name, fallback = 'AlertCircle', ...props }) => {
  const IconComponent = ICONS[name] || ICONS[fallback];
  if (!IconComponent) return <span className="text-xs text-gray-400">[icon]</span>;
  return <IconComponent {...props} />;
};

export default Icon;
