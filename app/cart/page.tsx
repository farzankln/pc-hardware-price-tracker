"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../hooks/useCart";
import { products } from "../data/mock-products";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, isHydrated } = useCart();

  const cartProducts = items
    .map((item) => products.find((p) => p.id === item.productId))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const totalPrice = getTotalPrice(products);

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Cart</span>
        </nav>

        <h1 className="mb-6 text-3xl font-bold text-gray-900">Your Cart</h1>

        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg text-gray-500">Your cart is empty. Start shopping!</p>
          <Link
            href="/"
            className="mt-4 rounded-lg bg-gray-900 px-6 py-2 text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-800">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Cart</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        <button
          onClick={clearCart}
          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cartProducts.map((product) => {
          const cartItem = items.find((item) => item.productId === product.id);
          const quantity = cartItem?.quantity ?? 1;
          const subtotal = product.price * quantity;

          return (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <div className="relative h-24 w-full sm:h-20 sm:w-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-contain p-1"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link href={`/product/${product.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2">
                  {product.name}
                </Link>
                <p className="mt-1 text-sm text-gray-500">${product.price.toFixed(2)} each</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-medium text-gray-900">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition hover:bg-gray-50"
                >
                  +
                </button>
              </div>

              <div className="text-right sm:w-24">
                <p className="text-sm font-bold text-gray-900">${subtotal.toFixed(2)}</p>
              </div>

              <button
                onClick={() => removeFromCart(product.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:text-red-600 hover:bg-red-50"
                aria-label="Remove item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Price</p>
          <p className="text-3xl font-bold text-gray-900">${totalPrice.toFixed(2)}</p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => alert("Checkout is not implemented in this demo.")}
            className="rounded-lg bg-gray-900 px-6 py-2 font-medium text-white transition hover:bg-gray-800"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
