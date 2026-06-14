import { useState, useMemo } from "react";
import { useConfigurables } from "~/modules/configurables";
import { TopBar } from "~/components/vibecart/TopBar";
import { HeroCarousel } from "~/components/vibecart/HeroCarousel";
import { CategoryGrid } from "~/components/vibecart/CategoryGrid";
import { ProductGrid } from "~/components/vibecart/ProductGrid";
import { BottomNav } from "~/components/vibecart/BottomNav";

export default function IndexPage() {
  const { config, loading } = useConfigurables();

  const [activeTab, setActiveTab] = useState("home");
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  const handleAddToCart = (productId: string) => {
    setCartItems((prev) => {
      const next = new Set(prev);
      next.add(productId);
      return next;
    });
  };

  const handleCategoryClick = (name: string) => {
    setActiveCategory((prev) => (prev === name ? undefined : name));
  };

  const filteredProducts = useMemo(() => {
    if (!config?.products) return [];
    if (!activeCategory) return config.products;
    return config.products.filter((p) => p.category === activeCategory);
  }, [config?.products, activeCategory]);

  const featuredProducts = useMemo(() => {
    if (!config?.products) return [];
    return config.products.slice(0, 4);
  }, [config?.products]);

  const topRatedProducts = useMemo(() => {
    if (!config?.products) return [];
    return [...config.products]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4);
  }, [config?.products]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "var(--vc-bg)" }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-extrabold animate-pulse"
          style={{ background: "var(--vc-primary)", color: "#fff" }}
        >
          V
        </div>
        <div
          className="h-1.5 w-24 rounded-full overflow-hidden"
          style={{ background: "var(--border)" }}
        >
          <div
            className="h-full rounded-full animate-pulse"
            style={{ background: "var(--vc-accent)", width: "60%" }}
          />
        </div>
        <p className="text-xs" style={{ color: "var(--vc-text-muted)" }}>
          Loading Vibecart...
        </p>
      </div>
    );
  }

  const appName = config?.appName || "Vibecart";
  const logoUrl = config?.logoUrl;
  const heroBanners = config?.heroBanners || [];
  const categories = config?.categories || [];
  const sectionHeadings = config?.sectionHeadings || {};
  const ctaLabels = config?.ctaLabels || {};
  const navLabels = config?.navLabels || {};
  const enableDarkMode = config?.enableDarkMode !== false;
  const autoPlayInterval = config?.carouselAutoPlayInterval || 3500;
  const productsPerRow = config?.productsPerRow || 2;

  // Render different tabs
  const renderContent = () => {
    switch (activeTab) {
      case "categories":
        return (
          <div className="flex flex-col gap-6 py-4">
            <CategoryGrid
              categories={categories}
              heading="All Categories"
              activeCategory={activeCategory}
              onCategoryClick={handleCategoryClick}
            />
            {activeCategory && (
              <ProductGrid
                products={filteredProducts}
                heading={activeCategory}
                addToCartLabel={ctaLabels.addToCart}
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                columns={productsPerRow}
              />
            )}
            {!activeCategory && (
              <ProductGrid
                products={config?.products || []}
                heading="All Products"
                addToCartLabel={ctaLabels.addToCart}
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                columns={productsPerRow}
              />
            )}
          </div>
        );

      case "cart":
        const cartProductList = (config?.products || []).filter((p) =>
          cartItems.has(p.id)
        );
        return (
          <div className="flex flex-col gap-4 py-4 px-4">
            <h2
              className="text-base font-bold"
              style={{ color: "var(--vc-text)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              My Cart ({cartItems.size})
            </h2>
            {cartProductList.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-20 gap-4"
                style={{ color: "var(--vc-text-muted)" }}
              >
                <div className="text-5xl">🛒</div>
                <p className="text-sm font-medium">Your cart is empty</p>
                <button
                  onClick={() => setActiveTab("home")}
                  className="px-6 py-2.5 rounded-xl text-white text-sm font-bold vc-btn-press"
                  style={{ background: "var(--vc-primary)" }}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {cartProductList.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-3 p-3 rounded-2xl"
                    style={{ background: "var(--vc-card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                  >
                    <img
                      src={product.imageUrl || ""}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold line-clamp-2"
                        style={{ color: "var(--vc-text)" }}
                      >
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-extrabold"
                          style={{ color: "var(--vc-accent)" }}
                        >
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                          <span
                            className="text-xs line-through"
                            style={{ color: "var(--vc-text-muted)" }}
                          >
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                      {product.discountPercent && (
                        <span
                          className="text-[10px] font-bold"
                          style={{ color: "var(--vc-sale)" }}
                        >
                          {product.discountPercent}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {/* Checkout button */}
                <button
                  className="w-full py-3.5 rounded-2xl text-white font-bold text-sm vc-btn-press mt-2"
                  style={{ background: "var(--vc-primary)" }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        );

      case "orders":
        return (
          <div
            className="flex flex-col items-center justify-center py-20 gap-4 px-4"
            style={{ color: "var(--vc-text-muted)" }}
          >
            <div className="text-5xl">📦</div>
            <p className="text-base font-semibold" style={{ color: "var(--vc-text)" }}>
              No Orders Yet
            </p>
            <p className="text-sm text-center">
              Your placed orders will appear here
            </p>
            <button
              onClick={() => setActiveTab("home")}
              className="px-6 py-2.5 rounded-xl text-white text-sm font-bold vc-btn-press"
              style={{ background: "var(--vc-primary)" }}
            >
              Shop Now
            </button>
          </div>
        );

      case "profile":
        return (
          <div className="flex flex-col gap-4 py-4 px-4">
            <div
              className="flex flex-col items-center gap-3 py-8 rounded-2xl"
              style={{ background: "var(--vc-card)" }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-extrabold text-white"
                style={{ background: "var(--vc-primary)" }}
              >
                U
              </div>
              <p className="text-base font-bold" style={{ color: "var(--vc-text)" }}>
                Guest User
              </p>
              <p className="text-sm" style={{ color: "var(--vc-text-muted)" }}>
                Sign in to access your profile
              </p>
              <button
                className="px-8 py-2.5 rounded-xl text-white text-sm font-bold vc-btn-press"
                style={{ background: "var(--vc-primary)" }}
              >
                Sign In / Register
              </button>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Orders", value: "0" },
                { label: "Wishlist", value: "0" },
                { label: "Reviews", value: "0" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-4 flex flex-col items-center gap-1"
                  style={{ background: "var(--vc-card)" }}
                >
                  <span
                    className="text-xl font-extrabold"
                    style={{ color: "var(--vc-primary)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs" style={{ color: "var(--vc-text-muted)" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default: // "home"
        return (
          <div className="flex flex-col gap-6 py-4">
            {/* Hero Carousel */}
            {heroBanners.length > 0 && (
              <HeroCarousel
                banners={heroBanners}
                autoPlayInterval={autoPlayInterval}
              />
            )}

            {/* Category Grid */}
            {categories.length > 0 && (
              <CategoryGrid
                categories={categories}
                heading={sectionHeadings.categories || "Shop by Category"}
                activeCategory={activeCategory}
                onCategoryClick={(name) => {
                  handleCategoryClick(name);
                  setActiveTab("categories");
                }}
              />
            )}

            {/* Deal Banner Strip */}
            <div
              className="mx-4 rounded-2xl p-4 flex items-center justify-between overflow-hidden relative"
              style={{ background: "var(--vc-primary)" }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 80% 50%, #fff 0%, transparent 60%)",
                }}
              />
              <div className="relative z-10">
                <p className="text-white/70 text-[11px] font-medium uppercase tracking-widest">
                  Today Only
                </p>
                <p className="text-white text-lg font-extrabold leading-tight">
                  Flash Sale
                </p>
                <p className="text-white/80 text-[11px]">
                  Up to 70% off on top brands
                </p>
              </div>
              <div className="relative z-10 flex flex-col items-end gap-1">
                <span
                  className="text-3xl font-extrabold"
                  style={{ color: "var(--vc-accent)" }}
                >
                  70%
                </span>
                <span
                  className="text-[9px] font-extrabold uppercase tracking-widest text-white/60 px-2 py-0.5 rounded-full"
                  style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                >
                  OFF
                </span>
              </div>
            </div>

            {/* Featured Deals */}
            <ProductGrid
              products={featuredProducts}
              heading={sectionHeadings.featuredDeals || "Featured Deals"}
              addToCartLabel={ctaLabels.addToCart}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              columns={productsPerRow}
            />

            {/* Top Rated */}
            <ProductGrid
              products={topRatedProducts}
              heading={sectionHeadings.topRated || "Top Rated Products"}
              addToCartLabel={ctaLabels.addToCart}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              columns={productsPerRow}
            />

            {/* Footer spacer text */}
            <div className="text-center py-4 px-4">
              <p className="text-[11px]" style={{ color: "var(--vc-text-muted)" }}>
                {config?.tagline || "Where Great Deals Meet a Premium Experience"}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--vc-bg)" }}
    >
      {/* Sticky Top Bar */}
      <TopBar
        appName={appName}
        logoUrl={logoUrl}
        cartCount={cartItems.size}
        searchPlaceholder={ctaLabels.searchPlaceholder}
        enableDarkMode={enableDarkMode}
        onCartClick={() => setActiveTab("cart")}
        onProfileClick={() => setActiveTab("profile")}
      />

      {/* Main content — padded for topbar (108px) + bottom nav (64px) */}
      <main
        className="w-full mx-auto"
        style={{ paddingTop: 108, paddingBottom: 80, maxWidth: 600 }}
      >
        {renderContent()}
      </main>

      {/* Sticky Bottom Nav */}
      <BottomNav
        activeTab={activeTab}
        cartCount={cartItems.size}
        labels={navLabels}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
