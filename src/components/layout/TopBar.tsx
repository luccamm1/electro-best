import { Truck, CreditCard, ShieldCheck } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-primary-dark text-white/80 text-[11px] sm:text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-8 sm:h-9 gap-6 sm:gap-10">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Envíos a todo el país</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CreditCard className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Hasta 12 cuotas sin interés</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Garantía oficial</span>
          </span>
        </div>
      </div>
    </div>
  );
}
