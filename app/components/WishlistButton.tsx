"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";

export default function WishlistButton({ productId }: { productId: string }) {
  const { toggleWishlist, isInWishlist, isHydrated } = useWishlist();
  const inWishlist = isInWishlist(productId);

  return (
    <button
      onClick={() => toggleWishlist(productId)}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/50 ${
        inWishlist
          ? "border-danger bg-danger-muted text-danger"
          : "border-border bg-background text-text-secondary hover:bg-surface hover:text-foreground"
      }`}
    >
      <Heart className={`h-4 w-4 ${isHydrated && inWishlist ? "fill-danger" : ""}`} />
      {isHydrated ? (inWishlist ? "Remove from Wishlist" : "Add to Wishlist") : "Add to Wishlist"}
    </button>
  );
}
