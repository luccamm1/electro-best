"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";

const floatingProducts = [
  { emoji: "📺", className: "top-[15%] left-[5%] animate-float", size: "text-5xl sm:text-6xl" },
  { emoji: "📱", className: "top-[10%] right-[8%] animate-float-delayed", size: "text-4xl sm:text-5xl" },
  { emoji: "💻", className: "bottom-[20%] left-[10%] animate-float", size: "text-5xl sm:text-6xl", delay: "2s" },
  { emoji: "🔊", className: "bottom-[25%] right-[5%] animate-float-delayed", size: "text-4xl sm:text-5xl", delay: "1s" },
  { emoji: "❄️", className: "top-[40%] right-[15%] animate-float", size: "text-3xl sm:text-4xl", delay: "3s" },
  { emoji: "🔥", className: "top-[50%] left-[15%] animate-float-delayed", size: "text-3xl sm:text-4xl", delay: "1.5s" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-primary-dark/30" />

      {/* Floating emojis */}
      {floatingProducts.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute hidden lg:block ${item.className} ${item.size} opacity-20`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1, delay: i * 0.2 }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <Zap className="w-4 h-4 text-secondary" />
              <span className="text-white/90 text-sm font-medium">
                Nueva temporada — Ofertas increíbles
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6">
              Todo para tu hogar{" "}
              <span className="text-secondary">y tu tecnología</span>
              <br />
              en un solo lugar.
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-lg mb-8 leading-relaxed">
              {siteConfig.slogan}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" className="text-base">
                Ver productos
                <ArrowRight className="w-5 h-5" />
              </Button>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="text-base w-full sm:w-auto">
                  <MessageCircle className="w-5 h-5" />
                  Contactanos por WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />
              <div className="relative grid grid-cols-2 gap-4 p-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 flex flex-col items-center justify-center aspect-square border border-white/10">
                  <span className="text-6xl mb-3">📺</span>
                  <span className="text-white/60 text-sm font-medium">Smart TV</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 flex flex-col items-center justify-center aspect-square border border-white/10 mt-8">
                  <span className="text-6xl mb-3">📱</span>
                  <span className="text-white/60 text-sm font-medium">Celulares</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 flex flex-col items-center justify-center aspect-square border border-white/10 -mt-4">
                  <span className="text-6xl mb-3">💻</span>
                  <span className="text-white/60 text-sm font-medium">Notebooks</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 flex flex-col items-center justify-center aspect-square border border-white/10 mt-4">
                  <span className="text-6xl mb-3">🔊</span>
                  <span className="text-white/60 text-sm font-medium">Audio</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
