"use client";

import Link from "next/link";
import { useWishlist } from "../hooks/useWishlist";
import { products } from "../data/mock-products";
import ProductCard from "../components/ProductCard";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, isHydrated } = useWishlist();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Wishlist</h1>
        <p className="mt-4 text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
        <Link href="/" className="transition hover:text-text-primary">Home</Link>
        <span>/</span>
        <span className="text-text-primary">Wishlist</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Wishlist</h1>

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface">
            <Heart className="h-8 w-8 text-text-muted" />
          </div>
          <h2 className="mt-6 text-xl font-bold tracking-tight text-foreground">Your wishlist is empty</h2>
          <p className="mt-2 text-text-secondary">Save items you love by clicking the heart icon.</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Explore Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
