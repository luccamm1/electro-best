"use client";

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
  Package,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { siteConfig, products } from "@/lib/constants";
import ProductCard from "@/components/ui/ProductCard";

const iconMap: Record<string, string> = {
  tv: "📺", phone: "📱", speaker: "🔊", fridge: "❄️",
  laptop: "💻", stove: "🍳", ac: "❄️", blender: "🥤",
  freezer: "🧊", oven: "🔥", heater: "🌡️", fan: "🌀",
};

const suggested = products.slice(0, 4);

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } =
    useCart();

  const formatPrice = (price: number) =>
    `$${price.toLocaleString("es-AR")}`;

  const handleClear = () => {
    if (confirm("¿Estás seguro de vaciar el carrito?")) clearCart();
  };

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

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 animate-fade-in-up">
          <div className="w-24 h-24 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <ShoppingCart className="w-12 h-12 text-primary/40" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-3">
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
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-10 animate-fade-in-up">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
            Tu Carrito
          </h1>
          <p className="text-text-muted mt-1">
            {itemCount} {itemCount === 1 ? "producto" : "productos"} en tu carrito
          </p>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-error hover:bg-error/5 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Vaciar carrito
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl p-4 sm:p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex gap-4 sm:gap-6">
                <Link
                  href={`/productos/${item.product.id}`}
                  className="shrink-0"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl flex items-center justify-center text-4xl sm:text-5xl border border-border/30">
                    {iconMap[item.product.image] || "📦"}
                  </div>
                </Link>

                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <Link
                        href={`/productos/${item.product.id}`}
                        className="font-bold text-text hover:text-primary transition-colors line-clamp-1 text-base sm:text-lg"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-text-muted mt-0.5">
                        {item.product.brand}
                      </p>
                      <p className="text-xs text-text-muted/60 mt-1">
                        Unitario: {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 hover:bg-error/5 rounded-lg transition-colors shrink-0"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4 text-text-muted hover:text-error transition-colors" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-auto pt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-11 h-11 flex items-center justify-center rounded-xl border-2 border-border hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 active:scale-95"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-11 h-11 flex items-center justify-center rounded-xl border-2 border-border hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 active:scale-95"
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
                      <p className="text-xl sm:text-2xl font-extrabold text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div
            className="bg-white rounded-2xl p-6 sm:p-8 border border-border/50 shadow-sm sticky top-28 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <h2 className="text-xl font-bold text-text mb-6">
              Resumen de compra
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-semibold text-text">
                  {formatPrice(total)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Envío</span>
                <span className="font-semibold text-success">Gratis</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-bold text-text">Total</span>
                <span className="text-2xl font-extrabold text-primary">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="text-xs text-success font-medium mt-1">
                Envío gratis a todo el país
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={whatsappCheckout}
                className="w-full max-w-[280px] flex items-center justify-center gap-2 bg-primary text-white py-6 rounded-2xl font-bold text-base hover:bg-primary-light transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" />
                Iniciar compra
              </button>

              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[280px] flex items-center justify-center gap-2 py-6 rounded-2xl border-2 border-success text-success font-bold text-base hover:bg-success hover:text-white transition-all duration-200 active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" />
                Consultar por WhatsApp
              </a>
            </div>

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
          </div>
        </div>
      </div>

      <section className="mt-20 sm:mt-28 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-6 h-6 text-primary" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text">
            También te puede interesar
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {suggested.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
