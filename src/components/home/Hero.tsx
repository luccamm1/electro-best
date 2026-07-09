"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { image: "/hero/banner1.png" },
  { image: "/hero/banner2.png" },
  { image: "/hero/banner3.png" },
  { image: "/hero/banner1.png" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);

  const maxIndex = slides.length - 1;

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setSlideWidth(containerRef.current.offsetWidth);
      }
    };
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
      className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[70vh] overflow-hidden bg-primary-dark"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left Arrow */}
      <button
        onClick={goPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/25 hover:bg-black/45 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm active:scale-95"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Track */}
      <div ref={containerRef} className="w-full h-full">
        <motion.div
          className="flex h-full"
          animate={{ x: -(currentIndex * slideWidth) }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{
            left: -(maxIndex * slideWidth),
            right: 0,
          }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {slides.map((slide, i) => (
            <div key={i} className="min-w-full h-full flex-shrink-0">
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-contain sm:object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={goNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/25 hover:bg-black/45 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm active:scale-95"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "bg-secondary w-6 h-2.5"
                : "bg-white/30 hover:bg-white/50 w-2.5 h-2.5"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-bg via-bg/50 to-transparent pointer-events-none" />
    </section>
  );
}
