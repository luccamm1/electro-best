"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Home,
  Package,
  Tag,
  Store,
  Phone,
  ChevronRight,
  Sparkles,
  Trash2,
  MessageCircle,
} from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";
import { siteConfig, categories } from "@/lib/constants";
import { useCart } from "@/lib/cart-context";

const menuItems = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Todos los Productos", href: "/productos", icon: Package },
  { label: "Ofertas", href: "/productos", icon: Tag },
  { label: "Nosotros", href: "/", icon: Store },
  { label: "Contacto", href: "/", icon: Phone },
];

const iconMap: Record<string, string> = {
  tv: "📺", phone: "📱", speaker: "🔊", fridge: "❄️",
  laptop: "💻", stove: "🍳", ac: "❄️", blender: "🥤",
  freezer: "🧊", oven: "🔥", heater: "🌡️", fan: "🌀",
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, removeItem, itemCount, total } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatPrice = (price: number) =>
    `$${price.toLocaleString("es-AR")}`;

  const whatsappCheckout = () => {
    const lines = items.map(
      (item) =>
        `• ${item.product.name} x${item.quantity} = ${formatPrice(
          item.product.price * item.quantity
        )}`
    );
    const msg = `¡Hola! Quiero comprar:\n${lines.join("\n")}\n\nTotal: ${formatPrice(total)}`;
    window.open(
      `${siteConfig.social.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <button
            className="lg:hidden relative p-2 -ml-2 rounded-xl hover:bg-bg-alt transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-text" />
            ) : (
              <Menu className="w-5 h-5 text-text" />
            )}
          </button>

          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/electro-logo.png"
              alt="Electro Best"
              width={180}
              height={50}
              className="h-12 sm:h-14 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex flex-1 mx-4 lg:mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center gap-1">
            <div ref={cartRef} className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 sm:p-2.5 rounded-xl hover:bg-bg-alt transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-text-muted hover:text-primary transition-colors" />
                {itemCount > 0 && (
                  <span
                    key={itemCount}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-secondary text-black text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-md animate-scale-in"
                  >
                    {itemCount}
                  </span>
                )}
              </button>

              {isCartOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-border/60 overflow-hidden z-50 origin-top-right">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-text">Carrito</h3>
                      <span className="text-xs text-text-muted">
                        {itemCount} {itemCount === 1 ? "item" : "items"}
                      </span>
                    </div>

                    {items.length === 0 ? (
                      <div className="py-8 text-center">
                        <ShoppingCart className="w-10 h-10 text-text-muted/30 mx-auto mb-3" />
                        <p className="text-sm text-text-muted">
                          Tu carrito está vacío
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {items.slice(0, 4).map((item) => (
                            <div
                              key={item.product.id}
                              className="flex items-center gap-3 py-2"
                            >
                              <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center text-lg shrink-0">
                                {iconMap[item.product.image] || "📦"}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-text truncate">
                                  {item.product.name}
                                </p>
                                <p className="text-xs text-text-muted">
                                  x{item.quantity} —{" "}
                                  {formatPrice(item.product.price * item.quantity)}
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="p-1 hover:bg-error/5 rounded-lg transition-colors shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-text-muted hover:text-error transition-colors" />
                              </button>
                            </div>
                          ))}
                          {items.length > 4 && (
                            <p className="text-xs text-text-muted text-center pt-1">
                              +{items.length - 4} más
                            </p>
                          )}
                        </div>

                        <div className="border-t border-border mt-3 pt-3">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-medium text-text">
                              Total
                            </span>
                            <span className="text-lg font-extrabold text-primary">
                              {formatPrice(total)}
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex gap-2">
                      <Link
                        href="/carrito"
                        onClick={() => setIsCartOpen(false)}
                        className="flex-1 text-center py-3 rounded-xl border border-border text-sm font-semibold text-text hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                      >
                        Ver carrito
                      </Link>
                      {items.length > 0 && (
                        <button
                          onClick={whatsappCheckout}
                          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-success text-white text-sm font-semibold hover:bg-green-600 transition-all duration-200"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Comprar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="p-2 sm:p-2.5 rounded-xl hover:bg-bg-alt transition-colors hidden sm:block">
              <User className="w-5 h-5 text-text-muted hover:text-primary transition-colors" />
            </button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`overflow-hidden lg:hidden bg-white border-t border-border shadow-xl relative z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
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

          {menuItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
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
          ))}

          <div className="h-px bg-gradient-to-r from-border/0 via-border to-border/0 my-3" />

          <div className="px-4 py-2">
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
              Categorías
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1.5 px-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categorias/${cat.slug}`}
                className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm font-medium text-text hover:bg-bg-alt hover:text-primary transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
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
      </div>
    </header>
  );
}
