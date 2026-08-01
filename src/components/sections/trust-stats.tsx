import { ShieldCheck, Users, Package, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";

const stats = [
  { icon: Users, value: "2.4M+", label: "Usuários ativos" },
  { icon: Package, value: "18M+", label: "Produtos entregues" },
  { icon: ShieldCheck, value: "99,8%", label: "Compras protegidas" },
  { icon: Clock, value: "< 5 min", label: "Tempo médio de entrega" },
];

export function TrustStats() {
  return (
    <section className="container py-24">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <GlassCard className="p-6 h-full hover:border-neon-blue/30 transition-colors">
              <stat.icon className="h-6 w-6 text-neon-blueSoft mb-4" />
              <p className="font-display font-bold text-2xl sm:text-3xl">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
