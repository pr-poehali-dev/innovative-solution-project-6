import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
}

export default function ShareButton({ title, text, url, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = text || title;

  const handleNativeShare = async () => {
    const nav = typeof navigator !== "undefined"
      ? (navigator as Navigator & { share?: (data: { title?: string; text?: string; url?: string }) => Promise<void> })
      : null;
    if (nav && typeof nav.share === "function") {
      try {
        await nav.share({ title, text: shareText, url: shareUrl });
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  const handleClick = async () => {
    const shared = await handleNativeShare();
    if (!shared) {
      setMenuOpen((v) => !v);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const links = [
    { name: "WhatsApp", icon: "MessageCircle", href: `https://wa.me/?text=${encodedText}%20${encodedUrl}` },
    { name: "Telegram", icon: "Send", href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}` },
    { name: "ВКонтакте", icon: "Share2", href: `https://vk.com/share.php?url=${encodedUrl}&title=${encodeURIComponent(title)}` },
    { name: "Viber", icon: "Phone", href: `viber://forward?text=${encodedText}%20${encodedUrl}` },
  ];

  return (
    <div className={`relative inline-block ${className || ""}`}>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-accent/40 bg-accent/5 hover:bg-accent/15 hover:border-accent/70 transition-all text-sm sm:text-base font-semibold text-white"
        aria-label="Поделиться"
      >
        <Icon name="Share2" size={18} className="text-accent" />
        Поделиться
      </button>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute z-50 mt-2 right-0 sm:right-auto sm:left-0 w-64 rounded-2xl border border-accent/20 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="p-2">
              <button
                type="button"
                onClick={copyLink}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent/10 transition-all text-left"
              >
                <span className="w-9 h-9 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                  <Icon name={copied ? "Check" : "Link"} size={16} className="text-accent" />
                </span>
                <span className="font-semibold text-sm text-white">
                  {copied ? "Ссылка скопирована" : "Скопировать ссылку"}
                </span>
              </button>
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent/10 transition-all"
                >
                  <span className="w-9 h-9 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                    <Icon name={l.icon} size={16} className="text-accent" />
                  </span>
                  <span className="font-semibold text-sm text-white">{l.name}</span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}