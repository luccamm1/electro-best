"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/constants";
import ProductCard from "@/components/ui/ProductCard";

const GAP = 20;

interface BrandCarouselProps {
  products: Product[];
  brand: string;
}

export default function BrandCarousel({ products, brand }: BrandCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, products.length - 1);
  const slideDistance = cardWidth + GAP;
  const x = currentIndex * slideDistance;

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
      if (cardRef.current) setCardWidth(cardRef.current.offsetWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  if (maxIndex <= 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} animated={false} />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={goPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-border/50 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 active:scale-95"
        aria-label={`${brand} anterior`}
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="overflow-hidden mx-2 sm:mx-4">
        <motion.div
          className="flex gap-5"
          animate={{ x: -x }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={index === 0 ? cardRef : undefined}
              className="min-w-[230px] sm:min-w-[250px] lg:min-w-[240px] xl:min-w-[260px] flex-shrink-0"
            >
              <ProductCard product={product} index={index} animated={false} />
            </div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={goNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-border/50 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 active:scale-95"
        aria-label={`${brand} siguiente`}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: products.length }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "bg-primary w-6"
                : "bg-border hover:bg-primary/40"
            }`}
            aria-label={`${brand} slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
