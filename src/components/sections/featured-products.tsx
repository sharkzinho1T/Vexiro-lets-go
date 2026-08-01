import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  return (
    <section id="produtos" className="container py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-neon-purpleSoft mb-3">
              Em alta
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl">
              Produtos mais vendidos
            </h2>
          </div>
          <Button variant="outline" className="group">
            Ver tudo
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
