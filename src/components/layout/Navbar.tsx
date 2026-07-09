"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Flame } from "lucide-react";
import { categories } from "@/lib/constants";

export default function Navbar() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <nav className="hidden lg:block bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-center gap-0.5 h-12">
          <li>
            <Link
              href="/"
              className="relative px-4 py-3 rounded-lg text-sm font-medium text-text hover:text-primary hover:bg-bg-alt transition-colors after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/productos"
              className="relative px-4 py-3 rounded-lg text-sm font-medium text-text hover:text-primary hover:bg-bg-alt transition-colors after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            >
              Productos
            </Link>
          </li>
          <li
            className="relative"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <button className="relative flex items-center gap-1 px-4 py-3 rounded-lg text-sm font-medium text-text hover:text-primary hover:bg-bg-alt transition-colors after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200">
              Categorías
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute top-full left-0 mt-1 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl shadow-black/5 border border-border/80 overflow-hidden z-50 origin-top transition-all duration-150 ease-out ${
                isCategoriesOpen
                  ? "opacity-100 translate-y-0 scale-y-100 pointer-events-auto"
                  : "opacity-0 -translate-y-1 scale-y-95 pointer-events-none"
              }`}
            >
              <div className="p-2">
                {categories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`/categorias/${cat.slug}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text hover:bg-primary/5 hover:text-primary transition-all duration-150"
                  >
                    <span className="text-xl">{cat.icon}</span>
                    {cat.name}
                  </a>
                ))}
              </div>
            </div>
          </li>
          <li>
            <Link
              href="/productos"
              className="flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-bold text-error hover:bg-error/5 transition-colors"
            >
              <Flame className="w-4 h-4" />
              Ofertas
            </Link>
          </li>
          <li>
            <a
              href="/"
              className="relative px-4 py-3 rounded-lg text-sm font-medium text-text hover:text-primary hover:bg-bg-alt transition-colors after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            >
              Nosotros
            </a>
          </li>
          <li>
            <a
              href="/"
              className="relative px-4 py-3 rounded-lg text-sm font-medium text-text hover:text-primary hover:bg-bg-alt transition-colors after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            >
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
