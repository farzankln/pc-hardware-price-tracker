"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    id: "slide-1",
    imageUrl: "https://placehold.co/1200x400/333/FFF?text=Slide+1",
    title: "Next-Gen CPUs Are Here",
    subtitle: "Upgrade your rig with the latest processors.",
  },
  {
    id: "slide-2",
    imageUrl: "https://placehold.co/1200x400/222/FFF?text=Slide+2",
    title: "RTX 40 Series GPUs",
    subtitle: "Unleash 4K gaming with ray tracing.",
  },
  {
    id: "slide-3",
    imageUrl: "https://placehold.co/1200x400/111/FFF?text=Slide+3",
    title: "DDR5 Memory Deals",
    subtitle: "Speed up your system with DDR5 kits.",
  },
  {
    id: "slide-4",
    imageUrl: "https://placehold.co/1200x400/444/FFF?text=Slide+4",
    title: "NVMe SSDs On Sale",
    subtitle: "Blazing-fast storage for instant loads.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative h-[200px] w-full md:h-[400px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              priority={index === 0}
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
              <h2 className="text-2xl font-bold text-white md:text-4xl">
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="mt-2 max-w-xl text-sm text-gray-200 md:text-lg">
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              index === current ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
