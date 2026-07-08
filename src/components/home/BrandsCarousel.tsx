"use client";

import { motion } from "framer-motion";
import { brands } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";

export default function BrandsCarousel() {
  return (
    <section className="py-20 sm:py-24 bg-bg-alt overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <SectionTitle
          title="Marcas que trabajamos"
          subtitle="Las mejores marcas del mercado, todas en un solo lugar"
        />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-bg-alt to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-bg-alt to-transparent z-10" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex"
        >
          <div className="flex gap-12 sm:gap-20 items-center animate-scroll">
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={i}
                className="shrink-0 px-7 sm:px-9 py-5 bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span className="text-lg sm:text-xl font-bold text-text-muted group-hover:text-primary transition-colors whitespace-nowrap">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}