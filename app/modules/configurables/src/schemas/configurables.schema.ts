/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "Tagline",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
        {
          fieldName: "dealBadge",
          type: "color",
          required: false,
          label: "Deal Badge Color",
        },
        {
          fieldName: "saleBadge",
          type: "color",
          required: false,
          label: "Sale Badge Color",
        },
      ],
    },
    {
      fieldName: "heroBanners",
      type: "array",
      label: "Hero Banners",
      item: {
        type: "object",
        fields: [
          { fieldName: "title", type: "string", required: true, label: "Title" },
          { fieldName: "subtitle", type: "string", required: false, label: "Subtitle" },
          { fieldName: "badgeText", type: "string", required: false, label: "Badge Text" },
          { fieldName: "ctaText", type: "string", required: false, label: "CTA Button Text" },
          { fieldName: "bgColor", type: "color", required: false, label: "Background Color" },
          { fieldName: "imageUrl", type: "url", required: false, label: "Banner Image URL" },
        ],
      },
    },
    {
      fieldName: "categories",
      type: "array",
      label: "Categories",
      item: {
        type: "object",
        fields: [
          { fieldName: "name", type: "string", required: true, label: "Name" },
          { fieldName: "icon", type: "string", required: false, label: "Icon Emoji" },
          { fieldName: "color", type: "color", required: false, label: "Icon Background Color" },
        ],
      },
    },
    {
      fieldName: "products",
      type: "array",
      label: "Products",
      item: {
        type: "object",
        fields: [
          { fieldName: "id", type: "string", required: true, label: "Product ID" },
          { fieldName: "name", type: "string", required: true, label: "Product Name" },
          { fieldName: "category", type: "string", required: false, label: "Category" },
          { fieldName: "description", type: "string", required: false, label: "Short Description" },
          { fieldName: "price", type: "number", required: true, label: "Current Price" },
          { fieldName: "originalPrice", type: "number", required: false, label: "Original Price" },
          { fieldName: "discountPercent", type: "number", required: false, label: "Discount %" },
          { fieldName: "rating", type: "number", required: false, label: "Star Rating" },
          { fieldName: "reviewCount", type: "number", required: false, label: "Review Count" },
          { fieldName: "imageUrl", type: "url", required: false, label: "Product Image URL" },
          { fieldName: "badge", type: "string", required: false, label: "Badge Label" },
          { fieldName: "inStock", type: "boolean", required: false, label: "In Stock" },
        ],
      },
    },
    {
      fieldName: "sectionHeadings",
      type: "object",
      label: "Section Headings",
      fields: [
        { fieldName: "heroBanner", type: "string", required: false, label: "Hero Banner Section" },
        { fieldName: "categories", type: "string", required: false, label: "Categories Section" },
        { fieldName: "featuredDeals", type: "string", required: false, label: "Featured Deals Section" },
        { fieldName: "topRated", type: "string", required: false, label: "Top Rated Section" },
      ],
    },
    {
      fieldName: "ctaLabels",
      type: "object",
      label: "CTA Labels",
      fields: [
        { fieldName: "addToCart", type: "string", required: false, label: "Add to Cart Button" },
        { fieldName: "buyNow", type: "string", required: false, label: "Buy Now Button" },
        { fieldName: "viewAll", type: "string", required: false, label: "View All Button" },
        { fieldName: "searchPlaceholder", type: "string", required: false, label: "Search Placeholder" },
      ],
    },
    {
      fieldName: "navLabels",
      type: "object",
      label: "Navigation Labels",
      fields: [
        { fieldName: "home", type: "string", required: false, label: "Home Tab" },
        { fieldName: "categories", type: "string", required: false, label: "Categories Tab" },
        { fieldName: "cart", type: "string", required: false, label: "Cart Tab" },
        { fieldName: "orders", type: "string", required: false, label: "Orders Tab" },
        { fieldName: "profile", type: "string", required: false, label: "Profile Tab" },
      ],
    },
    {
      fieldName: "enableDarkMode",
      type: "boolean",
      required: false,
      label: "Enable Dark Mode Toggle",
    },
    {
      fieldName: "carouselAutoPlayInterval",
      type: "number",
      required: false,
      label: "Carousel Auto-Play Interval (ms)",
      min: 1000,
      max: 10000,
    },
    {
      fieldName: "productsPerRow",
      type: "number",
      required: false,
      label: "Products Per Row (Mobile)",
      min: 1,
      max: 3,
    },
  ],
};
