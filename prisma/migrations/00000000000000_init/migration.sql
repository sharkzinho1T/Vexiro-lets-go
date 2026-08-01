-- Vortex — Migration inicial
-- Cole este script inteiro no Supabase: Project > SQL Editor > New query > Run
-- Ele cria todas as tabelas, enums, índices e chaves estrangeiras usadas pelo schema.prisma

-- Enums
CREATE TYPE "Role" AS ENUM ('BUYER', 'SELLER', 'ADMIN');
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'DELIVERED', 'DISPUTED', 'REFUNDED', 'CANCELLED');
CREATE TYPE "ReportStatus" AS ENUM ('OPEN', 'REVIEWING', 'RESOLVED', 'DISMISSED');

-- users
CREATE TABLE "users" (
  "id" TEXT NOT NULL,
  "name" TEXT,
  "email" TEXT NOT NULL,
  "emailVerified" TIMESTAMP(3),
  "image" TEXT,
  "password" TEXT,
  "role" "Role" NOT NULL DEFAULT 'BUYER',
  "balance" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "bio" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- accounts (NextAuth)
CREATE TABLE "accounts" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- sessions (NextAuth)
CREATE TABLE "sessions" (
  "id" TEXT NOT NULL,
  "sessionToken" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- verification_tokens (NextAuth)
CREATE TABLE "verification_tokens" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL
);
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- categories
CREATE TABLE "categories" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT,
  "coverImage" TEXT NOT NULL,
  "accentFrom" TEXT NOT NULL DEFAULT '#3b82ff',
  "accentTo" TEXT NOT NULL DEFAULT '#a855f7',
  "order" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- products
CREATE TABLE "products" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "price" DECIMAL(12,2) NOT NULL,
  "compareAtPrice" DECIMAL(12,2),
  "images" TEXT[],
  "stock" INTEGER NOT NULL DEFAULT 1,
  "salesCount" INTEGER NOT NULL DEFAULT 0,
  "rating" DECIMAL(2,1) NOT NULL DEFAULT 0,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "status" TEXT NOT NULL DEFAULT 'ACTIVE',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "categoryId" TEXT NOT NULL,
  "sellerId" TEXT NOT NULL,
  CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
CREATE INDEX "products_categoryId_idx" ON "products"("categoryId");
CREATE INDEX "products_sellerId_idx" ON "products"("sellerId");
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "products" ADD CONSTRAINT "products_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- orders
CREATE TABLE "orders" (
  "id" TEXT NOT NULL,
  "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
  "total" DECIMAL(12,2) NOT NULL,
  "quantity" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "productId" TEXT NOT NULL,
  "buyerId" TEXT NOT NULL,
  CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "orders_buyerId_idx" ON "orders"("buyerId");
CREATE INDEX "orders_productId_idx" ON "orders"("productId");
ALTER TABLE "orders" ADD CONSTRAINT "orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- reviews
CREATE TABLE "reviews" (
  "id" TEXT NOT NULL,
  "rating" INTEGER NOT NULL,
  "comment" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "productId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "reviews_productId_idx" ON "reviews"("productId");
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- favorites
CREATE TABLE "favorites" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "userId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "favorites_userId_productId_key" ON "favorites"("userId", "productId");
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- reports
CREATE TABLE "reports" (
  "id" TEXT NOT NULL,
  "reason" TEXT NOT NULL,
  "details" TEXT,
  "status" "ReportStatus" NOT NULL DEFAULT 'OPEN',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "reporterId" TEXT NOT NULL,
  "targetId" TEXT NOT NULL,
  CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "reports" ADD CONSTRAINT "reports_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "reports" ADD CONSTRAINT "reports_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Seed inicial das categorias (mesmos slugs usados no front-end)
INSERT INTO "categories" ("id", "name", "slug", "coverImage", "accentFrom", "accentTo", "order") VALUES
('cat_roblox', 'Roblox', 'roblox', 'https://images.unsplash.com/photo-1611996575749-79a3a250f948', '#3b82ff', '#22d3ee', 1),
('cat_minecraft', 'Minecraft', 'minecraft', 'https://images.unsplash.com/photo-1587573089734-599433d1b91d', '#22c55e', '#3b82f6', 2),
('cat_freefire', 'Free Fire', 'free-fire', 'https://images.unsplash.com/photo-1560253023-3ec5d502959f', '#f97316', '#a855f7', 3),
('cat_valorant', 'Valorant', 'valorant', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', '#ef4444', '#a855f7', 4),
('cat_fortnite', 'Fortnite', 'fortnite', 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa', '#a855f7', '#3b82ff', 5),
('cat_lol', 'League of Legends', 'league-of-legends', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', '#3b82f6', '#a855f7', 6),
('cat_discord', 'Discord Nitro', 'discord-nitro', 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff', '#7c3aed', '#3b82ff', 7),
('cat_steam', 'Steam', 'steam', 'https://images.unsplash.com/photo-1616763355603-9755a640a287', '#0ea5e9', '#1e293b', 8),
('cat_xbox', 'Xbox', 'xbox', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d', '#22c55e', '#0ea5e9', 9),
('cat_playstation', 'PlayStation', 'playstation', 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e', '#3b82ff', '#60a5fa', 10),
('cat_nintendo', 'Nintendo', 'nintendo', 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e', '#ef4444', '#f97316', 11),
('cat_giftcards', 'Gift Cards', 'gift-cards', 'https://images.unsplash.com/photo-1607344645866-009c320b63e0', '#a855f7', '#ec4899', 12),
('cat_contas', 'Contas', 'contas', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', '#3b82ff', '#7c3aed', 13),
('cat_itens', 'Itens', 'itens', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853', '#22d3ee', '#3b82f6', 14),
('cat_servicos', 'Serviços', 'servicos', 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d', '#a855f7', '#3b82ff', 15);
