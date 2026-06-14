# Design System — Vibecart

## Color Palette
- **Primary**: Deep indigo/navy — `#1a1f5e` / `#2d3282` (headers, nav, primary buttons)
- **Accent / Deals**: Orange — `#ff6b00` / `#ff8c00` (deal tags, CTA highlights, price badges)
- **Sale Badges**: Rose/coral — `#ff3d6b` / `#ff6b8a` (sale labels, discount percentages)
- **Background Light**: `#f4f5fa` with white cards
- **Background Dark**: `#0d0f1a` with `#1a1d2e` card surfaces
- **Text Primary**: `#1a1f3c` (light) / `#e8eaf6` (dark)
- **Text Secondary**: `#6b7280`
- **Success Green**: `#22c55e` (ratings, availability)

## Typography
- **Display / Price Tags**: Bold (700–800 weight), large — punchy deal numbers
- **Product Titles**: Semi-bold (600), 14–16px
- **Body / Descriptions**: Regular (400), 13–14px
- **Discount Tags**: Extra-bold (800), uppercase, colored (orange or rose)

## Elevation & Shadows
- **Cards**: Subtle shadow — `box-shadow: 0 2px 12px rgba(0,0,0,0.08)` (light) / `0 2px 16px rgba(0,0,0,0.4)` (dark)
- **Top Bar**: Sticky with blur backdrop — `backdrop-filter: blur(12px)`
- **Bottom Nav**: Elevated, shadow upward — `box-shadow: 0 -4px 20px rgba(0,0,0,0.1)`
- **Hero Carousel**: Full-width, no card shadow — uses gradient overlays

## Components

### Smart Top Bar
- Sticky, full-width, indigo/navy background
- Left: Vibecart wordmark logo
- Center: Search bar with rounded corners, mic icon (voice search) on right side of input
- Right: Cart icon with badge counter, User profile avatar/icon
- Height: 56px mobile / 64px desktop
- Backdrop blur in dark mode

### Hero Deal Carousel
- Full-width, ~200–260px tall on mobile
- Gradient-overlaid banners with bold deal text (e.g. "FLAT 50% OFF", "NEW ARRIVALS")
- Auto-plays every 3.5s with smooth CSS transition
- Pagination dots below
- Image fills width; text overlaid with gradient background bottom-up

### Category Discovery Grid
- Horizontal scroll row (hide scrollbar on mobile)
- Each item: circular icon container (indigo or colored), label below
- Categories: Fashion, Electronics, Beauty, Home Décor, Sports, Toys, Grocery, Books
- 72–80px icon circles, 12px label text
- Subtle active/hover state (scale + shadow)

### Product Card
- White card, 8–12px border radius
- Top: Product image (aspect ratio 1:1 or 4:3), cover fit
- Discount badge: top-left corner, rose/coral pill badge
- Bottom section:
  - Product title (2-line clamp)
  - Star rating row (filled stars, numeric 4.5★, review count)
  - Price row: current price bold orange, original price strikethrough gray, discount % tag
  - "Add to Cart" button: full-width, indigo fill, rounded, smooth hover/tap effect

### Sticky Bottom Navigation
- Fixed bottom, full-width
- 5 tabs: Home, Categories, My Cart, Orders, Profile
- Icon + label for each tab
- Active tab: indigo/orange colored icon
- Unread badge on My Cart
- Height: 60–64px with safe-area padding

### Dark Mode Toggle
- Floating toggle button or header icon
- Smooth CSS theme transition (200ms)
- Persists to localStorage
- Sun/moon icon swap

## Motion & Animation
- Carousel: CSS transform translate with ease-in-out, 400ms
- Page transitions: fade + slide up (150ms)
- Button press: scale(0.96) on active
- Card hover: translateY(-4px) + shadow increase (desktop)
- Category item tap: scale(0.92) pulse
- Add to Cart: brief scale bounce + color flash

## Layout
- Mobile-first, max-width 480px on mobile, fluid up to 1280px desktop
- Inner horizontal padding: 16px mobile, 24px desktop
- Grid: 2-column product grid on mobile, 3–4 on desktop
- Sections separated by 24–32px gaps
- Bottom padding accounts for sticky nav height (64px)