import Hero from "@/components/home/Hero";
import Benefits from "@/components/home/Benefits";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandsCarousel from "@/components/home/BrandsCarousel";

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Categories />
      <FeaturedProducts />
      <BrandsCarousel />
    </>
  );
}
