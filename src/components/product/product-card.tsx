"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Flame } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";
import { formatPrice, formatCompactNumber, cn } from "@/lib/utils";
import type { Product } from "@/data/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl glass overflow-hidden hover:border-neon-blue/40 hover:shadow-glow-blue transition-all duration-300"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {product.compareAtPrice && (
            <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-2.5 py-1 text-[11px] font-bold text-white">
              <Flame className="h-3 w-3" /> OFERTA
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              setFavorited((v) => !v);
            }}
            className="absolute top-3 right-3 h-8 w-8 rounded-full glass-strong flex items-center justify-center transition-transform hover:scale-110"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                favorited ? "fill-red-500 text-red-500" : "text-white"
              )}
            />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative h-5 w-5 rounded-full overflow-hidden shrink-0">
              <Image src={product.seller.avatar} alt={product.seller.name} fill className="object-cover" />
            </div>
            <span className="text-xs text-muted-foreground truncate">{product.seller.name}</span>
          </div>

          <h3 className="font-semibold text-sm leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-neon-blueSoft transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center gap-1.5 mt-2">
            <StarRating rating={product.rating} size={12} />
            <span className="text-xs text-muted-foreground">
              {product.rating} · {formatCompactNumber(product.salesCount)} vendidos
            </span>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div>
              {product.compareAtPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </p>
              )}
              <p className="font-display font-bold text-lg text-gradient">
                {formatPrice(product.price)}
              </p>
            </div>
            <button className="h-9 w-9 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center shadow-glow-blue hover:scale-110 transition-transform">
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
