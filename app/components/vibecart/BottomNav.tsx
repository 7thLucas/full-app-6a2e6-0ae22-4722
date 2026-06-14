import { Home, Grid3X3, ShoppingCart, Package, User } from "lucide-react";

interface BottomNavProps {
  activeTab?: string;
  cartCount?: number;
  labels?: {
    home?: string;
    categories?: string;
    cart?: string;
    orders?: string;
    profile?: string;
  };
  onTabChange?: (tab: string) => void;
}

const tabs = [
  { key: "home", Icon: Home },
  { key: "categories", Icon: Grid3X3 },
  { key: "cart", Icon: ShoppingCart },
  { key: "orders", Icon: Package },
  { key: "profile", Icon: User },
] as const;

export function BottomNav({
  activeTab = "home",
  cartCount = 0,
  labels = {},
  onTabChange,
}: BottomNavProps) {
  const defaultLabels: Record<string, string> = {
    home: labels.home || "Home",
    categories: labels.categories || "Categories",
    cart: labels.cart || "My Cart",
    orders: labels.orders || "Orders",
    profile: labels.profile || "Profile",
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around"
      style={{
        background: "var(--vc-card)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
        height: 64,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {tabs.map(({ key, Icon }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            onClick={() => onTabChange?.(key)}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full vc-btn-press transition-colors relative"
            aria-label={defaultLabels[key]}
          >
            <div className="relative">
              <Icon
                className="w-5 h-5 transition-colors duration-200"
                style={{
                  color: isActive ? "var(--vc-primary)" : "var(--vc-text-muted)",
                  strokeWidth: isActive ? 2.5 : 1.8,
                }}
              />
              {/* Cart badge */}
              {key === "cart" && cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 text-white text-[9px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center"
                  style={{ background: "var(--vc-sale)" }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </div>
            <span
              className="text-[10px] font-medium transition-colors duration-200"
              style={{
                color: isActive ? "var(--vc-primary)" : "var(--vc-text-muted)",
                fontWeight: isActive ? 700 : 500,
              }}
            >
              {defaultLabels[key]}
            </span>
            {/* Active indicator dot */}
            {isActive && (
              <div
                className="absolute top-1.5 w-1 h-1 rounded-full"
                style={{ background: "var(--vc-accent)" }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
