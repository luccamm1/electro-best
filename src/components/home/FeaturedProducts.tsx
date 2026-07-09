"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products, brands } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import BrandCarousel from "@/components/home/BrandCarousel";
import Button from "@/components/ui/Button";

const brandIcons: Record<string, string> = {
  Samsung: "📺",
  Apple: "🍎",
  JBL: "🔊",
  LG: "💡",
  HP: "🖨️",
  Enova: "🍳",
  Philips: "💈",
  Liliana: "🥤",
  Atma: "🔥",
  BGH: "🌡️",
};

export default function FeaturedProducts() {
  const grouped = useMemo(() => {
    const map: Record<string, typeof products> = {};
    const brandOrder = brands.filter((b) =>
      products.some((p) => p.brand === b)
    );
    for (const brand of brandOrder) {
      const brandProducts = products.filter((p) => p.brand === brand);
      if (brandProducts.length > 0) {
        map[brand] = brandProducts;
      }
    }
    return map;
  }, []);

  const brandEntries = useMemo(
    () => Object.entries(grouped),
    [grouped]
  );

  return (
    <section className="relative py-20 sm:py-28 pb-20 sm:pb-36 bg-bg-alt">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          color: '#0B3D91',
        }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          title="Productos por Marca"
          subtitle="Explorá nuestras marcas líderes y encontrá el producto perfecto para vos"
        />

        {brandEntries.map(([brand, brandProducts], i) => (
          <motion.div
            key={brand}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="mb-14 sm:mb-20 last:mb-0"
          >
            <div className="flex items-center gap-3 mb-7 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-xl sm:text-2xl">
                  {brandIcons[brand] || "🏷️"}
                </span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-text">
                  {brand}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted">
                  {brandProducts.length} producto{brandProducts.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <BrandCarousel products={brandProducts} brand={brand} />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-20 sm:mt-28 text-center"
        >
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-20 h-[3px] bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full" />
          <p className="text-text-muted text-sm sm:text-base mb-5">
            ¿No encontraste lo que buscabas? Tenemos más productos esperándote
          </p>
          <Button
            variant="primary"
            size="lg"
            className="!px-10 sm:!px-14 !py-5 sm:!py-6 !text-base sm:!text-lg !shadow-2xl !shadow-primary/30 hover:!shadow-primary/40"
          >
            Ver todos los productos
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
