import { products } from "../data/mock-products";
import ProductCard from "./ProductCard";

const specialOffers = products.filter((p) => typeof p.originalPrice === "number").slice(0, 5);

export default function SpecialOffers() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Special Offers</h2>
          <p className="mt-1 text-sm text-text-secondary">Limited-time deals on premium hardware</p>
        </div>
      </div>
      {specialOffers.length === 0 ? (
        <p className="text-text-muted">No special offers available.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {specialOffers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
