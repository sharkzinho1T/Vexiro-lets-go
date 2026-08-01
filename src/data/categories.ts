export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  accentFrom: string;
  accentTo: string;
  productCount: number;
};

/**
 * NOTE: images below are high-quality gaming/tech stock photography
 * (royalty-free), used as placeholders. Official brand artwork (Roblox,
 * Minecraft, Free Fire, Valorant, Fortnite, League of Legends, Discord,
 * Steam, Xbox, PlayStation, Nintendo) is copyrighted — replace the `image`
 * field with your own licensed assets (e.g. from each brand's press kit)
 * before shipping to production. See README for the swap-in instructions.
 */
export const categories: Category[] = [
  {
    id: "roblox",
    name: "Roblox",
    slug: "roblox",
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#3b82ff",
    accentTo: "#22d3ee",
    productCount: 128,
  },
  {
    id: "minecraft",
    name: "Minecraft",
    slug: "minecraft",
    image:
      "https://images.unsplash.com/photo-1587573089734-599433d1b91d?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#22c55e",
    accentTo: "#3b82f6",
    productCount: 214,
  },
  {
    id: "free-fire",
    name: "Free Fire",
    slug: "free-fire",
    image:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#f97316",
    accentTo: "#a855f7",
    productCount: 96,
  },
  {
    id: "valorant",
    name: "Valorant",
    slug: "valorant",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#ef4444",
    accentTo: "#a855f7",
    productCount: 87,
  },
  {
    id: "fortnite",
    name: "Fortnite",
    slug: "fortnite",
    image:
      "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#a855f7",
    accentTo: "#3b82ff",
    productCount: 152,
  },
  {
    id: "lol",
    name: "League of Legends",
    slug: "league-of-legends",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#3b82f6",
    accentTo: "#a855f7",
    productCount: 143,
  },
  {
    id: "discord-nitro",
    name: "Discord Nitro",
    slug: "discord-nitro",
    image:
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#7c3aed",
    accentTo: "#3b82ff",
    productCount: 41,
  },
  {
    id: "steam",
    name: "Steam",
    slug: "steam",
    image:
      "https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#0ea5e9",
    accentTo: "#1e293b",
    productCount: 305,
  },
  {
    id: "xbox",
    name: "Xbox",
    slug: "xbox",
    image:
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#22c55e",
    accentTo: "#0ea5e9",
    productCount: 74,
  },
  {
    id: "playstation",
    name: "PlayStation",
    slug: "playstation",
    image:
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#3b82ff",
    accentTo: "#60a5fa",
    productCount: 98,
  },
  {
    id: "nintendo",
    name: "Nintendo",
    slug: "nintendo",
    image:
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#ef4444",
    accentTo: "#f97316",
    productCount: 63,
  },
  {
    id: "gift-cards",
    name: "Gift Cards",
    slug: "gift-cards",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#a855f7",
    accentTo: "#ec4899",
    productCount: 187,
  },
  {
    id: "contas",
    name: "Contas",
    slug: "contas",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#3b82ff",
    accentTo: "#7c3aed",
    productCount: 231,
  },
  {
    id: "itens",
    name: "Itens",
    slug: "itens",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#22d3ee",
    accentTo: "#3b82f6",
    productCount: 402,
  },
  {
    id: "servicos",
    name: "Serviços",
    slug: "servicos",
    image:
      "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=1200&auto=format&fit=crop",
    accentFrom: "#a855f7",
    accentTo: "#3b82ff",
    productCount: 56,
  },
];
