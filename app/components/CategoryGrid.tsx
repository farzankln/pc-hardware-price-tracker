"use client";

import Link from "next/link";
import { categories } from "../data/categories";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Categories
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Browse PC hardware by category
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="flex items-center justify-center rounded-xl border-2 border-border bg-background p-5 transition-all duration-200 hover:shadow-xl hover:border-primary hover:-translate-y-1 hover:bg-primary/5"
          >
            <span className="w-full truncate text-center text-base font-black tracking-wide text-foreground lg:text-lg">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
