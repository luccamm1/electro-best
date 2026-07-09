"use client";

import { products } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/ui/ProductCard";

export default function AllProducts() {
  return (
    <section className="py-16 sm:py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Todos los Productos"
          subtitle="Explorá nuestro catálogo completo con todos los productos disponibles"
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} animated={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
