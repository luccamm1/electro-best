export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  isOffer?: boolean;
  discount?: number;
  badge?: string;
  description?: string;
  specs?: string[];
  colors?: string[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 1, name: "Smart TV", icon: "📺", slug: "smart-tv" },
  { id: 2, name: "Celulares", icon: "📱", slug: "celulares" },
  { id: 3, name: "Audio", icon: "🔊", slug: "audio" },
  { id: 4, name: "Refrigeración", icon: "❄️", slug: "refrigeracion" },
  { id: 5, name: "Calefacción", icon: "🔥", slug: "calefaccion" },
  { id: 6, name: "Cocina", icon: "🍳", slug: "cocina" },
  { id: 7, name: "Hogar", icon: "🧹", slug: "hogar" },
  { id: 8, name: "Tecnología", icon: "💻", slug: "tecnologia" },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Smart TV 55" 4K UHD',
    brand: "Samsung",
    price: 799999,
    oldPrice: 999999,
    category: "Smart TV",
    image: "tv",
    isOffer: true,
    discount: 20,
    badge: "OFERTA",
    description: "Disfrutá de una experiencia visual inmersiva con este Smart TV Samsung 55\" 4K UHD. Con su procesador intelligente y colores vibrantes, cada escena cobra vida. Ideal para tu hogar.",
    specs: ["55 pulgadas", "Resolución 4K UHD", "HDR10+", "Smart TV Tizen", "WiFi + Bluetooth", "3 puertos HDMI"],
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    price: 1899999,
    oldPrice: 2199999,
    category: "Celulares",
    image: "phone",
    isOffer: true,
    discount: 14,
    badge: "OFERTA",
    description: "El iPhone más potente hasta la fecha. Con chip A17 Pro, cámara de 48MP y diseño en titanio. Rendimiento extremo para los que más exigen.",
    specs: ["Pantalla 6.7\" Super Retina XDR", "Chip A17 Pro", "256GB almacenamiento", "Cámara 48MP", "USB-C", "iOS 17"],
  },
  {
    id: 3,
    name: "Parlante Bluetooth Portátil",
    brand: "JBL",
    price: 89999,
    oldPrice: 119999,
    category: "Audio",
    image: "speaker",
    isOffer: true,
    discount: 25,
    badge: "OFERTA",
    description: "Llevá tu música a todos lados con este parlante JBL. Sonido potente, graves profundos y resistencia al agua. Hasta 20 horas de reproducción.",
    specs: ["Potencia 30W", "Bluetooth 5.3", "Resistente al agua IPX7", "20hs batería", "Altavoz stereo", "Microfono incorporado"],
  },
  {
    id: 4,
    name: "Heladera No Frost 400L",
    brand: "LG",
    price: 1299999,
    oldPrice: 1599999,
    category: "Refrigeración",
    image: "fridge",
    isOffer: true,
    discount: 19,
    badge: "OFERTA",
    description: "Heladera LG No Frost con 400 litros de capacidad. Tecnología Smart Inverter que ahorra energía y mantiene tus alimentos frescos por más tiempo.",
    specs: ["400L capacidad total", "No Frost", "Smart Inverter Compressor", "Display digital", "Estantes de vidrio templado", "Cajón verdulero"],
  },
  {
    id: 5,
    name: "Notebook HP Pavilion 15",
    brand: "HP",
    price: 1099999,
    oldPrice: 1349999,
    category: "Tecnología",
    image: "laptop",
    isOffer: true,
    discount: 18,
    badge: "OFERTA",
    description: "Potente notebook HP Pavilion 15 con procesador Intel Core i7 y 16GB de RAM. Ideal para trabajo, estudio y entretenimiento.",
    specs: ["Intel Core i7 13th Gen", "16GB RAM DDR4", "512GB SSD", "Pantalla 15.6\" FHD", "Windows 11", "Teclado retroiluminado"],
  },
  {
    id: 6,
    name: "Cocina 5 Hornallas",
    brand: "Enova",
    price: 699999,
    oldPrice: 849999,
    category: "Cocina",
    image: "stove",
    isOffer: true,
    discount: 18,
    badge: "OFERTA",
    description: "Cocina Enova de 5 hornallas con horno de gran capacidad. Diseño moderno en acero inoxidable y encendido eléctrico seguro.",
    specs: ["5 hornallas", "Horno con visor", "Encendido eléctrico", "Acero inoxidable", "Perilla de seguridad", "Bandeja recolectora"],
  },
  {
    id: 7,
    name: "Aire Acondicionado Split 3000W",
    brand: "Philips",
    price: 899999,
    oldPrice: 1099999,
    category: "Refrigeración",
    image: "ac",
    isOffer: true,
    discount: 18,
    badge: "OFERTA",
    description: "Aire acondicionado Philips Split de 3000W con tecnología inverter. Frío/calor para todo el año. Eficiencia energética A++.",
    specs: ["3000W potencia", "Frío / Calor", "Tecnología Inverter", "Eficiencia A++", "Control remoto", "Filtro antipolvo"],
  },
  {
    id: 8,
    name: "Licuadora Profesional 800W",
    brand: "Liliana",
    price: 45999,
    oldPrice: 58999,
    category: "Hogar",
    image: "blender",
    isOffer: true,
    discount: 22,
    badge: "OFERTA",
    description: "Licuadora Liliana profesional con motor de 800W y 6 velocidades. Vaso de vidrio templado de 1.5L. Ideal para preparar todo tipo de bebidas y mezclas.",
    specs: ["800W de potencia", "Vaso de vidrio 1.5L", "6 velocidades + Pulse", "Cuchillas de acero inoxidable", "Sistema antigoteo", "Base antideslizante"],
  },
  {
    id: 9,
    name: "Freezer Horizontal 200L",
    brand: "Whirlpool",
    price: 749999,
    oldPrice: 899999,
    category: "Refrigeración",
    image: "freezer",
    isOffer: false,
    description: "Freezer horizontal Whirlpool de 200 litros. Ideal para almacenar grandes cantidades de alimentos congelados. Sistema de congelación rápida.",
    specs: ["200L capacidad", "Congelación rápida", "Termostato ajustable", "Cestos organizadores", "Cierre de seguridad", "Eficiencia energética A"],
  },
  {
    id: 10,
    name: "Horno Eléctrico 50L",
    brand: "Atma",
    price: 189999,
    oldPrice: 249999,
    category: "Cocina",
    image: "oven",
    isOffer: true,
    discount: 24,
    badge: "OFERTA",
    description: "Horno eléctrico Atma de 50 litros con función grill y convección. Cocción pareja y rápida. Control de temperatura ajustable.",
    specs: ["50L capacidad", "Función Grill", "Convección", "Control de temperatura", "Temporizador 60min", "Bandeja + rejilla"],
  },
  {
    id: 11,
    name: "Calefactor Eléctrico 2000W",
    brand: "BGH",
    price: 59999,
    oldPrice: 79999,
    category: "Calefacción",
    image: "heater",
    isOffer: true,
    discount: 25,
    badge: "OFERTA",
    description: "Calefactor eléctrico BGH de 2000W con termostato ajustable. Calefacción rápida y eficiente para ambientes de hasta 25m². Seguridad mejorada.",
    specs: ["2000W potencia", "Termostato ajustable", "3 modos de calor", "Apagado automático", "Protección sobrecalentamiento", "Silencioso"],
  },
  {
    id: 12,
    name: "Ventilador de Pie 18",
    brand: "Liliana",
    price: 34999,
    oldPrice: 44999,
    category: "Hogar",
    image: "fan",
    isOffer: true,
    discount: 22,
    badge: "OFERTA",
    description: "Ventilador de pie Liliana con 3 velocidades y oscilación. Ideal para mantener tu hogar fresco en verano. Base estable y diseño moderno.",
    specs: ["18 pulgadas", "3 velocidades", "Oscilación automática", "Base antideslizante", "Rejilla de seguridad", "Bajo consumo"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María González",
    avatar: "MG",
    rating: 5,
    comment: "Excelente atención y los precios son los mejores. Me llevé un Smart TV Samsung y el proceso fue súper rápido. Recomiendo totalmente.",
    date: "Hace 2 semanas",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    avatar: "CR",
    rating: 5,
    comment: "Compré mi heladera LG acá y no podría estar más contento. La entrega fue en tiempo récord y el producto llegó impecable.",
    date: "Hace 1 mes",
  },
  {
    id: 3,
    name: "Laura Fernández",
    avatar: "LF",
    rating: 5,
    comment: "El equipo de audio que compré superó mis expectativas. Muy buena calidad y el precio imbatible. Sin dudas volveré a comprar.",
    date: "Hace 3 semanas",
  },
  {
    id: 4,
    name: "Martín López",
    avatar: "ML",
    rating: 4,
    comment: "Muy buena variedad de productos. Me asesoraron bien para elegir mi aire acondicionado. Lo recomiendo.",
    date: "Hace 1 semana",
  },
  {
    id: 5,
    name: "Sofía Martínez",
    avatar: "SM",
    rating: 5,
    comment: "Compré varios electrodomésticos para mi casa nueva. Todo perfecto, los precios son muy competitivos y la atención de primera.",
    date: "Hace 2 meses",
  },
];

export const benefits: Benefit[] = [
  {
    id: 1,
    title: "Atención Personalizada",
    description: "Te asesoramos para que encuentres lo que necesitás",
    icon: "headphones",
  },
  {
    id: 2,
    title: "Envíos a todo el país",
    description: "Recibí tu producto donde quieras, rápido y seguro",
    icon: "truck",
  },
  {
    id: 3,
    title: "Productos Originales",
    description: "Trabajamos solo con marcas oficiales y garantía real",
    icon: "shield",
  },
  {
    id: 4,
    title: "Garantía Oficial",
    description: "Todos nuestros productos cuentan con garantía de fábrica",
    icon: "award",
  },
  {
    id: 5,
    title: "Mejores Medios de Pago",
    description: "Efectivo, transferencia, tarjetas y cuotas sin interés",
    icon: "credit-card",
  },
];

export const brands: string[] = [
  "Samsung",
  "LG",
  "Enova",
  "Gadnic",
  "Philips",
  "Atma",
  "Liliana",
  "BGH",
  "Noblex",
  "Whirlpool",
  "HP",
  "Apple",
  "JBL",
  "Sony",
  "Panasonic",
];

export const siteConfig = {
  name: "ELECTRO BEST",
  description: "Todo para tu hogar y tu tecnología, en un solo lugar.",
  slogan: "Las mejores marcas, precios competitivos y atención personalizada.",
  phone: "381 4889847",
  whatsapp: "5493814889847",
  email: "info@electrobest.com.ar",
  address: "Av. Roca 1604",
  city: "San Miguel de Tucumán",
  province: "Tucumán",
  hours: {
    weekdays: "8:30 – 13:00 | 16:00 – 20:00",
    saturday: "8:30 – 13:00",
  },
  social: {
    instagram: "https://instagram.com/electrobest",
    facebook: "https://facebook.com/electrobest",
    whatsapp: "https://wa.me/5493814889847",
  },
};
