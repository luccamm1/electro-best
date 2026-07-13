import type { Product } from "@/lib/constants";
import ProductCard from "@/components/ui/ProductCard";

const GAP = 20;

interface BrandCarouselProps {
  products: Product[];
  brand: string;
}

export default function BrandCarousel({ products, brand }: BrandCarouselProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} animated={false} />
      ))}
    </div>
  );
}
