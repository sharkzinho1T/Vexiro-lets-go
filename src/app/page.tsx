import { Hero } from "@/components/sections/hero";
import { CategoriesGrid } from "@/components/sections/categories-grid";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { TrustStats } from "@/components/sections/trust-stats";
import { CtaSeller } from "@/components/sections/cta-seller";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesGrid />
      <TrustStats />
      <FeaturedProducts />
      <CtaSeller />
    </>
  );
}
