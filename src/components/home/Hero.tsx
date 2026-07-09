"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { image: "/hero/banner1.webp" },
  { image: "/hero/banner2.webp" },
  { image: "/hero/banner3.webp" },
  { image: "/hero/banner1.webp" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewWidth, setViewWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxIndex = slides.length - 1;

  useEffect(() => {
    const measure = () => setViewWidth(window.innerWidth);
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const goNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) goNext();
    else if (info.offset.x > threshold) goPrev();
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[35vh] sm:min-h-[45vh] lg:min-h-[65vh] overflow-hidden bg-primary-dark select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        onClick={goPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/25 hover:bg-black/45 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm active:scale-95"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="absolute inset-0">
        <motion.div
          className="flex h-full"
          animate={{ x: -(currentIndex * viewWidth) }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{
            left: -(maxIndex * viewWidth),
            right: 0,
          }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-screen h-full flex-shrink-0 flex items-center justify-center bg-primary-dark">
              <Image
                src={slide.image}
                alt=""
                fill
                className="object-cover"
                draggable={false}
                priority={i === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={goNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/25 hover:bg-black/45 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm active:scale-95"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "bg-secondary w-6 h-2.5"
                : "bg-white/40 hover:bg-white/60 w-2.5 h-2.5"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-bg via-bg/50 to-transparent pointer-events-none" />
    </section>
  );
}
