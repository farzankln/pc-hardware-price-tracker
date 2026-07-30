"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../hooks/useCart";
import { products } from "../data/mock-products";
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    isHydrated,
  } = useCart();

  const cartProducts = items
    .map((item) => products.find((p) => p.id === item.productId))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const totalPrice = getTotalPrice(products);

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Your Cart
        </h1>
        <p className="mt-4 text-text-muted">Loading...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="transition hover:text-text-primary">
            Home
          </Link>
          <span>/</span>
          <span className="text-text-primary">Cart</span>
        </nav>

        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface">
            <ShoppingBag className="h-8 w-8 text-text-muted" />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
            Your cart is empty
          </h1>
          <p className="mt-2 text-text-secondary">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
        <Link href="/" className="transition hover:text-text-primary">
          Home
        </Link>
        <span>/</span>
        <span className="text-text-primary">Cart</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Your Cart
        </h1>
        <button
          onClick={clearCart}
          className="inline-flex items-center gap-1.5 rounded-lg border border-danger/30 px-3 py-2 text-sm font-medium text-danger transition hover:bg-danger-muted max-sm:px-2 max-sm:py-1.5 max-sm:text-xs"
        >
          <Trash2 className="h-4 w-4 max-sm:h-3.5 max-sm:w-3.5" />
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cartProducts.map((product) => {
            const cartItem = items.find(
              (item) => item.productId === product.id,
            );
            const quantity = cartItem?.quantity ?? 1;
            const subtotal = product.price * quantity;

            return (
              <div
                key={product.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 sm:p-4 max-sm:p-3 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 max-sm:gap-3">
                  <Link
                    href={`/product/${product.id}`}
                    className="relative h-32 w-full sm:h-20 sm:w-20 flex-shrink-0 bg-white rounded-lg overflow-hidden max-sm:h-40"
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-contain p-1.5"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${product.id}`}
                      className="text-sm font-semibold text-foreground hover:text-primary transition line-clamp-2 max-sm:text-base"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-text-muted font-mono max-sm:text-base">
                      ${product.price.toFixed(2)} each
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 max-sm:gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      disabled={quantity <= 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary transition hover:bg-surface disabled:opacity-40 max-sm:h-10 max-sm:w-10 max-sm:text-base"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-semibold font-mono text-foreground max-sm:w-10 max-sm:text-base">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      disabled={quantity >= 99}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary transition hover:bg-surface disabled:opacity-40 max-sm:h-10 max-sm:w-10 max-sm:text-base"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-3 max-sm:gap-2">
                    <p className="text-sm font-bold font-mono text-foreground max-sm:text-base">
                      ${subtotal.toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition hover:text-danger hover:bg-danger-muted max-sm:h-10 max-sm:w-10"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4 max-sm:h-5 max-sm:w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-background p-6 lg:sticky lg:top-24 max-sm:p-4">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              Order Summary
            </h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-foreground">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Shipping</span>
                <span className="font-medium text-success">Free</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="text-base font-bold text-foreground">
                    Total
                  </span>
                  <span className="text-xl font-bold font-mono text-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/"
                className="rounded-lg border border-border px-6 py-2.5 text-center text-sm font-semibold text-text-secondary transition hover:bg-surface max-sm:py-3 max-sm:text-base"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() =>
                  alert("Checkout is not implemented in this demo.")
                }
                className="rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover max-sm:py-3 max-sm:text-base"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
