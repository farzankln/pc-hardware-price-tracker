"use client";

import Link from "next/link";
import { useWishlist } from "../hooks/useWishlist";
import { products } from "../data/mock-products";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { wishlist, isHydrated } = useWishlist();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-800">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Wishlist</span>
      </nav>

      <h1 className="mb-6 text-3xl font-bold text-gray-900">Your Wishlist</h1>

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg text-gray-500">Your wishlist is empty. Start adding some PC parts!</p>
          <Link
            href="/"
            className="mt-4 rounded-lg bg-gray-900 px-6 py-2 text-white transition hover:bg-gray-800"
          >
            Go to Homepage
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
