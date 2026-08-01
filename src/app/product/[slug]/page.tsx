import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductBuyBox } from "@/components/product/product-buy-box";
import { ProductReviews } from "@/components/product/product-reviews";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { StarRating } from "@/components/ui/star-rating";
import { formatCompactNumber } from "@/lib/utils";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug, product.categorySlug);

  return (
    <div className="container pt-32 pb-24">
      <nav className="text-xs text-muted-foreground mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">
          Início
        </Link>
        <span>/</span>
        <Link href={`/category/${product.categorySlug}`} className="hover:text-white transition-colors capitalize">
          {product.categorySlug.replace("-", " ")}
        </Link>
        <span>/</span>
        <span className="text-white/70 truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <ProductGallery images={product.gallery.length ? product.gallery : [product.image]} title={product.title} />
        </Reveal>

        <Reveal delay={0.1}>
          <ProductBuyBox product={product} />
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-12 mt-20 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div>
            <h2 className="font-display font-bold text-2xl mb-4">Descrição</h2>
            <GlassCard className="p-6">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </GlassCard>

            <div className="mt-12">
              <h2 className="font-display font-bold text-2xl mb-4">Avaliações</h2>
              <ProductReviews rating={product.rating} reviewCount={product.reviewCount} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="p-6 h-fit sticky top-28">
            <h3 className="font-display font-semibold text-lg mb-4">Sobre o vendedor</h3>
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0">
                <Image src={product.seller.avatar} alt={product.seller.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-semibold">{product.seller.name}</p>
                <div className="flex items-center gap-1.5">
                  <StarRating rating={product.seller.rating} size={12} />
                  <span className="text-xs text-muted-foreground">{product.seller.rating}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="rounded-xl bg-white/[0.03] p-3">
                <p className="text-lg font-display font-bold">
                  {formatCompactNumber(product.seller.sales)}
                </p>
                <p className="text-xs text-muted-foreground">Vendas totais</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-3">
                <p className="text-lg font-display font-bold">98%</p>
                <p className="text-xs text-muted-foreground">Satisfação</p>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <Reveal>
            <h2 className="font-display font-bold text-2xl mb-8">Produtos relacionados</h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
