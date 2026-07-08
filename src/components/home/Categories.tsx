"use client";

import { motion } from "framer-motion";
import { categories } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Categories() {
  return (
    <section className="py-20 sm:py-28 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <SectionTitle
          title="Categorías"
          subtitle="Explorá todo lo que tenemos para vos"
        />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-bg to-transparent z-10" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex"
        >
          <div className="flex gap-5 sm:gap-6 items-center animate-scroll">
            {[...categories, ...categories].map((cat, i) => (
              <a
                key={`${cat.id}-${i}`}
                href={`/categorias/${cat.slug}`}
                className="group shrink-0 bg-white rounded-2xl p-5 sm:p-7 border border-border/50 hover:border-secondary/30 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300 flex flex-col items-center text-center w-36 sm:w-44"
              >
                <div className="w-14 h-14 sm:w-18 sm:h-18 bg-gradient-to-br from-bg-alt to-bg group-hover:from-secondary/20 group-hover:to-secondary/5 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-secondary/20">
                  <span className="text-2xl sm:text-3xl">{cat.icon}</span>
                </div>
                <h3 className="font-bold text-text text-sm sm:text-base group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <div className="mt-2 w-6 h-0.5 bg-border group-hover:bg-secondary rounded-full transition-all duration-300 group-hover:w-10" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}