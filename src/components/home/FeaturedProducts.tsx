"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.isOffer).slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Productos Destacados"
          subtitle="Las mejores ofertas en tecnología y electrodomésticos"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button variant="primary" size="lg">
            Ver todos los productos
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
