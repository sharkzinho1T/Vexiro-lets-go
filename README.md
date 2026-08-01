# Vortex — Marketplace Gamer Premium

Marketplace completo (Next.js 15 + TypeScript + Tailwind + Framer Motion +
React Three Fiber + Prisma + Supabase + Auth.js) com tema dark/neon,
glassmorphism, hero 3D e painéis de vendedor/admin.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** + tema dark/neon customizado
- **Framer Motion** para animações e scroll reveal
- **Three.js + React Three Fiber + drei** para o hero 3D
- **Prisma** como ORM, **Supabase Postgres** como banco de dados
- **Supabase Storage** para upload de imagens de produtos
- **Auth.js (NextAuth)** com Google, Discord, GitHub e Credentials
- **shadcn/ui** (Radix + CVA) e **Lucide Icons**
- **Lenis** para smooth scroll
- **Recharts** para os gráficos dos dashboards

## 1. Instalação

```bash
npm install
```

## 2. Configurar o Supabase

1. Crie um projeto em https://supabase.com
2. Em **Project Settings → Database**, copie a *Connection string* (modo
   `Transaction` para `DATABASE_URL` com `pgbouncer=true`, e modo `Session`
   para `DIRECT_URL`).
3. Em **Project Settings → API**, copie `Project URL`, `anon public key` e
   `service_role key`.
4. Crie um bucket público chamado `product-images` em **Storage**.
5. Copie `.env.example` para `.env` e preencha todas as variáveis.

## 3. Criar as tabelas no Supabase

Você tem duas opções:

**Opção A — SQL Editor do Supabase (mais rápido, sem precisar de terminal):**
Abra `prisma/migrations/00000000000000_init/migration.sql`, copie todo o
conteúdo, cole em **Supabase → SQL Editor → New query** e clique em Run.
Isso cria todas as tabelas (`users`, `products`, `categories`, `orders`,
`reviews`, `favorites`, `reports`) e já insere as 15 categorias usadas no
front-end.

**Opção B — Prisma CLI (marca a migration como aplicada e sincroniza o
histórico do Prisma):**
```bash
npx prisma migrate resolve --applied 00000000000000_init
npx prisma generate
```
Se preferir gerenciar tudo pelo Prisma desde o início (sem usar o SQL
acima), apague a pasta `prisma/migrations` e rode:
```bash
npx prisma migrate dev --name init
```

## 4. Configurar login social (opcional)

No `.env`, preencha as credenciais OAuth de cada provedor (Google Cloud
Console, Discord Developer Portal, GitHub OAuth Apps) com a URL de callback:

```
https://SEU_DOMINIO/api/auth/callback/google
https://SEU_DOMINIO/api/auth/callback/discord
https://SEU_DOMINIO/api/auth/callback/github
```

## 5. Rodar localmente

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## 6. Deploy na Vercel

1. Suba este repositório para o GitHub.
2. Importe o projeto na Vercel.
3. Adicione todas as variáveis de `.env.example` nas *Environment Variables*
   do projeto na Vercel.
4. O comando de build já roda `prisma generate` automaticamente
   (`"build": "prisma generate && next build"`).
5. Deploy.

---

## ⚠️ Avisos importantes (leia antes de publicar)

Este projeto foi entregue com todas as telas e funcionalidades pedidas,
mas dois pontos exigem uma ação sua antes de ir para produção, por
envolverem propriedade intelectual de terceiros:

### Imagens de categorias (Roblox, Minecraft, Free Fire, Valorant, etc.)

As imagens usadas em `src/data/categories.ts` e `src/data/products.ts` são
fotos de banco de imagens (stock, royalty-free) usadas como placeholder de
alta qualidade — **não são artes ou logos oficiais das marcas**, pois
reproduzir esse material protegido por direitos autorais sem licença é
juridicamente arriscado.

**Como substituir:** baixe os assets oficiais no press kit/kit de mídia de
cada empresa (a maioria disponibiliza um para parceiros e imprensa), salve
em `/public/brands/`, e troque o campo `image` de cada categoria/produto
para apontar para o arquivo local, por exemplo:

```ts
image: "/brands/roblox-cover.jpg",
```

### Modelos 3D

Os modelos do hero (`src/components/three/vortex-core.tsx` e
`floating-icons.tsx`) são construídos com geometria primitiva do Three.js
(icosaedro, octaedro, cones, cilindros) estilizada com materiais físicos,
distorção e emissão — não são arquivos `.glb`/`.gltf` de uma caixa
misteriosa, controle ou PC gamer "reais", pois não há acesso a arquivos de
terceiros prontos neste ambiente.

**Como substituir por modelos reais:** compre ou baixe modelos `.glb` com
licença comercial (ex: Sketchfab, TurboSquid), coloque em `/public/models/`,
e troque o conteúdo de `vortex-core.tsx` por um `useGLTF("/models/seu-modelo.glb")`
do `@react-three/drei`.

## Estrutura de pastas

```
src/
  app/                  # rotas (App Router)
    login/ register/
    product/[slug]/ category/[slug]/
    dashboard/seller/ dashboard/admin/
    api/auth/ api/register/
  components/
    layout/             # navbar, footer, providers, smooth scroll
    three/               # cena 3D do hero
    ui/                  # botão, badge, input, glass card, etc (shadcn-style)
    category/ product/ sections/ dashboard/
  data/                 # mock data (categorias, produtos)
  lib/                  # prisma, supabase, auth, utils
prisma/
  schema.prisma
```

## Próximos passos sugeridos

- Conectar as páginas de produto/categoria e os dashboards às tabelas do
  Prisma (hoje usam dados mock em `src/data/` para renderização imediata).
- Implementar o checkout com um gateway de pagamento (Stripe, Mercado
  Pago, Pagar.me).
- Adicionar upload real de imagens no formulário de produto do vendedor,
  usando `uploadProductImage()` de `src/lib/supabase.ts`.
