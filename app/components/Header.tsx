"use client";

import Link from "next/link";
import { useWishlist } from "../hooks/useWishlist";
import { categories } from "../data/categories";

export default function Header() {
  const { wishlist, isHydrated } = useWishlist();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-gray-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold">
          PC Tracker
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-gray-300 hover:text-white">
            Home
          </Link>

          <div className="relative group">
            <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-white">
              Categories
            </button>
            <div className="absolute left-0 top-full hidden min-w-[160px] rounded-md border border-gray-700 bg-gray-800 p-2 shadow-lg group-hover:block">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="block rounded px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/wishlist" className="relative text-sm text-gray-300 hover:text-white">
            Wishlist
            {isHydrated && wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
