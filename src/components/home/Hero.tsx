"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, MessageCircle, CreditCard, Truck, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";

const heroSlides = [
  {
    badge: { icon: Zap, text: "Nueva temporada — Ofertas increíbles" },
    title: ["Todo para tu hogar", "y tu tecnología"],
    subtitle: "en un solo lugar.",
    description: siteConfig.slogan,
    cta: { text: "Ver productos", href: "/" },
    ctaOutline: { text: "Contactanos por WhatsApp", href: siteConfig.social.whatsapp },
    bg: "from-primary-dark via-[#0D3F99] to-primary-light",
  },
  {
    badge: { icon: CreditCard, text: "Promoción especial" },
    title: ["Hasta", "12 cuotas sin interés"],
    subtitle: "en todos los productos seleccionados",
    description: "En todos los productos seleccionados con tarjetas de crédito bancarias",
    cta: { text: "Aprovechar ofertas", href: "/" },
    bg: "from-[#082B6B] via-[#0B3D91] to-[#1E5AB5]",
  },
  {
    badge: { icon: Truck, text: "Envío garantizado" },
    title: ["Envíos a", "todo el país"],
    subtitle: "rápido y seguro",
    description: "Recibí tu producto donde quieras, rápido y seguro sin costo adicional",
    cta: { text: "Consultar por WhatsApp", href: siteConfig.social.whatsapp },
    bg: "from-[#0B3D91] via-[#0F4AA8] to-[#2563EB]",
  },
  {
    badge: { icon: ShieldCheck, text: "Compra segura" },
    title: ["Marcas originales", "con garantía oficial"],
    subtitle: "100% confiable",
    description: "Trabajamos solo con marcas oficiales y garantía real para tu tranquilidad",
    cta: { text: "Ver productos", href: "/" },
    bg: "from-[#1E40AF] via-primary to-[#1E5AB5]",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const slide = heroSlides[activeIndex];

  return (
    <section
      className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`}
        />
      </AnimatePresence>

      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      <div className="absolute top-20 left-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-32 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-8 border border-white/10"
            >
              <slide.badge.icon className="w-4 h-4 text-secondary" />
              <span className="text-white/90 text-sm font-medium">
                {slide.badge.text}
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.05] mb-3 tracking-tight">
              {slide.title[0]}{" "}
              <span className="text-secondary">{slide.title[1]}</span>
              <br />
              {slide.subtitle}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/65 max-w-xl mb-10 leading-relaxed">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={slide.cta.href}>
                <Button variant="secondary" size="lg" className="text-base shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30">
                  {slide.cta.text}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              {slide.ctaOutline && (
                <a
                  href={slide.ctaOutline.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="text-base w-full sm:w-auto border-white/20 hover:border-white/40">
                    <MessageCircle className="w-5 h-5" />
                    {slide.ctaOutline.text}
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-secondary w-6 h-2.5"
                : "bg-white/30 hover:bg-white/50 w-2.5 h-2.5"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-40 bg-gradient-to-t from-bg via-bg/50 to-transparent pointer-events-none" />
    </section>
  );
}