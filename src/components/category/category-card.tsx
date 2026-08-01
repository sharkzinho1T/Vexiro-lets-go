"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/data/categories";

export function CategoryCard({ category, index }: { category: Category; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        href={`/category/${category.slug}`}
        className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.08]"
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-500 group-hover:from-black/95" />

        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 100%, ${category.accentFrom}33, transparent 70%)`,
          }}
        />

        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-xs text-white/60 mb-1">{category.productCount} produtos</p>
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-white text-lg leading-tight">
              {category.name}
            </h3>
            <div className="h-8 w-8 rounded-full glass flex items-center justify-center opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-colors duration-500" />
      </Link>
    </motion.div>
  );
}
