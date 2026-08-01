"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { Github, Chrome, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/ui/glass-card";

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.3 4.4A19.7 19.7 0 0 0 15.7 3c-.2.4-.5 1-.6 1.4a18.3 18.3 0 0 0-6.2 0A9 9 0 0 0 8.3 3a19.6 19.6 0 0 0-4.6 1.4C1.4 8.6.7 12.6 1 16.6a19.9 19.9 0 0 0 6 3c.5-.7.9-1.4 1.3-2.2-.7-.3-1.4-.6-2-1l.5-.4c3.9 1.8 8.1 1.8 12 0l.5.4c-.6.4-1.3.7-2 1 .4.8.8 1.5 1.3 2.2a19.8 19.8 0 0 0 6-3c.4-4.6-.7-8.6-3.3-12.2ZM8.7 14.1c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2c0 1.1-.8 2-1.8 2Zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2c0 1.1-.8 2-1.8 2Z" />
    </svg>
  );
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/",
    });
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-1 opacity-70 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-neon-blue/20 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <GlassCard strong className="p-8 sm:p-10 border-glow">
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-4 shadow-glow-blue">
              <span className="font-display font-bold text-lg">V</span>
            </div>
            <h1 className="font-display font-bold text-2xl">Bem-vindo de volta</h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Entre para continuar comprando e vendendo na Vortex
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-11 w-full"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <Chrome className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-11 w-full"
              onClick={() => signIn("discord", { callbackUrl: "/" })}
            >
              <DiscordIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-11 w-full"
              onClick={() => signIn("github", { callbackUrl: "/" })}
            >
              <Github className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-muted-foreground">ou continue com email</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" name="email" type="email" placeholder="voce@email.com" className="pl-10" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="/login/forgot-password" className="text-xs text-neon-blueSoft hover:underline">
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" name="password" type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-neon-blueSoft font-medium hover:underline">
              Cadastre-se grátis
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
