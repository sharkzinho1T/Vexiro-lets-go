"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Wallet,
  Star,
  Plus,
  Pencil,
  Trash2,
  UploadCloud,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { DashboardShell, type DashboardTab } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { products as mockProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const tabs: DashboardTab[] = [
  { id: "overview", label: "Visão geral", icon: LayoutDashboard },
  { id: "products", label: "Produtos", icon: Package },
  { id: "orders", label: "Pedidos", icon: ShoppingCart },
  { id: "reviews", label: "Avaliações", icon: Star },
  { id: "balance", label: "Saldo", icon: Wallet },
];

const salesData = [
  { day: "Seg", vendas: 320 },
  { day: "Ter", vendas: 480 },
  { day: "Qua", vendas: 410 },
  { day: "Qui", vendas: 610 },
  { day: "Sex", vendas: 590 },
  { day: "Sáb", vendas: 720 },
  { day: "Dom", vendas: 680 },
];

const mockOrders = [
  { id: "#VX-8821", product: "1000 Robux — Entrega Instantânea", buyer: "João P.", status: "Entregue", total: 39.9 },
  { id: "#VX-8822", product: "Discord Nitro — 1 Mês", buyer: "Marina L.", status: "Pendente", total: 19.9 },
  { id: "#VX-8823", product: "Steam Wallet Code — R$100", buyer: "Carlos E.", status: "Entregue", total: 99.9 },
  { id: "#VX-8824", product: "Valorant Points + Bundle", buyer: "Ana C.", status: "Disputa", total: 89.9 },
];

const statusVariant: Record<string, "success" | "warning" | "destructive"> = {
  Entregue: "success",
  Pendente: "warning",
  Disputa: "destructive",
};

export default function SellerDashboardPage() {
  const [active, setActive] = useState("overview");

  return (
    <DashboardShell
      title="Painel do vendedor"
      subtitle="Sua loja"
      tabs={tabs}
      activeTab={active}
      onTabChange={setActive}
    >
      {active === "overview" && <OverviewTab />}
      {active === "products" && <ProductsTab />}
      {active === "orders" && <OrdersTab />}
      {active === "reviews" && <ReviewsTab />}
      {active === "balance" && <BalanceTab />}
    </DashboardShell>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={DollarSign} label="Faturamento (mês)" value={formatPrice(18420)} trend="+12,4%" />
        <StatCard icon={ShoppingCart} label="Pedidos" value="342" trend="+8,1%" />
        <StatCard icon={Users} label="Novos clientes" value="128" trend="+4,6%" />
        <StatCard icon={Star} label="Avaliação média" value="4,9" trend="+0,2" />
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-semibold text-lg">Vendas na semana</h3>
          <Badge variant="outline">Últimos 7 dias</Badge>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "#0d0d14",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="vendas"
                stroke="#3b82ff"
                strokeWidth={2.5}
                dot={{ fill: "#a855f7", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}

function ProductsTab() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Seus produtos</h3>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo produto
        </Button>
      </div>

      {showForm && <ProductForm onClose={() => setShowForm(false)} />}

      <div className="grid grid-cols-1 gap-4">
        {mockProducts.slice(0, 5).map((product) => (
          <GlassCard key={product.id} className="p-4 flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-xl overflow-hidden shrink-0">
              <Image src={product.image} alt={product.title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{product.title}</p>
              <p className="text-xs text-muted-foreground">
                {formatPrice(product.price)} · {product.salesCount} vendidos
              </p>
            </div>
            <Badge variant="success">Ativo</Badge>
            <div className="flex items-center gap-2">
              <button className="h-9 w-9 rounded-full glass flex items-center justify-center hover:text-neon-blueSoft transition-colors">
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button className="h-9 w-9 rounded-full glass flex items-center justify-center hover:text-red-400 transition-colors">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function ProductForm({ onClose }: { onClose: () => void }) {
  return (
    <GlassCard strong className="p-6 border-glow">
      <h4 className="font-display font-semibold mb-4">Cadastrar produto</h4>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" placeholder="Ex: 1000 Robux — Entrega instantânea" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input id="price" type="number" step="0.01" placeholder="39.90" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="stock">Estoque</Label>
          <Input id="stock" type="number" placeholder="100" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Imagens (upload múltiplo)</Label>
          <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 py-10 cursor-pointer hover:border-neon-blue/50 transition-colors">
            <UploadCloud className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Arraste imagens ou clique para enviar (Supabase Storage)
            </span>
            <input type="file" multiple accept="image/*" className="hidden" />
          </label>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6">
        <Button onClick={onClose}>Salvar produto</Button>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </GlassCard>
  );
}

function OrdersTab() {
  return (
    <GlassCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-muted-foreground">
              <th className="p-4 font-medium">Pedido</th>
              <th className="p-4 font-medium">Produto</th>
              <th className="p-4 font-medium">Comprador</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4 text-muted-foreground max-w-[220px] truncate">{order.product}</td>
                <td className="p-4">{order.buyer}</td>
                <td className="p-4">
                  <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                </td>
                <td className="p-4 text-right font-semibold">{formatPrice(order.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

function ReviewsTab() {
  const reviews = [
    { name: "João P.", rating: 5, comment: "Melhor vendedor, entrega rapidíssima!" },
    { name: "Marina L.", rating: 5, comment: "Tudo perfeito, super recomendo." },
    { name: "Carlos E.", rating: 4, comment: "Bom atendimento, só demorou um pouco." },
  ];

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <GlassCard key={review.name} className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-sm">{review.name}</p>
            <StarRating rating={review.rating} size={12} />
          </div>
          <p className="text-sm text-muted-foreground">{review.comment}</p>
        </GlassCard>
      ))}
    </div>
  );
}

function BalanceTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Wallet} label="Saldo disponível" value={formatPrice(4820.5)} />
        <StatCard icon={TrendingUp} label="A liberar" value={formatPrice(1230.0)} />
        <StatCard icon={DollarSign} label="Total sacado" value={formatPrice(52100.0)} />
      </div>
      <GlassCard className="p-6">
        <h4 className="font-display font-semibold mb-4">Solicitar saque</h4>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input placeholder="Valor a sacar (R$)" type="number" className="sm:max-w-xs" />
          <Button>Solicitar saque via Pix</Button>
        </div>
      </GlassCard>
    </div>
  );
}
