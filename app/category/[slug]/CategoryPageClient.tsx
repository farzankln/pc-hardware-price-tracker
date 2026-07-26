"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { products } from "../../data/mock-products";
import ProductCard from "../../components/ProductCard";
import FilterSidebar from "../../components/FilterSidebar";
import { ChevronDown, Check, SlidersHorizontal, X } from "lucide-react";
import type { CategorySlug } from "../../data/categories";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

interface CategoryPageClientProps {
  category: { name: string; slug: CategorySlug };
}

export default function CategoryPageClient({ category }: CategoryPageClientProps) {
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categoryProducts = useMemo(() => {
    let filtered = products.filter((p) => p.category === category.slug);

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    if (inStockOnly) {
      filtered = filtered.filter((p) => p.inStock);
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return sorted;
  }, [category.slug, sortBy, selectedBrands, inStockOnly]);

  const uniqueBrands = useMemo(() => {
    const brands = products
      .filter((p) => p.category === category.slug)
      .map((p) => p.brand);
    return Array.from(new Set(brands)).sort();
  }, [category.slug]);

  const filterGroups = [
    {
      title: "Brand",
      options: uniqueBrands.map((brand) => ({ label: brand, value: brand })),
    },
  ];

  const handleBrandChange = (_groupTitle: string, values: string[]) => {
    setSelectedBrands(values);
  };

  const handleClear = () => {
    setSelectedBrands([]);
    setInStockOnly(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
        <Link href="/" className="transition hover:text-text-primary">Home</Link>
        <span>/</span>
        <span className="text-text-primary">{category.name}</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{category.name}</h1>
          <p className="mt-1 text-sm text-text-secondary">{categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""} available</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-10 appearance-none rounded-lg border border-border bg-background pl-4 pr-10 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 overflow-y-auto border-l border-border bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-lg p-1 text-text-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterSidebar
              groups={filterGroups}
              selected={{ Brand: selectedBrands }}
              onChange={handleBrandChange}
              onClear={handleClear}
            />
            <div className="mt-6">
              <label className="flex items-center gap-2.5 text-sm text-text-secondary cursor-pointer">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                    inStockOnly ? "border-primary bg-primary" : "border-border-strong"
                  }`}
                >
                  {inStockOnly && <Check className="h-3 w-3 text-primary-foreground" />}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                In Stock Only
              </label>
            </div>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              Show Results
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-8">
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <FilterSidebar
              groups={filterGroups}
              selected={{ Brand: selectedBrands }}
              onChange={handleBrandChange}
              onClear={handleClear}
            />
            <div className="mt-6">
              <label className="flex items-center gap-2.5 text-sm text-text-secondary cursor-pointer">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                    inStockOnly ? "border-primary bg-primary" : "border-border-strong"
                  }`}
                >
                  {inStockOnly && <Check className="h-3 w-3 text-primary-foreground" />}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                In Stock Only
              </label>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {categoryProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg text-text-secondary">No products match your filters.</p>
              <button
                onClick={handleClear}
                className="mt-4 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
