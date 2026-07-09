"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { brands } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";

const GAP = 32;

export default function BrandsCarousel() {
  const items = [...brands, ...brands];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const snapRef = useRef(false);

  const maxIndex = brands.length;
  const slideDistance = cardWidth + GAP;
  const x = currentIndex * slideDistance;

  useEffect(() => {
    const measure = () => {
      if (cardRef.current) setCardWidth(cardRef.current.offsetWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxIndex, isPaused]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) goNext();
    else if (info.offset.x > threshold) goPrev();
  };

  const handleAnimationComplete = () => {
    if (currentIndex >= brands.length) {
      snapRef.current = true;
      setCurrentIndex(currentIndex - brands.length);
    } else if (snapRef.current) {
      snapRef.current = false;
    }
  };

  return (
    <section className="py-28 sm:py-36 bg-bg-alt overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <SectionTitle
          title="Marcas que trabajamos"
          subtitle="Las mejores marcas del mercado, todas en un solo lugar"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-lg border border-border/50 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 active:scale-95"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <div className="overflow-hidden mx-2 sm:mx-4">
            <motion.div
              className="flex gap-10 sm:gap-16"
              animate={{ x: -x }}
              transition={snapRef.current ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
              onAnimationComplete={handleAnimationComplete}
              drag="x"
              dragConstraints={{
                left: -(maxIndex * slideDistance),
                right: 0,
              }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
            >
              {items.map((brand, index) => (
                <div
                  key={`${brand}-${index}`}
                  ref={index === 0 ? cardRef : undefined}
                  className="shrink-0 min-w-[160px]"
                >
                  <div className="px-10 sm:px-14 py-6 sm:py-8 bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                    <span className="text-xl sm:text-2xl font-bold text-text-muted group-hover:text-primary transition-colors whitespace-nowrap">
                      {brand}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-lg border border-border/50 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 active:scale-95"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <div className="flex justify-center gap-3 mt-10">
            {brands.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex % brands.length
                    ? "bg-primary w-8"
                    : "bg-border hover:bg-primary/40"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
