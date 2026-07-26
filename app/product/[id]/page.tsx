import { products } from "../../data/mock-products";
import { notFound } from "next/navigation";
import ProductDetails from "../../components/ProductDetails";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
