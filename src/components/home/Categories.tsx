"use client";

import { motion } from "framer-motion";
import { categories } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Categories() {
  return (
    <section className="py-16 sm:py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Categorías"
          subtitle="Explorá todo lo que tenemos para vos"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {categories.map((cat) => (
            <motion.a
              key={cat.id}
              variants={item}
              href={`/categorias/${cat.slug}`}
              className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-secondary/30 shadow-sm hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-bg-alt to-bg group-hover:from-secondary/10 group-hover:to-secondary/5 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <span className="text-3xl sm:text-4xl">{cat.icon}</span>
              </div>
              <h3 className="font-bold text-text text-sm sm:text-base group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <div className="mt-3 w-8 h-0.5 bg-border group-hover:bg-secondary rounded-full transition-all duration-300 group-hover:w-12" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
