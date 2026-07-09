import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ELECTRO BEST — Todo para tu hogar y tecnología",
  description:
    "Las mejores marcas, precios competitivos y atención personalizada. Smart TV, celulares, electrodomésticos y más. Envíos a todo el país.",
  keywords: [
    "electrodomésticos",
    "tecnología",
    "Smart TV",
    "celulares",
    "audio",
    "heladeras",
    "cocinas",
    "Tucumán",
  ],
  openGraph: {
    title: "ELECTRO BEST — Todo para tu hogar y tecnología",
    description:
      "Las mejores marcas, precios competitivos y atención personalizada.",
    type: "website",
    locale: "es_AR",
    siteName: "ELECTRO BEST",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.className} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <CartProvider>
          <TopBar />
          <Header />
          <Navbar />
          <main className="flex-1">{children}</main>
          <WhatsAppButton />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
