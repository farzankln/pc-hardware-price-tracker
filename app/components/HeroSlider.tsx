"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Slide {
  id: string;
  imageUrl: string;
  fallbackImageUrl: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
}

const slides: Slide[] = [
  {
    id: "slide-1",
    imageUrl: "/hero/GPU.webp",
    fallbackImageUrl:
      "https://placehold.co/1200x500/1e293b/818cf8?text=RTX+40+Series",
    title: "RTX 40 Series GPUs",
    subtitle: "Unleash 4K gaming with ray tracing and AI-powered DLSS 3.",
    cta: "Shop GPUs",
    href: "/category/gpu",
  },
  {
    id: "slide-2",
    imageUrl: "/hero/RAM.png",
    fallbackImageUrl:
      "https://placehold.co/1200x500/1e293b/818cf8?text=DDR5+Memory",
    title: "DDR5 Memory Deals",
    subtitle:
      "Speed up your system with high-frequency DDR5 kits. Limited time offers.",
    cta: "Shop RAM",
    href: "/category/ram",
  },
  {
    id: "slide-3",
    imageUrl: "/hero/CPU.webp",
    fallbackImageUrl:
      "https://placehold.co/1200x500/1e293b/818cf8?text=Next-Gen+CPUs",
    title: "Next-Gen CPUs Are Here",
    subtitle:
      "Upgrade your rig with the latest processors. Unmatched performance for gaming and creation.",
    cta: "Shop CPUs",
    href: "/category/cpu",
  },
  {
    id: "slide-4",
    imageUrl: "/hero/SSD.png",
    fallbackImageUrl:
      "https://placehold.co/1200x500/1e293b/818cf8?text=NVMe+SSDs",
    title: "NVMe SSDs On Sale",
    subtitle:
      "Blazing-fast storage for instant loads. Up to 7,450 MB/s read speeds.",
    cta: "Shop SSDs",
    href: "/category/ssd",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next, current]);

  const handleImageError = useCallback((slideId: string) => {
    setImageErrors((prev) => {
      if (prev[slideId]) return prev;
      return { ...prev, [slideId]: true };
    });
  }, []);

  return (
    <div className="relative container mx-auto w-full overflow-hidden rounded-xl">
      <div className="relative h-[280px] w-full sm:h-[400px] md:h-[500px] lg:h-[620px]">
        {slides.map((slide, index) => {
          const src = imageErrors[slide.id]
            ? slide.fallbackImageUrl
            : slide.imageUrl;
          const isActive = index === current;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-105 z-0"
              }`}
            >
              <Image
                src={src}
                alt={slide.title}
                fill
                priority={index === 0}
                unoptimized
                className="object-cover"
                onError={() => handleImageError(slide.id)}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h2>
                  <p className="mt-3 max-w-lg text-sm text-text-secondary sm:text-base md:text-lg">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.href}
                    className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={prev}
        className="absolute cursor-pointer z-20 left-3 top-1/2 -translate-y-1/2 flex h-16 w-8 items-center justify-center rounded-full border border-primary/50 bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition hover:bg-background focus:outline-none hover:ring-2 hover:ring-primary/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute cursor-pointer z-20 right-3 top-1/2 -translate-y-1/2 flex h-16 w-8 items-center justify-center rounded-full border border-primary/50 bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition hover:bg-background focus:outline-none hover:ring-2 hover:ring-primary/50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute z-20 bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`h-2 cursor-pointer rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              index === current
                ? "w-6 bg-primary"
                : "w-2 bg-foreground/30 hover:bg-foreground/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
