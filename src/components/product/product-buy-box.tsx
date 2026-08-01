"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Share2, ShieldCheck, Zap, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { StarRating } from "@/components/ui/star-rating";
import { formatPrice, formatCompactNumber, cn } from "@/lib/utils";
import type { Product } from "@/data/products";

export function ProductBuyBox({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [favorited, setFavorited] = useState(false);

  return (
    <GlassCard strong className="p-6 sm:p-8 h-fit">
      <h1 className="font-display font-bold text-2xl sm:text-3xl leading-tight">
        {product.title}
      </h1>

      <div className="flex items-center gap-3 mt-3">
        <StarRating rating={product.rating} />
        <span className="text-sm text-muted-foreground">
          {product.rating} ({formatCompactNumber(product.reviewCount)} avaliações) ·{" "}
          {formatCompactNumber(product.salesCount)} vendidos
        </span>
      </div>

      <div className="flex items-end gap-3 mt-6">
        {product.compareAtPrice && (
          <span className="text-lg text-muted-foreground line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
        <span className="font-display font-extrabold text-4xl text-gradient">
          {formatPrice(product.price)}
        </span>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03]">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-11 w-11 flex items-center justify-center hover:text-neon-blueSoft transition-colors"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="h-11 w-11 flex items-center justify-center hover:text-neon-blueSoft transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <Button size="lg" className="flex-1">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Comprar agora
        </Button>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setFavorited((v) => !v)}
        >
          <Heart className={cn("mr-2 h-4 w-4", favorited && "fill-red-500 text-red-500")} />
          {favorited ? "Favoritado" : "Favoritar"}
        </Button>
        <Button variant="outline" className="flex-1">
          <Share2 className="mr-2 h-4 w-4" />
          Compartilhar
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-xs text-muted-foreground">Compra 100% protegida</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-neon-blueSoft shrink-0" />
          <span className="text-xs text-muted-foreground">Entrega instantânea</span>
        </div>
      </div>
    </GlassCard>
  );
}
