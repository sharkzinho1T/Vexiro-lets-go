"use client";

import { useState } from "react";
import { SlidersHorizontal, ArrowDownUp } from "lucide-react";
import { cn } from "@/lib/utils";

const sortOptions = ["Mais vendidos", "Menor preço", "Maior preço", "Melhor avaliados"];

export function CategoryFilters() {
  const [active, setActive] = useState(sortOptions[0]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {sortOptions.map((option) => (
          <button
            key={option}
            onClick={() => setActive(option)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-medium transition-all border",
              active === option
                ? "bg-gradient-to-r from-neon-blue to-neon-purple border-transparent text-white shadow-glow-blue"
                : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-white"
            )}
          >
            {option}
          </button>
        ))}
      </div>
      <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-muted-foreground hover:text-white transition-colors">
        <SlidersHorizontal className="h-3.5 w-3.5" />
        Filtros
        <ArrowDownUp className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
