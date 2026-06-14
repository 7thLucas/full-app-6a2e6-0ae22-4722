/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
  dealBadge?: string;
  saleBadge?: string;
};

export type THeroBanner = {
  title: string;
  subtitle?: string;
  badgeText?: string;
  ctaText?: string;
  bgColor?: string;
  imageUrl?: string;
};

export type TCategory = {
  name: string;
  icon?: string;
  color?: string;
};

export type TProduct = {
  id: string;
  name: string;
  category?: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  badge?: string;
  inStock?: boolean;
};

export type TSectionHeadings = {
  heroBanner?: string;
  categories?: string;
  featuredDeals?: string;
  topRated?: string;
};

export type TCtaLabels = {
  addToCart?: string;
  buyNow?: string;
  viewAll?: string;
  searchPlaceholder?: string;
};

export type TNavLabels = {
  home?: string;
  categories?: string;
  cart?: string;
  orders?: string;
  profile?: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  tagline?: string;
  logoUrl: string;
  brandColor: TBrandColor;
  heroBanners?: THeroBanner[];
  categories?: TCategory[];
  products?: TProduct[];
  sectionHeadings?: TSectionHeadings;
  ctaLabels?: TCtaLabels;
  navLabels?: TNavLabels;
  enableDarkMode?: boolean;
  carouselAutoPlayInterval?: number;
  productsPerRow?: number;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "Vibecart",
  tagline: "Where Great Deals Meet a Premium Experience",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#1a1f5e",
    secondary: "#2d3282",
    accent: "#ff6b00",
    dealBadge: "#ff6b00",
    saleBadge: "#ff3d6b",
  },
  enableDarkMode: true,
  carouselAutoPlayInterval: 3500,
  productsPerRow: 2,
  sectionHeadings: {
    heroBanner: "Today's Best Deals",
    categories: "Shop by Category",
    featuredDeals: "Featured Deals",
    topRated: "Top Rated Products",
  },
  ctaLabels: {
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    viewAll: "View All",
    searchPlaceholder: "Search products, brands & more...",
  },
  navLabels: {
    home: "Home",
    categories: "Categories",
    cart: "My Cart",
    orders: "Orders",
    profile: "Profile",
  },
  heroBanners: [
    {
      title: "FLAT 50% OFF",
      subtitle: "On Fashion & Lifestyle",
      badgeText: "LIMITED DEAL",
      ctaText: "Shop Now",
      bgColor: "#1a1f5e",
      imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    },
    {
      title: "NEW ARRIVALS",
      subtitle: "Latest Electronics 2026",
      badgeText: "JUST IN",
      ctaText: "Explore",
      bgColor: "#0d1b3e",
      imageUrl: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80",
    },
    {
      title: "UP TO 70% OFF",
      subtitle: "Home Décor Mega Sale",
      badgeText: "SALE",
      ctaText: "Grab Deal",
      bgColor: "#2d1b4e",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    },
  ],
  categories: [
    { name: "Fashion", icon: "👗", color: "#ff6b8a" },
    { name: "Electronics", icon: "📱", color: "#1a1f5e" },
    { name: "Beauty", icon: "💄", color: "#ff3d6b" },
    { name: "Home Décor", icon: "🏠", color: "#ff8c00" },
    { name: "Sports", icon: "⚽", color: "#22c55e" },
    { name: "Toys", icon: "🧸", color: "#f59e0b" },
    { name: "Grocery", icon: "🛒", color: "#10b981" },
    { name: "Books", icon: "📚", color: "#8b5cf6" },
  ],
  products: [
    {
      id: "p1",
      name: "Floral Wrap Dress",
      category: "Fashion",
      description: "Elegant floral pattern, perfect for any occasion",
      price: 899,
      originalPrice: 1999,
      discountPercent: 55,
      rating: 4.5,
      reviewCount: 2841,
      imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80",
      badge: "BESTSELLER",
      inStock: true,
    },
    {
      id: "p2",
      name: "Wireless Earbuds Pro",
      category: "Electronics",
      description: "Active noise cancellation, 30hr battery life",
      price: 2499,
      originalPrice: 5999,
      discountPercent: 58,
      rating: 4.7,
      reviewCount: 12540,
      imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
      badge: "HOT",
      inStock: true,
    },
    {
      id: "p3",
      name: "Rose Gold Lipstick Set",
      category: "Beauty",
      description: "Long-lasting matte finish, 6 vibrant shades",
      price: 499,
      originalPrice: 999,
      discountPercent: 50,
      rating: 4.3,
      reviewCount: 5623,
      imageUrl: "https://images.unsplash.com/photo-1586495777744-4e6232bf5d58?w=400&q=80",
      badge: "SALE",
      inStock: true,
    },
    {
      id: "p4",
      name: "Minimalist Desk Lamp",
      category: "Home Décor",
      description: "LED smart lamp with touch dimmer, USB-C charging",
      price: 1299,
      originalPrice: 2799,
      discountPercent: 54,
      rating: 4.6,
      reviewCount: 3210,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      badge: "NEW",
      inStock: true,
    },
    {
      id: "p5",
      name: "Men's Slim Fit Shirt",
      category: "Fashion",
      description: "Premium cotton, wrinkle-resistant fabric",
      price: 599,
      originalPrice: 1299,
      discountPercent: 54,
      rating: 4.4,
      reviewCount: 8920,
      imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
      badge: "DEAL",
      inStock: true,
    },
    {
      id: "p6",
      name: "Smart Watch Series 5",
      category: "Electronics",
      description: "Health tracking, GPS, waterproof, AMOLED display",
      price: 4999,
      originalPrice: 9999,
      discountPercent: 50,
      rating: 4.8,
      reviewCount: 21000,
      imageUrl: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&q=80",
      badge: "TOP PICK",
      inStock: true,
    },
    {
      id: "p7",
      name: "Vitamin C Serum",
      category: "Beauty",
      description: "Brightening formula with hyaluronic acid",
      price: 349,
      originalPrice: 799,
      discountPercent: 56,
      rating: 4.5,
      reviewCount: 7412,
      imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80",
      badge: "SALE",
      inStock: true,
    },
    {
      id: "p8",
      name: "Boho Macramé Wall Art",
      category: "Home Décor",
      description: "Handcrafted wall hanging, 60cm x 40cm",
      price: 799,
      originalPrice: 1599,
      discountPercent: 50,
      rating: 4.2,
      reviewCount: 1823,
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
      badge: "TRENDING",
      inStock: true,
    },
  ],
};
