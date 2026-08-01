import { GlassCard } from "@/components/ui/glass-card";
import { StarRating } from "@/components/ui/star-rating";

const mockReviews = [
  { name: "Lucas M.", rating: 5, comment: "Entrega instantânea, exatamente como prometido. Recomendo!" },
  { name: "Beatriz A.", rating: 5, comment: "Vendedor muito atencioso, processo super seguro." },
  { name: "Rafael S.", rating: 4, comment: "Tudo certo, só demorou alguns minutos a mais que o esperado." },
];

export function ProductReviews({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="space-y-4">
      <GlassCard className="p-6 flex items-center gap-6">
        <div className="text-center shrink-0">
          <p className="font-display font-extrabold text-4xl">{rating}</p>
          <StarRating rating={rating} />
          <p className="text-xs text-muted-foreground mt-1">{reviewCount} avaliações</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-3">{star}</span>
              <div className="h-1.5 flex-1 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                  style={{ width: star === Math.round(rating) ? "78%" : `${Math.max(4, (star / 5) * 20)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {mockReviews.map((review) => (
        <GlassCard key={review.name} className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-sm">{review.name}</p>
            <StarRating rating={review.rating} size={12} />
          </div>
          <p className="text-sm text-muted-foreground">{review.comment}</p>
        </GlassCard>
      ))}
    </div>
  );
}
