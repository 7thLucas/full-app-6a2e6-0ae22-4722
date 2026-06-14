import { ProductCard } from "./ProductCard";
import type { TProduct } from "~/modules/configurables/src/constants/configurables.default";

interface ProductGridProps {
  products: TProduct[];
  heading?: string;
  addToCartLabel?: string;
  cartItems?: Set<string>;
  onAddToCart?: (productId: string) => void;
  columns?: number;
}

export function ProductGrid({
  products,
  heading,
  addToCartLabel = "Add to Cart",
  cartItems = new Set(),
  onAddToCart,
  columns = 2,
}: ProductGridProps) {
  if (!products || products.length === 0) return null;

  const gridCols =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
      ? "grid-cols-3"
      : "grid-cols-2";

  return (
    <section className="px-4">
      {heading && (
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-base font-bold"
            style={{
              color: "var(--vc-text)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {heading}
          </h2>
          <button
            className="text-xs font-semibold px-3 py-1 rounded-full vc-btn-press"
            style={{
              color: "var(--vc-primary)",
              background: "var(--vc-card)",
              border: "1.5px solid var(--vc-primary)",
            }}
          >
            View All
          </button>
        </div>
      )}
      <div className={`grid ${gridCols} gap-3`}>
        {products.map((product) => (
          <div key={product.id} className="vc-fade-in">
            <ProductCard
              product={product}
              addToCartLabel={addToCartLabel}
              onAddToCart={onAddToCart}
              isInCart={cartItems.has(product.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
