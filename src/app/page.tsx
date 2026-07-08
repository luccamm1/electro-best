import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import Benefits from "@/components/home/Benefits";
import BrandsCarousel from "@/components/home/BrandsCarousel";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <PromoBanner />
      <Benefits />
      <BrandsCarousel />
      <Testimonials />
    </>
  );
}
