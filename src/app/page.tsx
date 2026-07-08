// src/app/page.tsx

import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TrustedBrands from "@/components/home/TrustedBrands";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-white">

      <HeroSection />

      <AboutPreview />

      <FeaturedProducts />

      <ServicesSection />
      
       <TrustedBrands />

       <WhyChooseUs />

    </main>
  );
}