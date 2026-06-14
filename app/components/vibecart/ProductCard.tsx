import { useState } from "react";
import { Star, ShoppingCart, Check } from "lucide-react";
import type { TProduct } from "~/modules/configurables/src/constants/configurables.default";

interface ProductCardProps {
  product: TProduct;
  addToCartLabel?: string;
  onAddToCart?: (productId: string) => void;
  isInCart?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const partial = rating % 1;
  const empty = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star
          key={`f${i}`}
          className="w-3 h-3"
          fill="#f59e0b"
          stroke="none"
        />
      ))}
      {partial > 0 && (
        <div className="relative w-3 h-3">
          <Star className="w-3 h-3 absolute" fill="#e5e7eb" stroke="none" />
          <div className="overflow-hidden absolute inset-0" style={{ width: `${partial * 100}%` }}>
            <Star className="w-3 h-3" fill="#f59e0b" stroke="none" />
          </div>
        </div>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} className="w-3 h-3" fill="#e5e7eb" stroke="none" />
      ))}
    </div>
  );
}

function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

function formatReviews(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k`;
  return `${count}`;
}

export function ProductCard({
  product,
  addToCartLabel = "Add to Cart",
  onAddToCart,
  isInCart = false,
}: ProductCardProps) {
  const [added, setAdded] = useState(isInCart);
  const [animating, setAnimating] = useState(false);

  const handleAddToCart = () => {
    if (added) return;
    setAnimating(true);
    setAdded(true);
    onAddToCart?.(product.id);
    setTimeout(() => setAnimating(false), 300);
  };

  const badgeColors: Record<string, string> = {
    BESTSELLER: "#ff3d6b",
    HOT: "#ff6b00",
    SALE: "#ff3d6b",
    NEW: "#1a1f5e",
    DEAL: "#ff6b00",
    "TOP PICK": "#8b5cf6",
    TRENDING: "#0891b2",
  };

  const badgeBg = product.badge
    ? (badgeColors[product.badge.toUpperCase()] || "#ff3d6b")
    : null;

  return (
    <div
      className="vc-product-card rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "var(--vc-card)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      {/* Product Image */}
      <div className="relative" style={{ paddingBottom: "100%", overflow: "hidden" }}>
        <img
          src={product.imageUrl || "https://via.placeholder.com/400x400?text=Product"}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          style={{ transition: "transform 0.3s ease" }}
        />
        {/* Discount badge */}
        {product.badge && badgeBg && (
          <span
            className="absolute top-2 left-2 text-white text-[9px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full"
            style={{ background: badgeBg }}
          >
            {product.badge}
          </span>
        )}
        {/* Discount % overlay */}
        {product.discountPercent && product.discountPercent > 0 && (
          <span
            className="absolute top-2 right-2 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full"
            style={{ background: "var(--vc-accent)" }}
          >
            {product.discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1.5 p-3 flex-1">
        {/* Title */}
        <h3
          className="text-[13px] font-semibold leading-snug line-clamp-2"
          style={{ color: "var(--vc-text)" }}
        >
          {product.name}
        </h3>

        {/* Star Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <StarRating rating={product.rating} />
            <span className="text-[10px] font-medium" style={{ color: "var(--vc-text-muted)" }}>
              {product.rating.toFixed(1)}
              {product.reviewCount ? ` (${formatReviews(product.reviewCount)})` : ""}
            </span>
          </div>
        )}

        {/* Price row */}
        <div className="flex items-baseline gap-1.5 flex-wrap mt-0.5">
          <span
            className="text-base font-extrabold"
            style={{ color: "var(--vc-accent)" }}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span
              className="text-[11px] line-through"
              style={{ color: "var(--vc-text-muted)" }}
            >
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-auto w-full py-2.5 rounded-xl text-white text-[12px] font-bold flex items-center justify-center gap-1.5 vc-btn-press transition-all duration-200"
          style={{
            background: added ? "var(--vc-green)" : "var(--vc-primary)",
            transform: animating ? "scale(0.97)" : "scale(1)",
          }}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Added
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              {addToCartLabel}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
