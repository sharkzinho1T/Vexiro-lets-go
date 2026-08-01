"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/ui/glass-card";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? "Não foi possível criar sua conta.");
      }

      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-1 opacity-70 pointer-events-none" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-neon-purple/20 blur-[120px]" />

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
            <h1 className="font-display font-bold text-2xl">Crie sua conta</h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Junte-se a milhões de jogadores na Vortex
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="name" name="name" placeholder="Seu nome" className="pl-10" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" name="email" type="email" placeholder="voce@email.com" className="pl-10" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" name="password" type="password" placeholder="Mínimo 8 caracteres" className="pl-10" minLength={8} required />
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar conta"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-neon-blueSoft font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
