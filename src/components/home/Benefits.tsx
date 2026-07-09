import {
  Headphones,
  Truck,
  ShieldCheck,
  Award,
  CreditCard,
} from "lucide-react";
import { benefits } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";

const iconMap: Record<string, React.ReactNode> = {
  headphones: <Headphones className="w-7 h-7" />,
  truck: <Truck className="w-7 h-7" />,
  shield: <ShieldCheck className="w-7 h-7" />,
  award: <Award className="w-7 h-7" />,
  "credit-card": <CreditCard className="w-7 h-7" />,
};

export default function Benefits() {
  return (
    <section className="py-20 sm:py-28 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="¿Por qué elegirnos?"
          subtitle="Nos comprometemos a brindarte la mejor experiencia de compra"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group bg-white rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-primary/20 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-primary/5 to-primary/10 group-hover:from-primary group-hover:to-primary-light rounded-2xl flex items-center justify-center text-primary group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-primary/25">
                {iconMap[benefit.icon]}
              </div>
              <h3 className="font-bold text-text text-base mb-2">
                {benefit.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}