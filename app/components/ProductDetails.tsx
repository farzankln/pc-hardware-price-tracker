"use client";

import Link from "next/link";
import Image from "next/image";
import { categories } from "../data/categories";
import type { Product } from "../data/mock-products";
import WishlistButton from "./WishlistButton";

function getCategoryName(slug: string) {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

export default function ProductDetails({ product }: { product: Product }) {
  const categoryName = getCategoryName(product.category);

  const sections = [
    {
      title: "General Specs",
      fields: [
        ["Brand", product.brand],
        ["Series", product.series],
        ["Model", product.model],
        ["Part Number", product.partNumber],
      ],
    },
    {
      title: "Technical Specs",
      fields: [
        ["Interface", product.interface],
        ["Chipset Manufacturer", product.chipsetManufacturer],
        ["Graphics Engine", product.graphicsEngine],
        ["Memory Capacity", product.memoryCapacity],
        ["Memory Type", product.memoryType],
        ["Core Frequency", product.coreFrequency],
        ["Memory Bus", product.memoryBus],
        ["Memory Speed", product.memorySpeed],
        ["Max Resolution", product.maxResolution],
        ["Required PSU", product.requiredPSU],
        ["Power Connector(s)", product.powerConnectors],
      ],
    },
    {
      title: "3D Specs",
      fields: [
        ["DirectX Support", product.directXSupport],
        ["OpenGL", product.openGL],
        ["CUDA Cores / Stream Processors", product.cudaCores?.toString()],
      ],
    },
    {
      title: "Outputs",
      fields: [
        ["HDMI Ports", product.hdmiPorts?.toString()],
        ["DisplayPorts", product.displayPorts?.toString()],
        ["Max Monitors Supported", product.maxMonitorsSupported?.toString()],
      ],
    },
    {
      title: "Physical Dimensions",
      fields: [
        ["Length", product.length],
        ["Width", product.width],
        ["Thickness", product.thickness],
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-800">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category}`} className="hover:text-gray-800">{categoryName}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative h-[300px] w-full md:h-[400px] bg-gray-100 rounded-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            unoptimized
            className="object-contain p-4"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{product.name}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            {typeof product.originalPrice === "number" ? (
              <>
                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="mt-4">
            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
              product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="mt-6">
            <WishlistButton productId={product.id} />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900">Description</h2>
        <p className="mt-2 text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      <div className="mt-12 space-y-10">
        {sections.map((section) => {
          const fields = section.fields.filter(([, value]) => value !== undefined && value !== null && value !== "");
          if (fields.length === 0) return null;

          return (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                {fields.map(([label, value]) => (
                  <div key={label} className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">{label}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}
