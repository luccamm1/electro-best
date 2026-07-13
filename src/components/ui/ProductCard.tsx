"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
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
  coffee: "from-amber-700 via-amber-800 to-stone-900",
};

const icons: Record<string, string> = {
  tv: "📺", phone: "📱", speaker: "🔊", fridge: "❄️",
  laptop: "💻", stove: "🍳", ac: "❄️", blender: "🥤",
  freezer: "🧊", oven: "🔥", heater: "🌡️", fan: "🌀",
  coffee: "☕",
};

export default function ProductCard({ product, index = 0, animated = true }: ProductCardProps) {
  const { addItem } = useCart();

  const formatPrice = (price: number) =>
    `$${price.toLocaleString("es-AR")}`;

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 border border-border/50 flex flex-col ${
        animated ? "animate-fade-up" : ""
      }`}
      style={animated ? { animationDelay: `${index * 80}ms` } : undefined}
    >
      <div className="relative overflow-hidden">
        <Link href={`/productos/${product.id}`}>
          {product.image.startsWith("/") ? (
            <div className="relative w-full h-40 sm:h-44 bg-bg-alt flex items-center justify-center overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-2"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          ) : (
            <div
              className={`relative w-full h-40 sm:h-44 bg-gradient-to-br ${gradients[product.image] || "from-primary to-primary-light"} flex items-center justify-center overflow-hidden`}
            >
              <span className="text-5xl sm:text-6xl opacity-90 select-none transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                {icons[product.image] || "📦"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20" />
            </div>
          )}
        </Link>
        {product.isOffer && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="offer">
              {product.discount ? `${product.discount}% OFF` : "OFERTA"}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-1">
          {product.brand}
        </span>
        <h3 className="font-bold text-text text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
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

          <div className="flex flex-col gap-2">
            <Link
              href={`/productos/${product.id}`}
              className="flex items-center justify-center py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-all duration-200 shadow-sm active:scale-[0.97]"
            >
              Ver detalle
            </Link>
            <button
              onClick={() => addItem(product)}
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-border text-text font-semibold text-sm hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 active:scale-[0.97]"
            >
              <ShoppingCart className="w-4 h-4" />
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
