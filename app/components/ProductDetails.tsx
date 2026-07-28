"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "../data/categories";
import type { Product } from "../data/mock-products";
import WishlistButton from "./WishlistButton";
import { useCart } from "../hooks/useCart";
import Tabs from "./Tabs";
import { RelatedProducts } from "./RelatedProducts";
import { Truck, Shield, ArrowRight } from "lucide-react";

function getCategoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

export default function ProductDetails({ product }: { product: Product }) {
  const categoryName = getCategoryName(product.category);
  const { items, addToCart, isHydrated } = useCart();
  const cartItem = items.find((item) => item.productId === product.id);
  const cartQuantity = cartItem?.quantity ?? 0;
  const [justAdded, setJustAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imgSrc, setImgSrc] = useState(product.imageUrl);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setJustAdded(true);
    setQuantity(1);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleIncrement = () => {
    if (quantity < 99) setQuantity((q) => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleImageError = () => {
    if (imgSrc !== product.fallbackImageUrl) {
      setImgSrc(product.fallbackImageUrl || "/img/placeholder.svg");
    }
  };

  const specs = [
    { label: "Brand", value: product.brand },
    { label: "Series", value: product.series },
    { label: "Model", value: product.model },
    { label: "Part Number", value: product.partNumber },
    { label: "Interface", value: product.interface },
    { label: "Chipset Manufacturer", value: product.chipsetManufacturer },
    { label: "Graphics Engine", value: product.graphicsEngine },
    { label: "Memory Capacity", value: product.memoryCapacity },
    { label: "Memory Type", value: product.memoryType },
    { label: "Core Frequency", value: product.coreFrequency },
    { label: "Memory Bus", value: product.memoryBus },
    { label: "Memory Speed", value: product.memorySpeed },
    { label: "Max Resolution", value: product.maxResolution },
    { label: "Required PSU", value: product.requiredPSU },
    { label: "Power Connector(s)", value: product.powerConnectors },
    { label: "DirectX Support", value: product.directXSupport },
    { label: "OpenGL", value: product.openGL },
    { label: "CUDA Cores / Stream Processors", value: product.cudaCores?.toString() },
    { label: "HDMI Ports", value: product.hdmiPorts?.toString() },
    { label: "DisplayPorts", value: product.displayPorts?.toString() },
    { label: "Max Monitors Supported", value: product.maxMonitorsSupported?.toString() },
  ].filter((item) => item.value !== undefined && item.value !== null && item.value !== "");

  const dimensions = [
    { label: "Length", value: product.length },
    { label: "Width", value: product.width },
    { label: "Thickness", value: product.thickness },
  ].filter((item) => item.value && item.value !== "N/A");

  const specsTabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="prose prose-slate max-w-none">
          <p className="text-text-secondary leading-relaxed">{product.description}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {specs.slice(0, 8).map(({ label, value }) => (
              <div key={label} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-xs font-medium text-text-muted">{label}</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{value}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "specs",
      label: "Specifications",
      content: (
        <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
          {specs.map(({ label, value }) => (
            <div key={label} className="sm:col-span-1">
              <dt className="text-sm font-medium text-text-muted">{label}</dt>
              <dd className="mt-1 text-sm text-text-primary">{value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
  ];

  if (dimensions.length > 0) {
    specsTabs.push({
      id: "dimensions",
      label: "Dimensions",
      content: (
        <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-3">
          {dimensions.map(({ label, value }) => (
            <div key={label} className="rounded-lg border border-border bg-surface p-4 text-center">
              <dt className="text-xs font-medium text-text-muted">{label}</dt>
              <dd className="mt-1 text-lg font-bold font-mono text-text-primary">{value}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
        <Link href="/" className="transition hover:text-text-primary">Home</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="transition hover:text-text-primary">{categoryName}</Link>
        <span>/</span>
        <span className="truncate text-text-primary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square w-full lg:aspect-auto lg:h-[500px] bg-white rounded-2xl overflow-hidden">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            unoptimized
            onError={handleImageError}
            className="object-contain p-6"
            priority
          />
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-primary">{product.brand}</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {product.name}
              </h1>
            </div>
            <WishlistButton productId={product.id} />
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold font-mono text-foreground sm:text-4xl">
              ${product.price.toFixed(2)}
            </span>
            {typeof product.originalPrice === "number" && (
              <span className="font-mono text-lg text-text-muted line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="mt-4">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                product.inStock
                  ? "bg-success-muted text-success"
                  : "bg-danger-muted text-danger"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-border">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="flex h-10 w-10 items-center justify-center text-text-secondary transition hover:bg-surface disabled:opacity-40"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-semibold font-mono text-foreground">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  disabled={quantity >= 99}
                  className="flex h-10 w-10 items-center justify-center text-text-secondary transition hover:bg-surface disabled:opacity-40"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 h-10 rounded-lg px-6 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed ${
                  justAdded
                    ? "bg-success text-success-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary-hover"
                }`}
              >
                {justAdded ? "Added to Cart" : product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>

            {isHydrated && cartQuantity > 0 && (
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Truck className="h-4 w-4" />
                <span>{cartQuantity} item{cartQuantity > 1 ? "s" : ""} in your cart</span>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Free shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>2-year warranty</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <Tabs tabs={specsTabs} defaultValue="overview" />
      </div>

      <div className="mt-16 md:mt-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Related Products</h2>
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:text-primary-hover"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <RelatedProducts currentProductId={product.id} categorySlug={product.category} />
      </div>
    </div>
  );
}
