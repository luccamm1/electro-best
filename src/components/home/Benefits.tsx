import { Truck, CreditCard, ShieldCheck, Store } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Envío a todo el país",
    description: "Entregas rápidas y seguras",
  },
  {
    icon: CreditCard,
    title: "Hasta 12 cuotas",
    description: "Sin interés con todos los bancos",
  },
  {
    icon: ShieldCheck,
    title: "Garantía oficial",
    description: "Productos 100% originales",
  },
  {
    icon: Store,
    title: "Retiro en tienda",
    description: "Sin cargo y sin demora",
  },
];

export default function Benefits() {
  return (
    <section className="py-16 sm:py-20 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-5 sm:p-6 bg-white rounded-2xl border border-border/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="font-bold text-text text-sm sm:text-base mb-1">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-text-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
