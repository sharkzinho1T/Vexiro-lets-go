import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i + 1 <= Math.round(rating);
        return (
          <Star
            key={i}
            size={size}
            className={cn(
              filled ? "fill-amber-400 text-amber-400" : "fill-white/10 text-white/10"
            )}
          />
        );
      })}
    </div>
  );
}
