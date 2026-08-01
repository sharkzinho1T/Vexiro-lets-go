"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  User,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Categorias", href: "/#categorias" },
  { label: "Produtos", href: "/#produtos" },
  { label: "Vender", href: "/dashboard/seller" },
  { label: "Suporte", href: "/#suporte" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "container flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500",
          scrolled ? "glass-strong border-glow" : "bg-transparent"
        )}
      >
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple animate-pulse-glow" />
            <div className="absolute inset-[2px] rounded-[6px] bg-void-100 flex items-center justify-center">
              <span className="text-xs font-display font-bold text-gradient">V</span>
            </div>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Vortex
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-neon-blue transition-colors" />
            <input
              type="text"
              placeholder="Buscar jogos, contas, itens..."
              className="w-full rounded-full bg-white/[0.05] border border-white/10 py-2 pl-9 pr-4 text-sm outline-none focus:border-neon-blue/60 focus:bg-white/[0.08] transition-all placeholder:text-muted-foreground/70"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/5 transition-colors">
            <Heart className="h-[18px] w-[18px]" />
          </button>
          <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/5 transition-colors relative">
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple text-[10px] flex items-center justify-center font-semibold">
              2
            </span>
          </button>

          {session ? (
            <UserMenu name={session.user?.name} role={session.user?.role} />
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-neon-blue to-neon-purple px-5 py-2 text-sm font-semibold shadow-glow-blue hover:shadow-glow-purple transition-shadow"
            >
              Entrar
            </Link>
          )}

          <button
            className="lg:hidden h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/5"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="container mt-2 lg:hidden"
          >
            <div className="glass-strong rounded-2xl p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-3 rounded-lg text-sm hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {!session && (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 text-center rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple py-2.5 text-sm font-semibold"
                >
                  Entrar
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function UserMenu({ name, role }: { name?: string | null; role?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/10 pl-2 pr-3 py-1.5 hover:bg-white/[0.08] transition-colors"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
          <User className="h-3.5 w-3.5" />
        </div>
        <span className="text-sm max-w-[80px] truncate">{name ?? "Conta"}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 glass-strong rounded-xl p-2 shadow-glow-soft"
          >
            <Link
              href="/dashboard/seller"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/5"
            >
              <LayoutDashboard className="h-4 w-4" /> Painel do vendedor
            </Link>
            {role === "ADMIN" && (
              <Link
                href="/dashboard/admin"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/5"
              >
                <LayoutDashboard className="h-4 w-4" /> Painel admin
              </Link>
            )}
            <button
              onClick={() => signOut()}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10"
            >
              Sair
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
