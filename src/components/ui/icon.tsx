import React, { lazy, Suspense, useMemo } from 'react';
import {
  CheckCircle, ChevronLeft, ChevronRight, Clock, FileText, Flag,
  HardHat, Loader2, MapPin, Menu, Package, Phone, RefreshCw, Truck,
  User, UserCheck, Wallet, X, AlertCircle,
  type LucideProps,
} from 'lucide-react';

const HOT: Record<string, React.FC<LucideProps>> = {
  CheckCircle, ChevronLeft, ChevronRight, Clock, FileText, Flag,
  HardHat, Loader2, MapPin, Menu, Package, Phone, RefreshCw, Truck,
  User, UserCheck, Wallet, X, AlertCircle,
};

type LazyMap = Record<string, React.LazyExoticComponent<React.FC<LucideProps>>>;

const COLD: LazyMap = {
  Anchor: lazy(() => import('lucide-react').then(m => ({ default: m.Anchor }))),
  ArrowLeft: lazy(() => import('lucide-react').then(m => ({ default: m.ArrowLeft }))),
  ArrowRight: lazy(() => import('lucide-react').then(m => ({ default: m.ArrowRight }))),
  BadgeCheck: lazy(() => import('lucide-react').then(m => ({ default: m.BadgeCheck }))),
  BadgePercent: lazy(() => import('lucide-react').then(m => ({ default: m.BadgePercent }))),
  BadgeRussianRuble: lazy(() => import('lucide-react').then(m => ({ default: m.BadgeRussianRuble }))),
  Briefcase: lazy(() => import('lucide-react').then(m => ({ default: m.Briefcase }))),
  Building2: lazy(() => import('lucide-react').then(m => ({ default: m.Building2 }))),
  Calculator: lazy(() => import('lucide-react').then(m => ({ default: m.Calculator }))),
  Calendar: lazy(() => import('lucide-react').then(m => ({ default: m.Calendar }))),
  CalendarClock: lazy(() => import('lucide-react').then(m => ({ default: m.CalendarClock }))),
  Check: lazy(() => import('lucide-react').then(m => ({ default: m.Check }))),
  CheckCircle2: lazy(() => import('lucide-react').then(m => ({ default: m.CheckCircle2 }))),
  ChevronDown: lazy(() => import('lucide-react').then(m => ({ default: m.ChevronDown }))),
  ChevronUp: lazy(() => import('lucide-react').then(m => ({ default: m.ChevronUp }))),
  ClipboardCheck: lazy(() => import('lucide-react').then(m => ({ default: m.ClipboardCheck }))),
  Construction: lazy(() => import('lucide-react').then(m => ({ default: m.Construction }))),
  Copy: lazy(() => import('lucide-react').then(m => ({ default: m.Copy }))),
  CreditCard: lazy(() => import('lucide-react').then(m => ({ default: m.CreditCard }))),
  Crown: lazy(() => import('lucide-react').then(m => ({ default: m.Crown }))),
  Download: lazy(() => import('lucide-react').then(m => ({ default: m.Download }))),
  Droplets: lazy(() => import('lucide-react').then(m => ({ default: m.Droplets }))),
  ExternalLink: lazy(() => import('lucide-react').then(m => ({ default: m.ExternalLink }))),
  Factory: lazy(() => import('lucide-react').then(m => ({ default: m.Factory }))),
  FileBadge: lazy(() => import('lucide-react').then(m => ({ default: m.FileBadge }))),
  FileCheck: lazy(() => import('lucide-react').then(m => ({ default: m.FileCheck }))),
  Fingerprint: lazy(() => import('lucide-react').then(m => ({ default: m.Fingerprint }))),
  Flame: lazy(() => import('lucide-react').then(m => ({ default: m.Flame }))),
  Folder: lazy(() => import('lucide-react').then(m => ({ default: m.Folder }))),
  Hammer: lazy(() => import('lucide-react').then(m => ({ default: m.Hammer }))),
  Hash: lazy(() => import('lucide-react').then(m => ({ default: m.Hash }))),
  Headphones: lazy(() => import('lucide-react').then(m => ({ default: m.Headphones }))),
  HelpCircle: lazy(() => import('lucide-react').then(m => ({ default: m.HelpCircle }))),
  Home: lazy(() => import('lucide-react').then(m => ({ default: m.Home }))),
  Info: lazy(() => import('lucide-react').then(m => ({ default: m.Info }))),
  Landmark: lazy(() => import('lucide-react').then(m => ({ default: m.Landmark }))),
  Layout: lazy(() => import('lucide-react').then(m => ({ default: m.Layout }))),
  Mail: lazy(() => import('lucide-react').then(m => ({ default: m.Mail }))),
  MapPinOff: lazy(() => import('lucide-react').then(m => ({ default: m.MapPinOff }))),
  MessageCircle: lazy(() => import('lucide-react').then(m => ({ default: m.MessageCircle }))),
  MessageSquare: lazy(() => import('lucide-react').then(m => ({ default: m.MessageSquare }))),
  MoveHorizontal: lazy(() => import('lucide-react').then(m => ({ default: m.MoveHorizontal }))),
  MoveUpRight: lazy(() => import('lucide-react').then(m => ({ default: m.MoveUpRight }))),
  PhoneCall: lazy(() => import('lucide-react').then(m => ({ default: m.PhoneCall }))),
  PlusCircle: lazy(() => import('lucide-react').then(m => ({ default: m.PlusCircle }))),
  Printer: lazy(() => import('lucide-react').then(m => ({ default: m.Printer }))),
  ReceiptText: lazy(() => import('lucide-react').then(m => ({ default: m.ReceiptText }))),
  Rocket: lazy(() => import('lucide-react').then(m => ({ default: m.Rocket }))),
  Scaling: lazy(() => import('lucide-react').then(m => ({ default: m.Scaling }))),
  Search: lazy(() => import('lucide-react').then(m => ({ default: m.Search }))),
  Send: lazy(() => import('lucide-react').then(m => ({ default: m.Send }))),
  Share2: lazy(() => import('lucide-react').then(m => ({ default: m.Share2 }))),
  Shield: lazy(() => import('lucide-react').then(m => ({ default: m.Shield }))),
  ShieldCheck: lazy(() => import('lucide-react').then(m => ({ default: m.ShieldCheck }))),
  ShoppingCart: lazy(() => import('lucide-react').then(m => ({ default: m.ShoppingCart }))),
  Sparkles: lazy(() => import('lucide-react').then(m => ({ default: m.Sparkles }))),
  Star: lazy(() => import('lucide-react').then(m => ({ default: m.Star }))),
  Tag: lazy(() => import('lucide-react').then(m => ({ default: m.Tag }))),
  TreePine: lazy(() => import('lucide-react').then(m => ({ default: m.TreePine }))),
  TrendingUp: lazy(() => import('lucide-react').then(m => ({ default: m.TrendingUp }))),
  Users: lazy(() => import('lucide-react').then(m => ({ default: m.Users }))),
  Warehouse: lazy(() => import('lucide-react').then(m => ({ default: m.Warehouse }))),
  Weight: lazy(() => import('lucide-react').then(m => ({ default: m.Weight }))),
  Wrench: lazy(() => import('lucide-react').then(m => ({ default: m.Wrench }))),
  XCircle: lazy(() => import('lucide-react').then(m => ({ default: m.XCircle }))),
  Zap: lazy(() => import('lucide-react').then(m => ({ default: m.Zap }))),
};

interface IconProps extends LucideProps {
  name: string;
  fallback?: string;
}

const Icon: React.FC<IconProps> = ({ name, fallback = 'AlertCircle', ...props }) => {
  const placeholder = useMemo(
    () => (
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          width: (props.size as number) || 24,
          height: (props.size as number) || 24,
        }}
      />
    ),
    [props.size]
  );

  const Hot = HOT[name];
  if (Hot) return <Hot {...props} />;

  const Cold = COLD[name];
  if (Cold) {
    return (
      <Suspense fallback={placeholder}>
        <Cold {...props} />
      </Suspense>
    );
  }

  const Fb = HOT[fallback] || HOT.AlertCircle;
  return Fb ? <Fb {...props} /> : <span className="text-xs text-gray-400">[icon]</span>;
};

export default Icon;