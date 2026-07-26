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
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="mb-6 text-2xl font-bold">Categories</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-gray-300"
          >
            <span className="mb-2 text-4xl">{categoryIcons[cat.slug] || "📦"}</span>
            <span className="text-sm font-medium text-gray-800">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
