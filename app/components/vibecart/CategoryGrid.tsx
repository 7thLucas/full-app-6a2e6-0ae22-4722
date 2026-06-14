import type { TCategory } from "~/modules/configurables/src/constants/configurables.default";

interface CategoryGridProps {
  categories: TCategory[];
  heading?: string;
  activeCategory?: string;
  onCategoryClick?: (name: string) => void;
}

export function CategoryGrid({
  categories,
  heading,
  activeCategory,
  onCategoryClick,
}: CategoryGridProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="px-4">
      {heading && (
        <h2
          className="text-base font-bold mb-3"
          style={{
            color: "var(--vc-text)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {heading}
        </h2>
      )}
      <div
        className="flex gap-4 overflow-x-auto pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {categories.map((cat, idx) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={idx}
              onClick={() => onCategoryClick?.(cat.name)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 vc-category-item transition-transform"
              style={{ scrollSnapAlign: "start", minWidth: 68 }}
            >
              <div
                className="w-[68px] h-[68px] rounded-2xl flex items-center justify-center text-2xl transition-all duration-200"
                style={{
                  background: isActive
                    ? cat.color || "var(--vc-primary)"
                    : "var(--vc-card)",
                  boxShadow: isActive
                    ? `0 4px 16px ${cat.color || "var(--vc-primary)"}40`
                    : "0 2px 8px rgba(0,0,0,0.07)",
                  border: isActive
                    ? `2px solid ${cat.color || "var(--vc-primary)"}`
                    : "2px solid transparent",
                  transform: isActive ? "scale(1.06)" : "scale(1)",
                }}
              >
                <span style={{ filter: isActive ? "none" : "grayscale(0.1)" }}>
                  {cat.icon || "🛍️"}
                </span>
              </div>
              <span
                className="text-[11px] font-semibold text-center leading-tight max-w-[68px]"
                style={{
                  color: isActive ? "var(--vc-primary)" : "var(--vc-text-muted)",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
