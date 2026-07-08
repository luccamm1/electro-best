"use client";

import { motion } from "framer-motion";
import { CreditCard, ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function PromoBanner() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-light to-primary rounded-3xl sm:rounded-4xl"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 px-6 sm:px-12 lg:px-16 py-10 sm:py-14 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl items-center justify-center border border-white/10">
                <CreditCard className="w-10 h-10 text-secondary" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                    Promoción especial
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  Hasta 12 cuotas sin interés
                </h3>
                <p className="text-white/70 text-base sm:text-lg mt-2 max-w-xl">
                  En todos los productos seleccionados con tarjetas de crédito
                  bancarias
                </p>
              </div>
            </div>

            <Button variant="secondary" size="lg" className="shrink-0 text-base whitespace-nowrap shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30">
              Aprovechar ofertas
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}