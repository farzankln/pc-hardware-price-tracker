"use client";

import { useWishlist } from "../hooks/useWishlist";

export default function WishlistButton({ productId }: { productId: string }) {
  const { toggleWishlist, isInWishlist, isHydrated } = useWishlist();
  const inWishlist = isInWishlist(productId);

  return (
    <button
      onClick={() => toggleWishlist(productId)}
      className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 transition hover:bg-gray-50"
    >
      {isHydrated ? (inWishlist ? "💔 Remove from Wishlist" : "❤️ Add to Wishlist") : "❤️ Add to Wishlist"}
    </button>
  );
}
