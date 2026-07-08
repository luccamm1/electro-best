"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Package } from "lucide-react";
import { categories, products } from "@/lib/constants";
import ProductCard from "@/components/ui/ProductCard";
import SectionTitle from "@/components/ui/SectionTitle";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-bg">
        <div className="text-center">
          <div className="w-24 h-24 bg-bg-alt rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-text-muted" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Categoría no encontrada</h1>
          <p className="text-text-muted mb-6">
            La categoría que buscás no existe o fue eliminada.
          </p>
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

  const categoryProducts = products.filter(
    (p) => p.category === category.name
  );

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-bg-alt to-bg rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-border/50">
            <span className="text-4xl">{category.icon}</span>
          </div>
          <SectionTitle
            title={category.name}
            subtitle={`${categoryProducts.length} productos disponibles`}
          />
        </motion.div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-bg-alt rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-text-muted" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Sin productos disponibles
            </h2>
            <p className="text-text-muted mb-6">
              No hay productos en esta categoría por el momento.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categoryProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
