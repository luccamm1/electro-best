"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { categories } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";

const CARD_WIDTH = 176;
const GAP = 24;
const TOTAL_WIDTH = (CARD_WIDTH + GAP) * categories.length;

export default function Categories() {
  const xMotion = useMotionValue(0);
  const posRef = useRef(0);
  const isDraggingRef = useRef(false);
  const rafRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const dragDistRef = useRef(0);
  const isPausedRef = useRef(false);

  const loop = () => {
    if (!isDraggingRef.current && !isPausedRef.current) {
      posRef.current -= 0.4;
      if (posRef.current < -(TOTAL_WIDTH * 2)) {
        posRef.current += TOTAL_WIDTH * 2;
      }
      xMotion.set(posRef.current);
    }
    rafRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const startDrag = (x: number) => {
    isDraggingRef.current = true;
    dragStartXRef.current = x;
    dragStartPosRef.current = posRef.current;
    dragDistRef.current = 0;
  };

  const moveDrag = (x: number) => {
    if (!isDraggingRef.current) return;
    const delta = x - dragStartXRef.current;
    dragDistRef.current = Math.abs(delta);
    posRef.current = dragStartPosRef.current + delta;
    xMotion.set(posRef.current);
  };

  const endDrag = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="py-28 sm:py-36 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <SectionTitle
          title="Categorías"
          subtitle="Explorá todo lo que tenemos para vos"
        />
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <motion.div
          style={{ x: xMotion, touchAction: "pan-y" }}
          className="flex gap-5 sm:gap-6 items-center cursor-grab active:cursor-grabbing select-none will-change-transform"
          onPointerDown={(e) => startDrag(e.clientX)}
          onPointerMove={(e) => moveDrag(e.clientX)}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { isPausedRef.current = false; }}
        >
          {[...categories, ...categories, ...categories, ...categories].map((cat, i) => (
            <a
              key={`${cat.id}-${i}`}
              href={`/categorias/${cat.slug}`}
              onClick={(e) => {
                if (dragDistRef.current > 5) e.preventDefault();
              }}
              className="group shrink-0 flex flex-col items-center text-center"
              style={{ width: CARD_WIDTH }}
            >
              <span className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </span>
              <h3 className="font-bold text-text text-sm sm:text-base group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}