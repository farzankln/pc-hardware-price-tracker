"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import { categories } from "../data/categories";
import { Search, Heart, ShoppingCart, Menu, X, Cpu } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { wishlist, isHydrated: wishlistHydrated } = useWishlist();
  const { getTotalItems, isHydrated: cartHydrated } = useCart();
  const cartCount = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
            <Cpu className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">PC Tracker</span>
          </Link>

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

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition hover:bg-surface hover:text-foreground"
            >
              Home
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition hover:bg-surface hover:text-foreground">
                Categories
              </button>
              <div className="absolute right-0 top-full hidden min-w-[180px] rounded-xl border border-border bg-background p-1.5 shadow-xl group-hover:block">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-text-secondary transition hover:bg-surface hover:text-foreground"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
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

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/cart"
              className="relative rounded-lg p-2 text-text-secondary"
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-text-secondary"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="mb-4">
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
                  className="h-10 w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-sm text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Search hardware"
                />
              </form>
            </div>
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/wishlist"
                className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wishlist
                {wishlistHydrated && wishlist.length > 0 && (
                  <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
