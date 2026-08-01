import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vortex.market";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vortex — Marketplace Gamer Premium",
    template: "%s · Vortex",
  },
  description:
    "Compre e venda contas, moedas, gift cards e itens dos maiores jogos do mundo em um marketplace premium, seguro e instantâneo.",
  keywords: [
    "vortex",
    "marketplace gamer",
    "robux",
    "v-bucks",
    "gift cards",
    "contas de jogos",
    "diamantes free fire",
    "valorant points",
  ],
  authors: [{ name: "Vortex" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Vortex",
    title: "Vortex — Marketplace Gamer Premium",
    description:
      "Compre e venda contas, moedas, gift cards e itens dos maiores jogos do mundo em um marketplace premium, seguro e instantâneo.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vortex Marketplace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vortex — Marketplace Gamer Premium",
    description: "O marketplace gamer mais premium da internet.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans noise-overlay overflow-x-hidden">
        <Providers>
          <SmoothScroll />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
