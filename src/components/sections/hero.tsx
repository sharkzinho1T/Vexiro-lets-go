"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Compass, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import { HeroScene } from "@/components/three/hero-scene";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-glow pointer-events-none" />

      <motion.div style={{ y: sceneY }} className="absolute inset-0 lg:right-[-8%]">
        <HeroScene />
      </motion.div>

      <div className="container relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 min-h-[70vh]">
        <motion.div style={{ y: textY, opacity }} className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/80">+120 mil entregas instantâneas este mês</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight"
          >
            O marketplace{" "}
            <span className="text-gradient">gamer</span> do futuro.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Compre e venda contas, moedas, gift cards e itens dos maiores
            jogos do mundo. Entrega instantânea, pagamento protegido e uma
            experiência premium do início ao fim.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button size="lg" className="group">
              Comprar agora
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="group">
              <Compass className="mr-2 h-4 w-4" />
              Explorar categorias
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { icon: ShieldCheck, label: "Compra protegida" },
              { icon: Zap, label: "Entrega instantânea" },
              { icon: TrendingUp, label: "Preços justos" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-start gap-2">
                <Icon className="h-5 w-5 text-neon-blueSoft" />
                <span className="text-xs text-muted-foreground leading-tight">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
          Role para explorar
        </span>
        <div className="h-9 w-5 rounded-full border border-white/20 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-neon-blue"
          />
        </div>
      </motion.div>
    </section>
  );
}
