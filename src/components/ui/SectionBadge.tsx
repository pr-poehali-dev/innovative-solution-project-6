interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

const SectionBadge = ({ children, className = "" }: SectionBadgeProps) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-lg shadow-accent/30 ${className}`}
      style={{ background: "linear-gradient(135deg, #f5d060 0%, #e8a820 50%, #c8850a 100%)" }}
    >
      <span className="relative flex w-2 h-2">
        <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
        <span className="relative rounded-full w-2 h-2 bg-white" />
      </span>
      <span className="text-black text-[11px] sm:text-sm font-black uppercase tracking-widest">
        {children}
      </span>
    </div>
  );
};

export default SectionBadge;
