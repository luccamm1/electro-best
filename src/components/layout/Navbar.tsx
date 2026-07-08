"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Flame } from "lucide-react";
import { categories } from "@/lib/constants";

export default function Navbar() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <nav className="hidden lg:block bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-center gap-1 h-12">
          <li>
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-sm font-medium text-text hover:text-primary hover:bg-bg-alt transition-colors"
            >
              Inicio
            </Link>
          </li>
          <li>
            <a
              href="/productos"
              className="px-4 py-2 rounded-lg text-sm font-medium text-text hover:text-primary hover:bg-bg-alt transition-colors"
            >
              Productos
            </a>
          </li>
          <li
            className="relative"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-text hover:text-primary hover:bg-bg-alt transition-colors">
              Categorías
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {isCategoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50"
                >
                  <div className="p-2">
                    {categories.map((cat) => (
                      <a
                        key={cat.id}
                        href={`/categorias/${cat.slug}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text hover:bg-bg-alt hover:text-primary transition-colors"
                      >
                        <span className="text-xl">{cat.icon}</span>
                        {cat.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li>
            <a
              href="/ofertas"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-error hover:bg-error/5 transition-colors"
            >
              <Flame className="w-4 h-4" />
              Ofertas
            </a>
          </li>
          <li>
            <a
              href="/nosotros"
              className="px-4 py-2 rounded-lg text-sm font-medium text-text hover:text-primary hover:bg-bg-alt transition-colors"
            >
              Nosotros
            </a>
          </li>
          <li>
            <a
              href="/contacto"
              className="px-4 py-2 rounded-lg text-sm font-medium text-text hover:text-primary hover:bg-bg-alt transition-colors"
            >
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
