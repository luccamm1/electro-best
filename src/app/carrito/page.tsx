"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  MessageCircle,
  CreditCard,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { siteConfig } from "@/lib/constants";

const iconMap: Record<string, string> = {
  tv: "📺", phone: "📱", speaker: "🔊", fridge: "❄️",
  laptop: "💻", stove: "🍳", ac: "❄️", blender: "🥤",
  freezer: "🧊", oven: "🔥", heater: "🌡️", fan: "🌀",
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } =
    useCart();

  const formatPrice = (price: number) =>
    `$${price.toLocaleString("es-AR")}`;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-24 h-24 bg-bg-alt rounded-3xl flex items-center justify-center mx-auto mb-8">
            <ShoppingCart className="w-12 h-12 text-text-muted" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-text-muted mb-8 leading-relaxed">
            Parece que aún no agregaste productos. Explorá nuestro catálogo y
            encontrá lo que necesitás.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-primary-light transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
          >
            <ArrowLeft className="w-5 h-5" />
            Ver productos
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
            Tu Carrito
          </h1>
          <p className="text-text-muted mt-1">
            {itemCount} {itemCount === 1 ? "producto" : "productos"} en tu carrito
          </p>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-error hover:bg-error/5 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Vaciar carrito
        </button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-4 sm:p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-4 sm:gap-6">
                <Link
                  href={`/productos/${item.product.id}`}
                  className="shrink-0"
                >
                  <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center text-3xl sm:text-4xl border border-border/30">
                    {iconMap[item.product.image] || "📦"}
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <Link
                        href={`/productos/${item.product.id}`}
                        className="font-bold text-text hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-text-muted mt-0.5">
                        {item.product.brand}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 hover:bg-error/5 rounded-lg transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4 text-text-muted hover:text-error transition-colors" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-9 h-9 flex items-center justify-center rounded-xl border-2 border-border hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-9 h-9 flex items-center justify-center rounded-xl border-2 border-border hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      {item.product.oldPrice && (
                        <p className="text-sm text-text-muted line-through">
                          {formatPrice(item.product.oldPrice * item.quantity)}
                        </p>
                      )}
                      <p className="text-xl font-extrabold text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-border/50 shadow-sm sticky top-28"
          >
            <h2 className="text-xl font-bold text-text mb-6">
              Resumen de compra
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-text-muted truncate max-w-[60%]">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-semibold text-text">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-bold text-text">Total</span>
                <span className="text-2xl font-extrabold text-primary">
                  {formatPrice(total)}
                </span>
              </div>
              {total > 0 && (
                <p className="text-xs text-success font-medium mt-1">
                  Envío gratis a todo el país
                </p>
              )}
            </div>

            <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-base hover:bg-primary-light transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 mb-3 active:scale-[0.98]">
              Iniciar compra
            </button>

            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border-2 border-success text-success font-bold text-base hover:bg-success hover:text-white transition-all duration-200 active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              Consultar por WhatsApp
            </a>

            <div className="mt-6 space-y-3 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span>Compra segura</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <Truck className="w-4 h-4 text-primary" />
                <span>Envíos a todo el país</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <CreditCard className="w-4 h-4 text-secondary" />
                <span>Hasta 12 cuotas sin interés</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}