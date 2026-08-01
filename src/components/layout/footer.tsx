import Link from "next/link";
import { Twitch, Instagram, Youtube, MessageCircle } from "lucide-react";

const columns = [
  {
    title: "Marketplace",
    links: ["Categorias", "Produtos em alta", "Vender", "Programa de afiliados"],
  },
  {
    title: "Suporte",
    links: ["Central de ajuda", "Segurança", "Política de reembolso", "Fale conosco"],
  },
  {
    title: "Empresa",
    links: ["Sobre a Vortex", "Carreiras", "Termos de uso", "Privacidade"],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.06]">
      <div className="absolute inset-0 bg-mesh-1 opacity-40 pointer-events-none" />
      <div className="container relative py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple" />
                <div className="absolute inset-[2px] rounded-[6px] bg-void-100 flex items-center justify-center">
                  <span className="text-xs font-display font-bold text-gradient">V</span>
                </div>
              </div>
              <span className="font-display font-bold text-lg">Vortex</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              O marketplace gamer premium para comprar e vender contas, moedas,
              gift cards e itens com total segurança e entrega instantânea.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Twitch, Instagram, Youtube, MessageCircle].map((Icon, i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full glass flex items-center justify-center hover:border-neon-blue/50 hover:shadow-glow-blue transition-all cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                </div>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-sm mb-4 text-white/90">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Vortex Marketplace. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Feito com performance, segurança e obsessão por detalhes.
          </p>
        </div>
      </div>
    </footer>
  );
}
