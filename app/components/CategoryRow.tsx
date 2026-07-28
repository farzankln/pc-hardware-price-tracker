import Link from "next/link";
import { products } from "../data/mock-products";
import ProductCard from "./ProductCard";
import type { CategorySlug } from "../data/categories";
import { ArrowRight } from "lucide-react";

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
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground">{categoryName}</h2>
        <Link
          href={`/category/${categorySlug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:text-primary-hover"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {categoryProducts.length === 0 ? (
        <p className="text-text-muted">No products in this category.</p>
      ) : (
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
          {categoryProducts.map((product) => (
            <div key={product.id} className="min-w-[220px] sm:min-w-[240px] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
