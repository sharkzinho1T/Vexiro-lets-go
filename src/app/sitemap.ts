import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vortex.market";

  const staticRoutes = ["", "/login", "/register"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.6,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${siteUrl}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
