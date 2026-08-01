import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { CategoryFilters } from "@/components/category/category-filters";
import { Reveal } from "@/components/ui/reveal";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return {};

  return {
    title: category.name,
    description: `Compre e venda ${category.name} com entrega instantânea e compra protegida na Vortex.`,
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const categoryProducts = products.filter((p) => p.categorySlug === category.slug);

  return (
    <div>
      <section className="relative h-[42vh] min-h-[320px] overflow-hidden pt-24">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/20" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(circle at 30% 100%, ${category.accentFrom}44, transparent 60%)`,
          }}
        />
        <div className="container relative h-full flex flex-col justify-end pb-10">
          <Reveal>
            <p className="text-xs uppercase tracking-widest text-white/70 mb-2">Categoria</p>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl">{category.name}</h1>
            <p className="text-muted-foreground mt-2">
              {category.productCount} produtos disponíveis
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container py-12">
        <CategoryFilters />

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 mt-8">
            {categoryProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center text-muted-foreground">
            Novos produtos chegando em breve nesta categoria.
          </div>
        )}
      </section>
    </div>
  );
}
