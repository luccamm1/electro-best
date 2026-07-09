import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Testimonials() {
  return (
    <section className="py-28 sm:py-36 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Lo que dicen nuestros clientes"
          subtitle="La opinión de quienes ya confiaron en nosotros"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group bg-white rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-primary/20 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/5 group-hover:text-primary/15 transition-colors" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-text text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-muted">{t.date}</p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating
                        ? "text-secondary fill-secondary"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>

              <p className="text-text-muted text-sm leading-relaxed">
                &ldquo;{t.comment}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}