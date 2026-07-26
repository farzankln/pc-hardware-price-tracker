import { categories } from "../../data/categories";
import { products } from "../../data/mock-products";
import ProductCard from "../../components/ProductCard";
import Link from "next/link";

export function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = products.filter((p) => p.category === slug);

  if (!category) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-800">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{category.name}</span>
      </nav>

      <h1 className="mb-6 text-3xl font-bold text-gray-900">{category.name}</h1>

      {categoryProducts.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
