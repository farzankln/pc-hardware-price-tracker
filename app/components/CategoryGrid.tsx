"use client";

import Link from "next/link";
import { categories } from "../data/categories";

const categoryIcons: Record<string, string> = {
  cpu: "🖥️",
  gpu: "🎮",
  ram: "💾",
  ssd: "⚡",
  hdd: "📀",
  motherboard: "🔌",
  "power-supply": "🔋",
  case: "📦",
  cooler: "❄️",
  monitor: "🖵",
};

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Categories</h2>
        <p className="mt-1 text-sm text-text-secondary">Browse PC hardware by category</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="flex flex-col items-center justify-center rounded-xl border border-border bg-background p-6 transition-all duration-200 hover:shadow-md hover:shadow-primary/5 hover:border-border-strong hover:-translate-y-0.5"
          >
            <span className="mb-3 text-4xl">{categoryIcons[cat.slug] || "📦"}</span>
            <span className="text-sm font-semibold text-text-primary">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
