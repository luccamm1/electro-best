"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/constants";
import Badge from "./Badge";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
  index?: number;
  animated?: boolean;
}

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

function ProductImage({ product }: { product: Product }) {
  return (
    <Link href={`/productos/${product.id}`}>
      <div
        className={`relative w-full h-40 sm:h-44 bg-gradient-to-br ${gradients[product.image] || "from-primary to-primary-light"} flex items-center justify-center overflow-hidden group/img`}
      >
        <motion.span
          className="text-5xl sm:text-6xl opacity-90 select-none transition-all duration-500 group-hover/img:scale-110 group-hover/img:rotate-6"
          whileHover={{ scale: 1.1 }}
        >
          {icons[product.image] || "📦"}
        </motion.span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20" />
      </div>
    </Link>
  );
}

export default function ProductCard({ product, index = 0, animated = true }: ProductCardProps) {
  const { addItem } = useCart();

  const formatPrice = (price: number) =>
    `$${price.toLocaleString("es-AR")}`;

  return (
    <motion.div
      {...(animated
        ? {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
          }
        : {})}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 border border-border/50 hover:border-primary/20 flex flex-col"
    >
      <div className="relative overflow-hidden">
        <ProductImage product={product} />
        {product.isOffer && (
          <motion.div
            initial={{ x: -60 }}
            animate={{ x: 0 }}
            className="absolute top-4 left-4 z-10"
          >
            <Badge variant="offer">
              {product.discount ? `${product.discount}% OFF` : "OFERTA"}
            </Badge>
          </motion.div>
        )}
        <button className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg">
          <Heart className="w-4 h-4 text-text-muted hover:text-error transition-colors" />
        </button>
      </div>

      <Link href={`/productos/${product.id}`} className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-text-muted font-bold uppercase tracking-[0.15em]">
            {product.brand}
          </span>
          <span className="text-[9px] text-text-muted/60 bg-bg-alt px-1.5 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>
        <h3 className="font-bold text-text text-xs sm:text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <div className="mt-auto">
          {product.oldPrice && (
            <div className="flex items-center gap-1.5 mb-0.5">
              <p className="text-xs text-text-muted line-through">
                {formatPrice(product.oldPrice)}
              </p>
              {product.discount && (
                <span className="text-[10px] font-bold text-success bg-success/10 px-1.5 py-0.5 rounded-full">
                  -{product.discount}%
                </span>
              )}
            </div>
          )}
          <p className="text-xl font-extrabold text-primary mb-3 tracking-tight">
            {formatPrice(product.price)}
          </p>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/productos/${product.id}`}
              className="col-span-2 flex items-center justify-center gap-1.5 bg-primary text-white py-2 rounded-xl font-bold text-xs hover:bg-primary-light transition-all duration-200 shadow-md shadow-primary/20 active:scale-[0.98]"
            >
              <Eye className="w-3.5 h-3.5" />
              Ver detalle
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="col-span-2 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border text-text font-semibold text-xs hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 active:scale-[0.98]"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Agregar
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}