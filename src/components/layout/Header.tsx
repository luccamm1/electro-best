"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Zap,
  Home,
  Package,
  Tag,
  Store,
  Phone,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";
import { siteConfig, categories } from "@/lib/constants";
import { useCart } from "@/lib/cart-context";

const menuItems = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Todas las Categorías", href: "/categorias/smart-tv", icon: Package },
  { label: "Ofertas", href: "/?ofertas", icon: Tag },
  { label: "Nosotros", href: "/", icon: Store },
  { label: "Contacto", href: "/", icon: Phone },
];

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
            className="lg:hidden relative p-2 -ml-2 rounded-xl hover:bg-bg-alt transition-colors group"
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
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden lg:hidden bg-white border-t border-border shadow-xl"
      >
        <nav className="px-4 py-4 space-y-1">
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-text">Menú</p>
              <p className="text-xs text-text-muted">Navegación</p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-border/0 via-border to-border/0 mb-2" />

          {menuItems.map(({ label, href, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={href}
                className="group flex items-center gap-3 px-4 py-3.5 rounded-xl text-text font-medium hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 hover:text-primary transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-9 h-9 rounded-lg bg-bg-alt group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <Icon className="w-4.5 h-4.5 text-text-muted group-hover:text-primary transition-colors" />
                </div>
                <span className="flex-1">{label}</span>
                <ChevronRight className="w-4 h-4 text-text-muted/40 group-hover:text-primary/40 transition-colors" />
              </Link>
            </motion.div>
          ))}

          <div className="h-px bg-gradient-to-r from-border/0 via-border to-border/0 my-3" />

          <div className="px-4 py-2">
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
              Categorías
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1.5 px-2">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.04 }}
              >
                <Link
                  href={`/categorias/${cat.slug}`}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm font-medium text-text hover:bg-bg-alt hover:text-primary transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-border/0 via-border to-border/0 my-3" />

          <Link
            href="/carrito"
            className="group flex items-center gap-3 px-4 py-3.5 rounded-xl text-text font-medium hover:bg-gradient-to-r from-primary/5 to-secondary/5 hover:text-primary transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-9 h-9 rounded-lg bg-bg-alt group-hover:bg-primary/10 flex items-center justify-center transition-colors">
              <ShoppingCart className="w-4.5 h-4.5 text-text-muted group-hover:text-primary transition-colors" />
            </div>
            <span className="flex-1">Carrito</span>
            {itemCount > 0 && (
              <span className="bg-secondary text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
            <ChevronRight className="w-4 h-4 text-text-muted/40 group-hover:text-primary/40 transition-colors" />
          </Link>

          <div className="px-4 pt-4 pb-2">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-4 border border-border/50">
              <p className="text-xs text-text-muted mb-1">
                ¿Consultas?
              </p>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-primary hover:underline"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </nav>
      </motion.div>
    </header>
  );
}
