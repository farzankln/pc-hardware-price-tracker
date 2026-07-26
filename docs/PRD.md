# Product Requirements Document: PC Hardware Price Tracker

## 1. Overview

**Project Name:** PC Hardware Price Tracker  
**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4  
**Data Strategy:** All data is mock data (static JSON/TS files). No real API calls.  
**Primary Goal:** Build a responsive, desktop-first e-commerce-style UI for browsing PC hardware products, viewing details, managing a wishlist, and navigating by category.

---

## 2. User Stories

| ID | User Story | Priority |
|---|---|---|
| US-01 | As a visitor, I want to see a hero slider on the homepage so I can view featured promotions. | High |
| US-02 | As a visitor, I want to browse hardware categories so I can find relevant products quickly. | High |
| US-03 | As a visitor, I want to see special offers with discounted prices so I can identify deals. | High |
| US-04 | As a visitor, I want to scroll horizontally through category product lists so I can preview items without leaving the homepage. | High |
| US-05 | As a visitor, I want to click a product to view its full details page. | High |
| US-06 | As a visitor, I want to see detailed specs, dimensions, and description on the product page. | High |
| US-07 | As a visitor, I want to add/remove products from a wishlist so I can save favorites. | Medium |
| US-08 | As a visitor, I want my wishlist to persist across sessions so I don't lose saved items. | Medium |
| US-09 | As a visitor, I want to navigate to category pages (e.g., `/category/cpu`) so I can browse all products in a category. | High |
| US-10 | As a visitor, I want a global header with navigation so I can move between pages easily. | High |

---

## 3. Site Structure & Routing

| Route | Description |
|---|---|
| `/` | Homepage |
| `/category/[slug]` | Category product listing page |
| `/product/[id]` | Product detail page |

**Slug mapping:** `cpu`, `gpu`, `ram`, `ssd`, `hdd`, `motherboard`, `power-supply`, `case`, `cooler`, `monitor`

---

## 4. Page Specifications

### 4.1 Homepage (`/`)

#### 4.1.1 Global Header
- Fixed or sticky top navigation bar.
- Logo / brand name on the left.
- Navigation links: Home, Categories (dropdown or list), Wishlist (with count badge).
- Header should be responsive but desktop-first.

#### 4.1.2 Hero Section
- Full-width horizontal image slider / banner.
- Auto-slides on a timer (e.g., every 5 seconds).
- Each slide contains a promotional image, title, and optional CTA text.
- Mock: 3–5 static slides using placeholder images.

#### 4.1.3 Category Grid
- Grid layout displaying all 10 categories.
- Each category card includes:
  - Category name
  - Representative icon or image
  - Link to `/category/[slug]`

#### 4.1.4 Special Offers
- Exactly **5** product cards in a row/grid.
- Each card displays:
  - Product image
  - Product title
  - Original price (with strikethrough) and discounted price
  - "Special Discount" badge overlay
- Cards are clickable and navigate to `/product/[id]`.

#### 4.1.5 Category Product Lists
- For each category, render a horizontal scrollable row.
- Each row shows 6–8 product cards with:
  - Product image
  - Product title
  - Price
  - Visual separator between cards
- At the end of each row, a "View All [Category Name]" button links to `/category/[slug]`.
- Example rows: CPUs, GPUs, RAM, etc.

---

### 4.2 Category Listing Page (`/category/[slug]`)

- Page title: Category name (e.g., "CPUs").
- Product grid displaying all products belonging to that category.
- Grid is responsive but desktop-first (4 columns on large screens).
- Each card navigates to `/product/[id]`.
- Breadcrumb: Home > Category Name.

---

### 4.3 Product Details Page (`/product/[id]`)

#### 4.3.1 Product Image
- Large main image on the left side.
- Placeholder images sourced from `placehold.co` or `picsum.photos`.

#### 4.3.2 Product Information (Right side)

**General Specs:**
- Brand
- Series
- Model
- Part Number

**Technical Specs:**
- Interface
- Chipset Manufacturer
- Graphics Engine
- Memory Capacity
- Memory Type
- Core Frequency
- Memory Bus
- Memory Speed
- Max Resolution
- Required PSU
- Power Connector(s)

**3D Specs:**
- DirectX Support
- OpenGL
- CUDA Cores / Stream Processors

**Outputs:**
- HDMI Ports
- DisplayPorts
- Max Monitors Supported

**Physical Dimensions:**
- Length
- Width
- Thickness

**Description:**
- Detailed paragraph describing the product.

**Pricing & Availability:**
- Current price
- Stock status: "In Stock" or "Out of Stock"

**Actions:**
- Wishlist toggle button ("Add to Wishlist" / "Remove from Wishlist").
- Wishlist state is persisted in `localStorage`.

---

## 5. Data Model (Mock Data)

All mock data is defined in a single TypeScript file: `mock-products.ts`

### 5.1 Product Object Shape

```typescript
export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  brand: string;
  series: string;
  model: string;
  partNumber: string;
  price: number;
  originalPrice?: number; // for special discounts
  imageUrl: string;
  inStock: boolean;
  description: string;
  interface?: string;
  chipsetManufacturer?: string;
  graphicsEngine?: string;
  memoryCapacity?: string;
  memoryType?: string;
  coreFrequency?: string;
  memoryBus?: string;
  memorySpeed?: string;
  maxResolution?: string;
  requiredPSU?: string;
  powerConnectors?: string;
  directXSupport?: string;
  openGL?: string;
  cudaCores?: number;
  hdmiPorts?: number;
  displayPorts?: number;
  maxMonitorsSupported?: number;
  length?: string;
  width?: string;
  thickness?: string;
}
```

### 5.2 Category Enum

```typescript
export type CategorySlug =
  | "cpu"
  | "gpu"
  | "ram"
  | "ssd"
  | "hdd"
  | "motherboard"
  | "power-supply"
  | "case"
  | "cooler"
  | "monitor";
```

### 5.3 Mock Data Requirements
- At least **20–30** product entries.
- Distributed across all 10 categories.
- At least 5 products flagged as special offers (`originalPrice` present, indicating a discount).
- All fields populated so the UI never encounters `undefined` where data is expected.

### 5.4 Image Strategy
- Use deterministic placeholder URLs:
  - `https://placehold.co/600x400/EEE/31343C?text=CPU-1`
  - Or `https://picsum.photos/seed/cpu1/600/400`
- Each product should have a unique image URL.

---

## 6. State Management

### 6.1 Wishlist
- Stored in `localStorage` under key `wishlist`.
- Data shape: `string[]` (array of product IDs).
- Client-side state managed via React Context or a simple hook (`useWishlist`).
- Wishlist count displayed in the header badge.

### 6.2 No Server State
- All data is imported statically from `mock-products.ts`.
- No external API calls, no caching layers.

---

## 7. UI / UX Guidelines

- **Framework:** Tailwind CSS v4 with `@tailwindcss/postcss`.
- **Approach:** Desktop-first, with basic responsive adjustments for tablet/mobile.
- **Typography:** Geist Sans (primary), Geist Mono (secondary/monospace).
- **Colors:** Neutral palette with accent colors for badges and CTAs.
- **Accessibility:** Semantic HTML, alt text for images, keyboard-navigable links and buttons.
- **Loading:** No loading skeletons required for mock data (instant render).

---

## 8. File Structure (Target)

```
app/
  layout.tsx
  page.tsx
  category/
    [slug]/
      page.tsx
  product/
    [id]/
      page.tsx
  components/
    Header.tsx
    HeroSlider.tsx
    CategoryGrid.tsx
    SpecialOffers.tsx
    CategoryRow.tsx
    ProductCard.tsx
    ProductDetails.tsx
    WishlistButton.tsx
  data/
    mock-products.ts
    categories.ts
  hooks/
    useWishlist.ts
  styles/
    globals.css
```

---

## 9. Acceptance Criteria

- [ ] Homepage renders hero slider with auto-advance.
- [ ] Homepage renders 10 category cards.
- [ ] Homepage renders exactly 5 special offer cards with discount badges.
- [ ] Homepage renders horizontal scrollable rows for each category with "View All" buttons.
- [ ] Category page lists products filtered by slug.
- [ ] Product details page renders all specified specs, dimensions, description, price, and stock status.
- [ ] Wishlist toggle persists in `localStorage`.
- [ ] Header includes navigation and wishlist count.
- [ ] All links and buttons are functional.
- [ ] No API calls or environment variables required.

---

## 10. Out of Scope (Initial Release)

- Search and filtering
- User authentication
- Shopping cart / checkout flow
- Price history or alerts
- Backend / database
- Real API integrations
- Mobile-optimized layouts (desktop-first only)

---

*Document Version: 1.0*  
*Date: 2026-07-26*
