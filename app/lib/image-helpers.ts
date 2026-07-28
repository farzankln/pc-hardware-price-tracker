import type { Product } from "@/app/data/mock-products";

export function getProductImage(product: Product): string {
  return product.imageUrl || product.fallbackImageUrl || "/img/placeholder.svg";
}
