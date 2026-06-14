import { useState } from "react";
import { ShoppingCart, User, Mic, Search, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "next-themes";

interface TopBarProps {
  appName: string;
  logoUrl?: string;
  cartCount?: number;
  searchPlaceholder?: string;
  enableDarkMode?: boolean;
  onCartClick?: () => void;
  onProfileClick?: () => void;
  onSearchSubmit?: (query: string) => void;
}

export function TopBar({
  appName,
  logoUrl,
  cartCount = 0,
  searchPlaceholder = "Search products, brands & more...",
  enableDarkMode = true,
  onCartClick,
  onProfileClick,
  onSearchSubmit,
}: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      return;
    }
    setIsListening(true);
    // Pulse effect then reset
    setTimeout(() => setIsListening(false), 2000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearchSubmit) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex flex-col"
      style={{
        background: "var(--vc-primary)",
        boxShadow: "0 2px 16px rgba(26,31,94,0.25)",
      }}
    >
      {/* Top row: logo + icons */}
      <div className="flex items-center justify-between px-4 py-2" style={{ minHeight: 52 }}>
        {/* Logo / App Name */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {logoUrl && logoUrl !== "FILL_LOGO_URL_HERE" ? (
            <img
              src={logoUrl}
              alt={appName}
              className="h-8 w-8 rounded-lg object-cover"
            />
          ) : (
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center font-extrabold text-sm"
              style={{ background: "var(--vc-accent)", color: "#fff" }}
            >
              V
            </div>
          )}
          <span
            className="font-extrabold text-xl tracking-tight"
            style={{ color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {appName}
          </span>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-1">
          {enableDarkMode && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors vc-btn-press"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-white/90" />
              ) : (
                <Moon className="w-5 h-5 text-white/90" />
              )}
            </button>
          )}
          <button
            onClick={onCartClick}
            className="p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors vc-btn-press relative"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-5 h-5 text-white/90" />
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center vc-bounce-in"
                style={{ background: "var(--vc-accent)" }}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
          <button
            onClick={onProfileClick}
            className="p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors vc-btn-press"
            aria-label="Profile"
          >
            <User className="w-5 h-5 text-white/90" />
          </button>
        </div>
      </div>

      {/* Search row */}
      <div className="px-4 pb-3">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center rounded-xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
        >
          <div className="pl-3 flex-shrink-0">
            <Search className="w-4 h-4" style={{ color: "rgba(255,255,255,0.6)" }} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="flex-1 bg-transparent py-2 px-3 text-sm outline-none"
            style={{
              color: "#fff",
              caretColor: "var(--vc-accent)",
            }}
          />
          <button
            type="button"
            onClick={handleVoiceSearch}
            className="pr-3 pl-1 py-2 flex-shrink-0 vc-btn-press"
            aria-label="Voice search"
          >
            <Mic
              className={`w-4 h-4 transition-colors ${isListening ? "text-orange-400" : ""}`}
              style={{ color: isListening ? "var(--vc-accent)" : "rgba(255,255,255,0.6)" }}
            />
          </button>
        </form>
      </div>
    </header>
  );
}
