import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function CtaSeller() {
  return (
    <section id="suporte" className="container py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl glass-strong px-8 py-16 text-center sm:px-16">
          <div className="absolute inset-0 bg-mesh-1 opacity-60" />
          <div className="relative">
            <h2 className="font-display font-bold text-3xl sm:text-5xl max-w-2xl mx-auto leading-tight">
              Transforme seus itens em{" "}
              <span className="text-gradient">dinheiro real</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-lg mx-auto">
              Crie sua loja na Vortex em minutos e comece a vender para
              milhões de jogadores com total segurança.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/dashboard/seller">
                  Começar a vender
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/register">Criar conta grátis</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
