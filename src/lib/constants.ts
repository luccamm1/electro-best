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
