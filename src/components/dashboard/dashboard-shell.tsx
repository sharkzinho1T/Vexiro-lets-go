"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type DashboardTab = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export function DashboardShell({
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  children,
}: {
  title: string;
  subtitle: string;
  tabs: DashboardTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="container pt-32 pb-20">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-neon-blueSoft mb-2">{subtitle}</p>
        <h1 className="font-display font-bold text-3xl sm:text-4xl">{title}</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-28 h-fit">
          <nav className="glass rounded-2xl p-2 flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors text-left",
                    active ? "text-white" : "text-muted-foreground hover:text-white"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="dashboard-nav-active"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30"
                    />
                  )}
                  <tab.icon className="h-4 w-4 relative z-10 shrink-0" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div>{children}</div>
      </div>
    </div>
  );
}
