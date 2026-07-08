"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";

const floatingProducts = [
  { emoji: "📺", className: "top-[15%] left-[5%] animate-float", size: "text-5xl sm:text-7xl" },
  { emoji: "📱", className: "top-[10%] right-[8%] animate-float-delayed", size: "text-4xl sm:text-6xl" },
  { emoji: "💻", className: "bottom-[20%] left-[10%] animate-float", size: "text-5xl sm:text-7xl" },
  { emoji: "🔊", className: "bottom-[25%] right-[5%] animate-float-delayed", size: "text-4xl sm:text-6xl" },
  { emoji: "❄️", className: "top-[40%] right-[15%] animate-float", size: "text-3xl sm:text-5xl" },
  { emoji: "🔥", className: "top-[50%] left-[15%] animate-float-delayed", size: "text-3xl sm:text-5xl" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-dark via-[#0D3F99] to-primary-light">
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-primary-dark/20" />

      <div className="absolute top-20 left-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-[120px]" />

      {floatingProducts.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute hidden lg:block ${item.className} ${item.size} opacity-[0.15]`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-8 border border-white/10"
            >
              <Zap className="w-4 h-4 text-secondary" />
              <span className="text-white/90 text-sm font-medium">
                Nueva temporada — Ofertas increíbles
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
              Todo para tu hogar{" "}
              <span className="text-secondary">y tu tecnología</span>
              <br />
              en un solo lugar.
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/65 max-w-xl mb-10 leading-relaxed">
              {siteConfig.slogan}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" className="text-base shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30">
                Ver productos
                <ArrowRight className="w-5 h-5" />
              </Button>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="text-base w-full sm:w-auto border-white/20 hover:border-white/40">
                  <MessageCircle className="w-5 h-5" />
                  Contactanos por WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />
              <div className="absolute inset-4 bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-3xl backdrop-blur-sm border border-white/10" />
              <div className="relative grid grid-cols-2 gap-5 p-10">
                {[
                  { emoji: "📺", label: "Smart TV", offset: "" },
                  { emoji: "📱", label: "Celulares", offset: "mt-8" },
                  { emoji: "💻", label: "Notebooks", offset: "-mt-4" },
                  { emoji: "🔊", label: "Audio", offset: "mt-4" },
                ].map(({ emoji, label, offset }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className={`bg-white/[0.06] backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center aspect-square border border-white/10 hover:bg-white/[0.1] transition-all duration-300 ${offset}`}
                  >
                    <span className="text-5xl mb-3">{emoji}</span>
                    <span className="text-white/70 text-sm font-medium">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-40 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
    </section>
  );
}