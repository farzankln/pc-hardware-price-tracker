import { products } from "../../data/mock-products";
import { notFound } from "next/navigation";
import ProductDetails from "../../components/ProductDetails";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
