"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingCart, User, Menu, X, Zap } from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";
import { siteConfig } from "@/lib/constants";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { itemCount } = useCart();

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
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-secondary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-extrabold text-primary tracking-tight leading-none">
                {siteConfig.name.split(" ")[0]}
                <span className="text-secondary">
                  {" "}
                  {siteConfig.name.split(" ")[1]}
                </span>
              </span>
              <span className="hidden sm:block text-[10px] text-text-muted font-medium tracking-wider uppercase">
                Tecnología & Electrodomésticos
              </span>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 mx-4 lg:mx-10">
            <SearchBar />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/carrito"
              className="relative p-2.5 sm:p-3 rounded-xl hover:bg-bg-alt transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-text-muted group-hover:text-primary transition-colors" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-secondary text-black text-[11px] font-bold rounded-full flex items-center justify-center px-1 shadow-md"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>
            <button className="p-2.5 sm:p-3 rounded-xl hover:bg-bg-alt transition-colors group hidden sm:block">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-text-muted group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>

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
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-text font-medium hover:bg-bg-alt hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/carrito"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-text font-medium hover:bg-bg-alt hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ShoppingCart className="w-5 h-5" />
            Carrito
            {itemCount > 0 && (
              <span className="ml-auto bg-secondary text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </motion.div>
    </header>
  );
}
