"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div>
      <div
        className="relative aspect-square rounded-2xl overflow-hidden glass cursor-zoom-in group"
        onClick={() => setZoomed((v) => !v)}
      >
        <motion.div
          animate={{ scale: zoomed ? 1.5 : 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full"
        >
          <Image
            src={images[active]}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute bottom-4 right-4 h-9 w-9 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="h-4 w-4" />
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => {
                setActive(i);
                setZoomed(false);
              }}
              className={cn(
                "relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-colors shrink-0",
                active === i ? "border-neon-blue" : "border-white/10"
              )}
            >
              <Image src={img} alt={`${title} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
