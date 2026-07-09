import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { siteConfig, categories } from "@/lib/constants";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/electro-logo.png"
                alt="Electro Best"
                width={200}
                height={55}
                className="h-16 w-auto"
                priority
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-secondary hover:text-black rounded-xl flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:shadow-secondary/20"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-secondary hover:text-black rounded-xl flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:shadow-secondary/20"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-secondary hover:text-black rounded-xl flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:shadow-secondary/20"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Categorías</h3>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categorias/${cat.slug}`}
                    className="flex items-center gap-2 text-white/60 hover:text-secondary transition-colors text-sm group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">
                    {siteConfig.address}
                  </p>
                  <p className="text-sm text-white/60">
                    {siteConfig.city}, {siteConfig.province}
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-sm text-white/60 hover:text-secondary transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-white/60 hover:text-secondary transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Horarios</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Lunes a Viernes</p>
                  <p className="text-sm text-white/60">
                    {siteConfig.hours.weekdays}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Sábados</p>
                  <p className="text-sm text-white/60">
                    {siteConfig.hours.saturday}
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-6 bg-white/[0.04] backdrop-blur-sm rounded-2xl p-4 border border-white/5">
              <p className="text-xs text-white/40 mb-3">📍 Encontranos en</p>
              <div className="bg-white/10 rounded-xl h-28 flex items-center justify-center text-white/30 text-sm">
                Mapa interactivo
              </div>
            </div>
            </div>
          </div>
        </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} ELECTRO BEST. Todos los derechos
              reservados.
            </p>
            <p className="text-white/30 text-xs text-center">
              Diseñado con ❤️ para vos
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}