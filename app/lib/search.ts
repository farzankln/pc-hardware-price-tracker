import { products } from "@/app/data/mock-products";
import { categories } from "@/app/data/categories";
import type { Product } from "@/app/data/mock-products";

export function searchProducts(query: string): Product[] {
  const normalized = query.toLowerCase().trim();

  if (!normalized) return [];

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(normalized) ||
      product.brand.toLowerCase().includes(normalized) ||
      product.category.toLowerCase().includes(normalized) ||
      product.series?.toLowerCase().includes(normalized) ||
      product.model?.toLowerCase().includes(normalized),
  );
}

export function findMatchingCategory(query: string): string | null {
  const normalized = query.toLowerCase().trim();

  const match = categories.find(
    (cat) =>
      cat.name.toLowerCase() === normalized ||
      cat.slug === normalized,
  );

  return match ? match.slug : null;
}