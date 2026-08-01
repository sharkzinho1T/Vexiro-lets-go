export type Product = {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  salesCount: number;
  seller: { name: string; avatar: string; rating: number; sales: number };
  description: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "1000-robux-entrega-instantanea",
    title: "1000 Robux — Entrega Instantânea",
    categorySlug: "roblox",
    price: 39.9,
    compareAtPrice: 49.9,
    image:
      "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 812,
    salesCount: 3210,
    seller: {
      name: "NovaStore",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
      rating: 4.9,
      sales: 12400,
    },
    description:
      "Recarga de 1000 Robux com entrega automática direto na sua conta. Processo 100% seguro, sem necessidade de senha.",
    featured: true,
  },
  {
    id: "p2",
    slug: "minecraft-java-bedrock-conta-premium",
    title: "Conta Minecraft Java + Bedrock (Migrada)",
    categorySlug: "minecraft",
    price: 54.9,
    image:
      "https://images.unsplash.com/photo-1587573089734-599433d1b91d?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587573089734-599433d1b91d?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 431,
    salesCount: 1520,
    seller: {
      name: "BlockTrade",
      avatar: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=200&auto=format&fit=crop",
      rating: 4.8,
      sales: 8900,
    },
    description:
      "Conta original migrada para Microsoft, acesso total, com garantia de troca em caso de recuperação.",
    featured: true,
  },
  {
    id: "p3",
    slug: "diamantes-free-fire-mega-pack",
    title: "Free Fire — Mega Pack de Diamantes",
    categorySlug: "free-fire",
    price: 29.9,
    compareAtPrice: 34.9,
    image:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.7,
    reviewCount: 1204,
    salesCount: 5310,
    seller: {
      name: "GameVault",
      avatar: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=200&auto=format&fit=crop",
      rating: 4.7,
      sales: 21000,
    },
    description: "Pacote de diamantes com entrega direto no ID do jogador, sem necessidade de login.",
  },
  {
    id: "p4",
    slug: "valorant-points-skin-bundle",
    title: "Valorant Points + Bundle Exclusivo",
    categorySlug: "valorant",
    price: 89.9,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 356,
    salesCount: 980,
    seller: {
      name: "RiftMarket",
      avatar: "https://images.unsplash.com/photo-1614851099511-773084f6911d?q=80&w=200&auto=format&fit=crop",
      rating: 4.9,
      sales: 6700,
    },
    description: "VP para desbloquear o bundle mais recente, entrega manual verificada em até 15 minutos.",
    featured: true,
  },
  {
    id: "p5",
    slug: "fortnite-v-bucks-2800",
    title: "2800 V-Bucks — Fortnite",
    categorySlug: "fortnite",
    price: 74.9,
    image:
      "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.6,
    reviewCount: 592,
    salesCount: 2110,
    seller: {
      name: "LootForge",
      avatar: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=200&auto=format&fit=crop",
      rating: 4.6,
      sales: 9800,
    },
    description: "Créditos de V-Bucks para loja de itens, skins e passe de batalha.",
  },
  {
    id: "p6",
    slug: "discord-nitro-1-mes",
    title: "Discord Nitro — 1 Mês",
    categorySlug: "discord-nitro",
    price: 19.9,
    image:
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 5.0,
    reviewCount: 2044,
    salesCount: 9410,
    seller: {
      name: "NitroPlus",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200&auto=format&fit=crop",
      rating: 5.0,
      sales: 34200,
    },
    description: "Ativação oficial via link de presente, válida em qualquer conta Discord.",
    featured: true,
  },
  {
    id: "p7",
    slug: "steam-wallet-code-100",
    title: "Steam Wallet Code — R$100",
    categorySlug: "steam",
    price: 99.9,
    image:
      "https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 763,
    salesCount: 3020,
    seller: {
      name: "CodeHub",
      avatar: "https://images.unsplash.com/photo-1618609377864-68609b857e90?q=80&w=200&auto=format&fit=crop",
      rating: 4.9,
      sales: 15400,
    },
    description: "Código digital para carteira Steam, ativação imediata na sua região.",
  },
  {
    id: "p8",
    slug: "controle-gamer-sem-fio-pro",
    title: "Controle Gamer Sem Fio Pro",
    categorySlug: "itens",
    price: 249.9,
    compareAtPrice: 299.9,
    image:
      "https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 289,
    salesCount: 640,
    seller: {
      name: "TechArena",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=200&auto=format&fit=crop",
      rating: 4.8,
      sales: 3100,
    },
    description: "Controle sem fio com resposta ultra rápida, bateria de longa duração e grip antiderrapante.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, categorySlug: string, limit = 4) {
  return products
    .filter((p) => p.categorySlug === categorySlug && p.slug !== slug)
    .slice(0, limit);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
