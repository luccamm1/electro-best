"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Heart, MessageCircle } from "lucide-react";
import type { Product } from "@/lib/constants";
import { siteConfig } from "@/lib/constants";
import Badge from "./Badge";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function ProductImage({ product }: { product: Product }) {
  const gradients: Record<string, string> = {
    tv: "from-blue-600 to-blue-800",
    phone: "from-gray-800 to-gray-900",
    speaker: "from-red-500 to-red-700",
    fridge: "from-cyan-400 to-cyan-600",
    laptop: "from-gray-600 to-gray-800",
    stove: "from-orange-500 to-orange-700",
    ac: "from-blue-400 to-blue-600",
    blender: "from-white to-gray-200",
    freezer: "from-sky-400 to-sky-600",
    oven: "from-orange-400 to-orange-600",
    heater: "from-red-400 to-red-600",
    fan: "from-green-400 to-green-600",
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

  return (
    <div
      className={`relative w-full h-48 bg-gradient-to-br ${gradients[product.image] || "from-primary to-primary-light"} flex items-center justify-center overflow-hidden`}
    >
      <span className="text-6xl sm:text-7xl opacity-90 select-none">
        {icons[product.image] || "📦"}
      </span>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const formatPrice = (price: number) =>
    `$${price.toLocaleString("es-AR")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-border/50 hover:border-primary/20 flex flex-col"
    >
      <div className="relative overflow-hidden">
        <ProductImage product={product} />
        {product.isOffer && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="offer">
              {product.discount ? `${product.discount}% OFF` : "OFERTA"}
            </Badge>
          </div>
        )}
        <button className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
          <Heart className="w-4 h-4 text-text-muted hover:text-error transition-colors" />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-text-muted font-medium uppercase tracking-wider mb-1">
          {product.brand}
        </span>
        <h3 className="font-semibold text-text text-sm sm:text-base leading-tight mb-3 line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-auto">
          {product.oldPrice && (
            <p className="text-sm text-text-muted line-through mb-1">
              {formatPrice(product.oldPrice)}
            </p>
          )}
          <p className="text-xl font-bold text-primary mb-4">
            {formatPrice(product.price)}
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button className="col-span-2 w-full bg-primary text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-light transition-colors duration-200 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]">
              Comprar
            </button>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-success text-success font-medium text-sm hover:bg-success hover:text-white transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button className="flex items-center justify-center py-2.5 rounded-xl border-2 border-border text-text-muted hover:border-primary hover:text-primary transition-all duration-200">
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
