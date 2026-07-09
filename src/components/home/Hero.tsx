"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { image: "/hero/banner1.png" },
  { image: "/hero/banner2.png" },
  { image: "/hero/banner3.png" },
  { image: "/hero/banner1.png" },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  return (
    <section
      className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[activeIndex].image})` }}
        />
      </AnimatePresence>

      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-secondary w-6 h-2.5"
                : "bg-white/30 hover:bg-white/50 w-2.5 h-2.5"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-40 bg-gradient-to-t from-bg via-bg/50 to-transparent pointer-events-none" />
    </section>
  );
}