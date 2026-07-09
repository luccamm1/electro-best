import { ArrowRight } from "lucide-react";
import { products, brands } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import BrandCarousel from "@/components/home/BrandCarousel";
import Button from "@/components/ui/Button";
import Link from "next/link";

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

const grouped = (() => {
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
})();

const brandEntries = Object.entries(grouped);

export default function FeaturedProducts() {
  return (
    <section className="relative py-24 sm:py-28 bg-bg-alt">
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

        {brandEntries.slice(0, 4).map(([brand, brandProducts]) => (
          <div
            key={brand}
            className="mb-14 sm:mb-20 last:mb-0"
          >
            <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-base sm:text-lg">
                  {brandIcons[brand] || "🏷️"}
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-text">
                  {brand}
                </h3>
                <p className="text-[11px] sm:text-xs text-text-muted">
                  {brandProducts.length} producto{brandProducts.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <BrandCarousel products={brandProducts} brand={brand} />
          </div>
        ))}

        <div className="relative mt-20 sm:mt-28 text-center">
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-16 h-[2px] bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full" />
          <p className="text-text-muted text-xs sm:text-sm mb-4">
            ¿No encontraste lo que buscabas? Tenemos más productos esperándote
          </p>
          <Link href="/productos">
            <Button variant="primary" size="lg">
              Ver todos los productos
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
