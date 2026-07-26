import Link from "next/link";
import { products } from "../data/mock-products";
import ProductCard from "./ProductCard";
import type { CategorySlug } from "../data/categories";

export default function CategoryRow({
  categorySlug,
  categoryName,
}: {
  categorySlug: CategorySlug;
  categoryName: string;
}) {
  const categoryProducts = products
    .filter((p) => p.category === categorySlug)
    .slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{categoryName}</h2>
        <Link
          href={`/category/${categorySlug}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View All {categoryName}
        </Link>
      </div>

      {categoryProducts.length === 0 ? (
        <p className="text-gray-500">No products in this category.</p>
      ) : (
        <div className="flex overflow-x-auto gap-4 pb-4">
          {categoryProducts.map((product) => (
            <div key={product.id} className="min-w-[220px] flex-shrink-0">
              <ProductCard product={product} separator />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
