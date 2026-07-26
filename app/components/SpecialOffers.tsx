import { products } from "../data/mock-products";
import ProductCard from "./ProductCard";

const specialOffers = products.filter((p) => typeof p.originalPrice === "number").slice(0, 5);

export default function SpecialOffers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="mb-6 text-2xl font-bold">Special Offers</h2>
      {specialOffers.length === 0 ? (
        <p className="text-gray-500">No special offers available.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {specialOffers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
