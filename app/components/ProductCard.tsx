"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "../data/mock-products";
import { Heart } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";

export default function ProductCard({
  product,
  separator = false,
}: {
  product: Product;
  separator?: boolean;
}) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const hasDiscount = typeof product.originalPrice === "number";
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;
  const [imgSrc, setImgSrc] = useState(product.imageUrl);

  const handleImageError = () => {
    if (imgSrc !== product.fallbackImageUrl) {
      setImgSrc(product.fallbackImageUrl || "/img/placeholder.svg");
    }
  };

  return (
    <div
      className={`group relative flex flex-col rounded-xl border border-border bg-background transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-border-strong ${
        separator
          ? "border-r border-t-0 border-b-0 border-l-0 rounded-none last:border-r-0"
          : ""
      }`}
    >
      <Link href={`/product/${product.id}`} className="flex flex-col flex-1">
        <div className="relative aspect-square w-full bg-surface">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            unoptimized
            onError={handleImageError}
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
          {hasDiscount && (
            <span className="absolute left-2 top-2 rounded-lg bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
              -{discountPercent}%
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
              <span className="rounded-lg bg-danger px-3 py-1 text-xs font-bold text-danger-foreground">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-3">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-text-primary">
            {product.name}
          </h3>

          <div className="mt-auto pt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-lg font-bold text-text-primary">
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="font-mono text-xs text-text-muted line-through">
                  ${product.originalPrice!.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className="absolute right-2 top-2 rounded-lg bg-background/80 p-1.5 text-text-muted opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:text-danger focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`h-4 w-4 ${inWishlist ? "fill-danger text-danger" : ""}`} />
      </button>
    </div>
  );
}
