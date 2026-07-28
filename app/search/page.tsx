"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, Suspense } from "react";
import { searchProducts, findMatchingCategory } from "@/app/lib/search";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";
import type { Product } from "@/app/data/mock-products";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const categorySlug = useMemo(
    () => (query ? findMatchingCategory(query) : null),
    [query],
  );

  const products = useMemo(
    () => (query ? searchProducts(query) : []),
    [query],
  );

  useEffect(() => {
    if (categorySlug) {
      router.replace(`/category/${categorySlug}`);
    }
  }, [categorySlug, router]);

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-text-secondary">Please enter a search term.</p>
      </div>
    );
  }

  if (categorySlug) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
        Results for &quot;{query}&quot;
      </h1>

      <p className="text-text-muted mb-6">
        {products.length} product{products.length !== 1 ? "s" : ""} found
      </p>

      {products.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-text-secondary">No products found.</p>
          <p className="mt-2 text-text-muted">
            Try another search term or browse categories.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-primary hover:underline"
          >
            Browse all categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}