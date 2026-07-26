import { categories } from "../../data/categories";
import { notFound } from "next/navigation";
import CategoryPageClient from "./CategoryPageClient";

export function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return <CategoryPageClient category={category} />;
}
