"use client";

import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./hero-canvas").then((m) => m.HeroCanvas), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-64 w-64 rounded-full bg-gradient-to-br from-neon-blue/30 to-neon-purple/30 blur-3xl animate-pulse-glow" />
    </div>
  ),
});

export function HeroScene() {
  return <HeroCanvas />;
}
