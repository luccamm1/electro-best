"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingCart, User, Menu, X, Zap } from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";
import { siteConfig } from "@/lib/constants";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-bg-alt transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-text" />
            ) : (
              <Menu className="w-6 h-6 text-text" />
            )}
          </button>

          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
              {siteConfig.name.split(" ")[0]}
              <span className="text-secondary">
                {" "}
                {siteConfig.name.split(" ")[1]}
              </span>
            </span>
            </Link>

          <div className="hidden md:flex flex-1 mx-4 lg:mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="relative p-2 sm:p-2.5 rounded-xl hover:bg-bg-alt transition-colors group">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-text-muted group-hover:text-primary transition-colors" />
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-secondary text-black text-xs font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button className="p-2 sm:p-2.5 rounded-xl hover:bg-bg-alt transition-colors group">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-text-muted group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden lg:hidden bg-white border-t border-border"
      >
        <nav className="px-4 py-4 space-y-1">
          {[
            ["Inicio", "/"],
            ["Productos", "/productos"],
            ["Ofertas", "/ofertas"],
            ["Nosotros", "/nosotros"],
            ["Contacto", "/contacto"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="block px-4 py-3 rounded-xl text-text font-medium hover:bg-bg-alt hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </motion.div>
    </header>
  );
}
