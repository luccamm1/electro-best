"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  MessageCircle,
  Share2,
  Check,
  Truck,
  ShieldCheck,
  CreditCard,
  ArrowLeft,
  Star,
  Package,
} from "lucide-react";
import { products, siteConfig } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import ProductCard from "@/components/ui/ProductCard";
import { useCart } from "@/lib/cart-context";

const gradients: Record<string, string> = {
  tv: "from-blue-600 via-blue-700 to-indigo-800",
  phone: "from-gray-800 via-gray-900 to-black",
  speaker: "from-red-500 via-red-600 to-red-700",
  fridge: "from-cyan-400 via-cyan-500 to-blue-600",
  laptop: "from-gray-600 via-gray-700 to-gray-900",
  stove: "from-orange-500 via-orange-600 to-red-700",
  ac: "from-blue-400 via-blue-500 to-cyan-600",
  blender: "from-slate-200 via-gray-300 to-gray-400",
  freezer: "from-sky-400 via-sky-500 to-blue-600",
  oven: "from-orange-400 via-orange-500 to-red-600",
  heater: "from-red-400 via-red-500 to-orange-600",
  fan: "from-emerald-400 via-emerald-500 to-teal-600",
};

const icons: Record<string, string> = {
  tv: "📺",
  phone: "📱",
  speaker: "🔊",
  fridge: "❄️",
  laptop: "💻",
  stove: "🍳",
  ac: "❄️",
  blender: "🥤",
  freezer: "🧊",
  oven: "🔥",
  heater: "🌡️",
  fan: "🌀",
};

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-bg-alt rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-text-muted" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) =>
    `$${price.toLocaleString("es-AR")}`;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const benefits = [
    { icon: Truck, text: "Envío gratis a todo el país", color: "text-primary" },
    { icon: ShieldCheck, text: "Compra 100% segura", color: "text-success" },
    { icon: CreditCard, text: "12 cuotas sin interés", color: "text-secondary" },
    { icon: MessageCircle, text: "Atención personalizada", color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a productos
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div
              className={`relative w-full aspect-square rounded-3xl bg-gradient-to-br ${gradients[product.image] || "from-primary to-primary-light"} flex items-center justify-center overflow-hidden`}
            >
              <motion.span
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-[12rem] sm:text-[16rem] select-none"
              >
                {icons[product.image] || "📦"}
              </motion.span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

              {product.isOffer && (
                <div className="absolute top-6 left-6 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  >
                    <Badge variant="offer">
                      {product.discount
                        ? `${product.discount}% OFF`
                        : "OFERTA"}
                    </Badge>
                  </motion.div>
                </div>
              )}

              <button className="absolute top-6 right-6 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-2xl hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg">
                <Heart className="w-5 h-5 text-text-muted hover:text-error transition-colors" />
              </button>

              <button className="absolute top-6 right-20 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-2xl hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg">
                <Share2 className="w-5 h-5 text-text-muted hover:text-primary transition-colors" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-text-muted uppercase tracking-[0.15em]">
                {product.brand}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-xs text-text-muted">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4
                      ? "text-secondary fill-secondary"
                      : "text-border"
                  }`}
                />
              ))}
              <span className="text-sm text-text-muted ml-2">
                4.0 (12 opiniones)
              </span>
            </div>

            <div className="bg-bg-alt rounded-2xl p-6 mb-6">
              {product.oldPrice && (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl text-text-muted line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  {product.discount && (
                    <span className="text-sm font-bold text-success bg-success/10 px-3 py-1 rounded-full">
                      Ahorrá {product.discount}%
                    </span>
                  )}
                </div>
              )}
              <div className="text-4xl sm:text-5xl font-extrabold text-primary">
                {formatPrice(product.price)}
              </div>
              <p className="text-sm text-text-muted mt-2">
                en 12 cuotas de{" "}
                <span className="font-bold text-text">
                  {formatPrice(Math.round(product.price / 12))}
                </span>{" "}
                sin interés
              </p>
            </div>

            {product.description && (
              <p className="text-text-muted leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            {product.specs && (
              <div className="mb-8">
                <h3 className="font-bold text-text mb-3">
                  Características principales
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.specs.map((spec, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-text-muted"
                    >
                      <Check className="w-4 h-4 text-success shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => addItem(product)}
                className="w-full flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-light transition-all duration-200 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30"
              >
                <ShoppingCart className="w-6 h-6" />
                Agregar al carrito
              </motion.button>

              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl border-2 border-success text-success font-bold text-lg hover:bg-success hover:text-white transition-all duration-200"
              >
                <MessageCircle className="w-6 h-6" />
                Consultar por WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-bg-alt rounded-xl px-4 py-3"
                >
                  <b.icon className={`w-4 h-4 ${b.color} shrink-0`} />
                  <span className="text-xs text-text-muted leading-tight">
                    {b.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text mb-2">
                Productos relacionados
              </h2>
              <p className="text-text-muted">
                Otros productos en {product.category}
              </p>
              <div className="w-16 h-1 bg-secondary rounded-full mt-3" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
