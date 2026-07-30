"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import { categories } from "../data/categories";
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Cpu,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDesktopCategoryOpen, setIsDesktopCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { wishlist, isHydrated: wishlistHydrated } = useWishlist();
  const { getTotalItems, isHydrated: cartHydrated } = useCart();
  const cartCount = getTotalItems();

  // Refs for focus trap
  const sidebarRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setSearchQuery("");
    setIsSidebarOpen(false);
  };

  // Close sidebar on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
        setIsCategoryOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSidebarOpen]);

  // Prevent scroll and manage focus when sidebar opens/closes
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        const searchInput = document.getElementById("sidebar-search-input");
        if (searchInput) {
          (searchInput as HTMLInputElement).focus();
          firstFocusableRef.current = searchInput as HTMLInputElement;
        }
      }, 100);
    } else {
      document.body.style.overflow = originalOverflow || "";
    }
    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [isSidebarOpen]);

  // Focus trap for sidebar
  const handleSidebarKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isSidebarOpen) return;
      if (e.key === "Tab") {
        const focusableElements =
          sidebarRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [isSidebarOpen],
  );

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
    setIsCategoryOpen(false);
  }, []);

  const toggleDesktopCategory = useCallback(() => {
    setIsDesktopCategoryOpen((prev) => !prev);
  }, []);

  const handleDesktopMouseLeave = useCallback(() => {
    setIsDesktopCategoryOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
          >
            <Cpu className="h-6 w-6 text-primary" />
            <span>PC Tracker</span>
          </Link>

          {/* Desktop search bar */}
          <div className="hidden flex-1 max-w-xl md:block">
            <form onSubmit={handleSearch} className="relative">
              <button
                type="submit"
                aria-label="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted transition hover:text-foreground"
              >
                <Search className="h-4 w-4" />
              </button>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hardware..."
                className="h-10 w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-sm text-foreground placeholder:text-text-muted transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Search hardware"
              />
            </form>
          </div>

          {/* Desktop navigation */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition hover:bg-surface hover:text-foreground"
            >
              Home
            </Link>

            {/* Categories dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDesktopCategoryOpen(true)}
              onMouseLeave={handleDesktopMouseLeave}
            >
              <button
                onClick={toggleDesktopCategory}
                aria-expanded={isDesktopCategoryOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition hover:bg-surface hover:text-foreground"
              >
                Categories
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDesktopCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDesktopCategoryOpen && (
                <div
                  className="absolute right-0 top-full min-w-[180px] rounded-xl border border-border bg-background p-1.5 shadow-xl"
                  role="menu"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-text-secondary transition hover:bg-surface hover:text-foreground"
                      role="menuitem"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/wishlist"
              className="relative rounded-lg p-2 text-text-secondary transition hover:bg-surface hover:text-foreground"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistHydrated && wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative rounded-lg p-2 text-text-secondary transition hover:bg-surface hover:text-foreground"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartHydrated && cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile header icons */}
          <div className="flex items-center gap-1 md:hidden">
            <Link
              href="/wishlist"
              className="relative rounded-lg p-2 text-text-secondary transition hover:bg-surface hover:text-foreground"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistHydrated && wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative rounded-lg p-2 text-text-secondary transition hover:bg-surface hover:text-foreground"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartHydrated && cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-lg p-2 text-text-secondary transition hover:bg-surface hover:text-foreground"
              aria-label="Open menu"
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <div
        className={`fixed inset-0 z-50 ${
          isSidebarOpen ? "" : "pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        {/* Backdrop با تیرگی و بلور قوی‌تر */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300 ease-in-out ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeSidebar}
          aria-hidden="true"
        />

        {/* Drawer content */}
        <div
          ref={sidebarRef}
          onKeyDown={handleSidebarKeyDown}
          className={`absolute inset-y-0 left-0 w-80 transform border-r border-border bg-background shadow-xl transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <span className="text-lg font-bold text-foreground">Menu</span>
            <button
              onClick={closeSidebar}
              className="rounded-lg p-2 text-text-secondary transition hover:bg-surface hover:text-foreground"
              aria-label="Close menu"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* 
            اینجا همان جایی بود که قبلاً bg-red-500 داشت.
            اکنون با bg-surface جایگزین شده تا با تم هماهنگ باشد.
          */}
          <div className="flex flex-col gap-4 overflow-y-auto px-4 py-4 h-screen bg-surface">
            {/* Search inside sidebar */}
            <form onSubmit={handleSearch} className="relative">
              <button
                type="submit"
                aria-label="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted transition hover:text-foreground"
              >
                <Search className="h-4 w-4" />
              </button>
              <input
                id="sidebar-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hardware..."
                className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-text-muted transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Search hardware"
              />
            </form>

            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              <Link
                href="/"
                onClick={closeSidebar}
                className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition hover:bg-background hover:text-foreground"
              >
                Home
              </Link>

              {/* Categories dropdown on mobile */}
              <div>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition hover:bg-background hover:text-foreground"
                  aria-expanded={isCategoryOpen}
                  type="button"
                >
                  Categories
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isCategoryOpen && (
                  <div className="mt-1 ml-2 flex flex-col gap-1 border-l border-border pl-3">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={closeSidebar}
                        className="rounded-lg px-3 py-2 text-sm text-text-secondary transition hover:bg-background hover:text-foreground"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
