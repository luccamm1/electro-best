"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { categories } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";

const CARD_WIDTH = 200;
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
          className="flex gap-6 items-center cursor-grab active:cursor-grabbing select-none will-change-transform"
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
              className="group shrink-0 block"
              style={{ width: CARD_WIDTH }}
            >
              <div className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-border/50 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                {cat.image ? (
                  <div className="relative w-16 h-16 mb-3">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </span>
                )}
                <h3 className="font-semibold text-text text-sm group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
