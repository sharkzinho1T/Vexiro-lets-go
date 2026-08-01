import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  positive = true,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  positive?: boolean;
}) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
          <Icon className="h-5 w-5 text-neon-blueSoft" />
        </div>
        {trend && (
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              positive ? "text-emerald-400" : "text-red-400"
            )}
          >
            {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend}
          </span>
        )}
      </div>
      <p className="font-display font-bold text-2xl">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </GlassCard>
  );
}
