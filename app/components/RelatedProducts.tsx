import ProductCard from "./ProductCard";
import { products } from "../data/mock-products";
import type { CategorySlug } from "../data/categories";

export function RelatedProducts({
  currentProductId,
  categorySlug,
  limit = 4,
}: {
  currentProductId: string;
  categorySlug: CategorySlug;
  limit?: number;
}) {
  const related = products
    .filter((p) => p.category === categorySlug && p.id !== currentProductId)
    .slice(0, limit);

  if (related.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {related.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
