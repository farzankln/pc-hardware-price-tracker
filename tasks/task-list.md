# Task List: PC Hardware Price Tracker

**Generated from:** `docs/PRD.md`
**Target:** Junior Developer
**Estimated Duration:** 20–24 hours

---

## Task Categories

### Setup & Infrastructure

- [ ] **T001: Project Scaffolding & Config Validation**
  - [ ] Verify `package.json` dependencies include Next.js, React, TypeScript, Tailwind CSS v4, and `@tailwindcss/postcss`
  - [ ] Verify `tsconfig.json` includes path alias `@/*` mapped to root
  - [ ] Verify `app/layout.tsx` imports global styles
  - [ ] Verify `next.config.ts` has no custom requirements blocking App Router
  - [ ] Run `npm run dev` to confirm the project compiles and serves

### Data Layer

- [ ] **T002: Create Mock Data File**
  - [ ] Create `app/data/mock-products.ts`
  - [ ] Define `CategorySlug` type with all 10 slugs
  - [ ] Define `Product` interface matching PRD section 5.1
  - [ ] Add `products` array with 20–30 entries distributed across all categories
  - [ ] Ensure at least 5 products have `originalPrice` set for special discounts
  - [ ] Populate all fields so no UI render encounters `undefined` where data is expected
  - [ ] Use deterministic placeholder image URLs (`placehold.co` or `picsum.photos`)
  - [ ] Create `app/data/categories.ts` with name/slug mapping for all 10 categories

### Core Utilities & Hooks

- [ ] **T003: Wishlist Hook & Context**
  - [ ] Create `app/hooks/useWishlist.ts`
  - [ ] Implement `getWishlist()` reading `localStorage` key `wishlist`
  - [ ] Implement `addToWishlist(id)` and `removeFromWishlist(id)`
  - [ ] Implement `toggleWishlist(id)` and `isInWishlist(id)`
  - [ ] Create `WishlistContext` and `WishlistProvider` for global state
  - [ ] Wrap root layout with `WishlistProvider` in `app/layout.tsx`

### User Interface

- [ ] **T004: Global Header Component**
  - [ ] Create `app/components/Header.tsx`
  - [ ] Add brand/logo on the left
  - [ ] Add navigation links: Home, Categories dropdown/list, Wishlist
  - [ ] Add wishlist count badge reading from context
  - [ ] Make sticky/fixed top with appropriate z-index and Tailwind styling
  - [ ] Ensure desktop-first responsive layout

- [ ] **T005: Hero Slider Component**
  - [ ] Create `app/components/HeroSlider.tsx`
  - [ ] Accept array of slides (image URL, title, optional CTA)
  - [ ] Implement auto-advance timer (e.g., every 5 seconds)
  - [ ] Add manual navigation dots and prev/next buttons
  - [ ] Style full-width banner with Tailwind
  - [ ] Use mock slide data in `app/page.tsx`

- [ ] **T006: Category Grid Component**
  - [ ] Create `app/components/CategoryGrid.tsx`
  - [ ] Display all 10 categories in a grid layout
  - [ ] Each card shows category name and representative icon/image
  - [ ] Each card links to `/category/[slug]`
  - [ ] Style with Tailwind (desktop-first, e.g., 5 columns on large screens)
  - [ ] Use data from `categories.ts`

- [ ] **T007: Product Card Component**
  - [ ] Create `app/components/ProductCard.tsx`
  - [ ] Accept `Product` props
  - [ ] Render product image, title, and price
  - [ ] If `originalPrice` exists, show strikethrough original and discounted price
  - [ ] Add "Special Discount" badge when `originalPrice` is present
  - [ ] Make entire card clickable, navigating to `/product/[id]`
  - [ ] Ensure visual separator styling between cards in horizontal rows

- [ ] **T008: Special Offers Section**
  - [ ] Create `app/components/SpecialOffers.tsx`
  - [ ] Filter `products` to exactly 5 items with `originalPrice`
  - [ ] Render a row/grid of `ProductCard` components
  - [ ] Style badge, prices, and layout per PRD section 4.1.4
  - [ ] Include in homepage `app/page.tsx`

- [ ] **T009: Category Row Component**
  - [ ] Create `app/components/CategoryRow.tsx`
  - [ ] Accept `CategorySlug` and category name
  - [ ] Filter products by category and show 6–8 items
  - [ ] Render horizontal scrollable container with Tailwind (`overflow-x-auto`)
  - [ ] Add visual separator between product cards
  - [ ] Append "View All [Category Name]" button linking to `/category/[slug]`
  - [ ] Include in homepage `app/page.tsx` for each category

- [ ] **T010: Product Details Page Components**
  - [ ] Create `app/components/ProductDetails.tsx`
  - [ ] Layout: product image on the left, info on the right (desktop-first)
  - [ ] Render General Specs section (Brand, Series, Model, Part Number)
  - [ ] Render Technical Specs section with all fields from PRD section 4.3.2
  - [ ] Render 3D Specs section (DirectX, OpenGL, CUDA Cores)
  - [ ] Render Outputs section (HDMI, DisplayPort, Max Monitors)
  - [ ] Render Physical Dimensions section (Length, Width, Thickness)
  - [ ] Render Description paragraph
  - [ ] Render Price and Stock status ("In Stock" / "Out of Stock")
  - [ ] Add `WishlistButton` component (see T011)
  - [ ] Create `app/product/[id]/page.tsx` and load product by `id` from mock data
  - [ ] Add breadcrumb: Home > Category Name > Product Name

- [ ] **T011: Wishlist Button Component**
  - [ ] Create `app/components/WishlistButton.tsx`
  - [ ] Accept `productId` prop
  - [ ] Display "Add to Wishlist" or "Remove from Wishlist" based on state
  - [ ] Call `toggleWishlist(id)` on click
  - [ ] Style as a button with Tailwind
  - [ ] Integrate into `ProductDetails` page

- [ ] **T012: Category Listing Page**
  - [ ] Create `app/category/[slug]/page.tsx`
  - [ ] Read `slug` from route params
  - [ ] Filter `products` by `category` slug
  - [ ] Display category name as page title
  - [ ] Render product grid (desktop-first, 4 columns on large screens)
  - [ ] Each card links to `/product/[id]`
  - [ ] Add breadcrumb: Home > Category Name

- [ ] **T013: Homepage Assembly**
  - [ ] Update `app/page.tsx`
  - [ ] Import and render `Header`, `HeroSlider`, `CategoryGrid`, `SpecialOffers`, and `CategoryRow`
  - [ ] Pass mock data to child components
  - [ ] Ensure page structure and spacing match PRD layout

### Testing & Validation

- [ ] **T014: Manual Validation & Acceptance Criteria**
  - [ ] Run `npm run dev` and open `http://localhost:3000`
  - [ ] Verify hero slider auto-advances and controls work
  - [ ] Verify 10 category cards render and link correctly
  - [ ] Verify exactly 5 special offer cards render with discount badges
  - [ ] Verify horizontal scrollable category rows render with "View All" buttons
  - [ ] Verify category page lists filtered products
  - [ ] Verify product details page renders all specs, dimensions, description, price, and stock
  - [ ] Verify wishlist toggle works and persists in `localStorage`
  - [ ] Verify header includes navigation and wishlist count
  - [ ] Verify no API calls or environment variables are required
  - [ ] Run `npm run lint` and fix any linting errors

---

## Task Dependencies

- T002 depends on T001 (project compiles)
- T003 depends on T002 (mock data shape defined)
- T004 depends on T003 (wishlist hook exists)
- T005 depends on T001 (project compiles)
- T006 depends on T002 (categories data exists)
- T007 depends on T002 (product data shape exists)
- T008 depends on T007 and T002 (product cards + mock data)
- T009 depends on T007 and T002 (product cards + mock data)
- T010 depends on T002 and T011 (mock data + wishlist button)
- T011 depends on T003 (wishlist hook exists)
- T012 depends on T002 (mock data exists)
- T013 depends on T004, T005, T006, T008, T009 (all homepage components)
- T014 depends on all prior tasks (full validation)

---

## Relevant Files

_To be updated as development progresses_

- `app/data/mock-products.ts` - Product interface and mock product array
- `app/data/categories.ts` - Category name/slug mapping
- `app/hooks/useWishlist.ts` - Wishlist hook and React Context
- `app/components/Header.tsx` - Global navigation header
- `app/components/HeroSlider.tsx` - Auto-advancing hero banner
- `app/components/CategoryGrid.tsx` - 10-category grid
- `app/components/ProductCard.tsx` - Reusable product card
- `app/components/SpecialOffers.tsx` - 5 special offer cards
- `app/components/CategoryRow.tsx` - Horizontal scrollable category rows
- `app/components/ProductDetails.tsx` - Product detail layout and spec rendering
- `app/components/WishlistButton.tsx` - Wishlist toggle button
- `app/layout.tsx` - Root layout with providers
- `app/page.tsx` - Homepage assembly
- `app/category/[slug]/page.tsx` - Category listing page
- `app/product/[id]/page.tsx` - Product detail page
- `docs/PRD.md` - Source requirements document
