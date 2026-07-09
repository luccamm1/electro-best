"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { categories } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";

const cardWidth = 176;
const gap = 24;
const totalCards = categories.length;
const totalWidth = (cardWidth + gap) * totalCards;

function resumeAnimation(controls: ReturnType<typeof useAnimation>, offsetRef: React.MutableRefObject<number>, totalWidth: number) {
  const from = offsetRef.current;
  controls.start({
    x: [from, from - totalWidth],
    transition: {
      duration: 25,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 0,
      onUpdate: (latest: number) => {
        offsetRef.current = latest;
        if (latest < -totalWidth * 2) {
          offsetRef.current += totalWidth;
          controls.set({ x: offsetRef.current });
        }
      },
    },
  });
}

export default function Categories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const offsetRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current?.parentElement) {
        setContainerWidth(trackRef.current.parentElement.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (isDragging || containerWidth === 0) return;
    resumeAnimation(controls, offsetRef, totalWidth);
  }, [controls, isDragging, containerWidth]);

  const duplicated = [...categories, ...categories, ...categories, ...categories];

  const handleDragEnd = () => {
    setIsDragging(false);
    resumeAnimation(controls, offsetRef, totalWidth);
  };

  return (
    <section className="py-20 sm:py-28 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <SectionTitle
          title="Categorías"
          subtitle="Explorá todo lo que tenemos para vos"
        />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() => {
            if (!isDragging) {
              resumeAnimation(controls, offsetRef, totalWidth);
            }
          }}
        >
          <motion.div
            drag="x"
            dragConstraints={{
              left: -(totalWidth * 3 - containerWidth),
              right: 0,
            }}
            onDragStart={() => setIsDragging(true)}
            onDrag={(_, info) => {
              offsetRef.current = info.offset.x;
            }}
            onDragEnd={handleDragEnd}
            animate={controls}
            className="flex gap-5 sm:gap-6 items-center"
            style={{ width: "max-content", x: 0 }}
          >
            {duplicated.map((cat, i) => (
              <a
                key={`${cat.id}-${i}`}
                href={`/categorias/${cat.slug}`}
                onClick={(e) => isDragging && e.preventDefault()}
                className="group shrink-0 bg-white rounded-2xl p-5 sm:p-7 border border-border/50 hover:border-secondary/30 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300 flex flex-col items-center text-center"
                style={{ width: cardWidth }}
              >
                <div className="w-14 h-14 sm:w-[72px] sm:h-[72px] bg-gradient-to-br from-bg-alt to-bg group-hover:from-secondary/20 group-hover:to-secondary/5 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-secondary/20">
                  <span className="text-2xl sm:text-3xl">{cat.icon}</span>
                </div>
                <h3 className="font-bold text-text text-sm sm:text-base group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <div className="mt-2 w-6 h-0.5 bg-border group-hover:bg-secondary rounded-full transition-all duration-300 group-hover:w-10" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}