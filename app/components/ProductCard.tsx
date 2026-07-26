import Link from "next/link";
import Image from "next/image";
import type { Product } from "../data/mock-products";

export default function ProductCard({
  product,
  separator = false,
}: {
  product: Product;
  separator?: boolean;
}) {
  const hasDiscount = typeof product.originalPrice === "number";

  return (
    <Link
      href={`/product/${product.id}`}
      className={`flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md ${
        separator ? "border-r border-t-0 border-b-0 border-l-0 rounded-none last:border-r-0" : ""
      }`}
    >
      <div className="relative h-40 w-full bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          unoptimized
          className="object-contain p-2"
        />
        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
            Special Discount
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 text-sm font-medium text-gray-800">{product.name}</h3>

        <div className="mt-auto pt-2">
          {hasDiscount ? (
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500 line-through">
                ${product.originalPrice!.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-base font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
