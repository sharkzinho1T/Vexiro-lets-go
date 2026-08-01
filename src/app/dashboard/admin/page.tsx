"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Tags,
  Store,
  Flag,
  Landmark,
  Ban,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { DashboardShell, type DashboardTab } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/utils";

const tabs: DashboardTab[] = [
  { id: "overview", label: "Visão geral", icon: LayoutDashboard },
  { id: "users", label: "Usuários", icon: Users },
  { id: "products", label: "Produtos", icon: Package },
  { id: "orders", label: "Pedidos", icon: ShoppingCart },
  { id: "categories", label: "Categorias", icon: Tags },
  { id: "sellers", label: "Vendedores", icon: Store },
  { id: "reports", label: "Denúncias", icon: Flag },
  { id: "finance", label: "Financeiro", icon: Landmark },
];

const revenueData = [
  { month: "Jan", receita: 42000 },
  { month: "Fev", receita: 51000 },
  { month: "Mar", receita: 48000 },
  { month: "Abr", receita: 62000 },
  { month: "Mai", receita: 71000 },
  { month: "Jun", receita: 68000 },
];

const mockUsers = [
  { name: "João Pedro", email: "joao@email.com", role: "Comprador", status: "Ativo" },
  { name: "NovaStore", email: "nova@email.com", role: "Vendedor", status: "Ativo" },
  { name: "Marina Lopes", email: "marina@email.com", role: "Comprador", status: "Suspenso" },
  { name: "GameVault", email: "vault@email.com", role: "Vendedor", status: "Ativo" },
];

const mockReports = [
  { id: "#RPT-201", target: "TechArena", reason: "Produto não entregue", status: "Aberta" },
  { id: "#RPT-202", target: "LootForge", reason: "Descrição enganosa", status: "Em análise" },
  { id: "#RPT-203", target: "CodeHub", reason: "Cobrança duplicada", status: "Resolvida" },
];

export default function AdminDashboardPage() {
  const [active, setActive] = useState("overview");

  return (
    <DashboardShell
      title="Painel administrativo"
      subtitle="Vortex Admin"
      tabs={tabs}
      activeTab={active}
      onTabChange={setActive}
    >
      {active === "overview" && <AdminOverview />}
      {active === "users" && <UsersTab />}
      {active === "products" && <AdminProductsTab />}
      {active === "orders" && <AdminOrdersTab />}
      {active === "categories" && <CategoriesTab />}
      {active === "sellers" && <SellersTab />}
      {active === "reports" && <ReportsTab />}
      {active === "finance" && <FinanceTab />}
    </DashboardShell>
  );
}

function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users} label="Usuários totais" value="2,4M" trend="+3,2%" />
        <StatCard icon={Store} label="Vendedores ativos" value="18.240" trend="+5,8%" />
        <StatCard icon={Package} label="Produtos listados" value="412K" trend="+2,1%" />
        <StatCard icon={DollarSign} label="GMV (mês)" value={formatPrice(3400000)} trend="+9,4%" />
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-semibold text-lg">Receita da plataforma</h3>
          <Badge variant="outline">Últimos 6 meses</Badge>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "#0d0d14",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="receita" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82ff" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}

function UsersTab() {
  return (
    <GlassCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-muted-foreground">
              <th className="p-4 font-medium">Nome</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Função</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.email} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-muted-foreground">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <Badge variant={user.status === "Ativo" ? "success" : "destructive"}>
                    {user.status}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <button className="h-8 w-8 rounded-full glass inline-flex items-center justify-center hover:text-red-400 transition-colors">
                    <Ban className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

function AdminProductsTab() {
  return (
    <GlassCard className="p-6">
      <p className="text-sm text-muted-foreground">
        Gerencie todos os produtos da plataforma: aprovação, remoção e
        destaque de listagens. Conectado ao model <code>Product</code> via
        Prisma — liste, filtre por status e modere em massa.
      </p>
    </GlassCard>
  );
}

function AdminOrdersTab() {
  return (
    <GlassCard className="p-6">
      <p className="text-sm text-muted-foreground">
        Visão global de todos os pedidos da plataforma, com filtros por
        status (pendente, pago, entregue, disputado, reembolsado) e busca
        por comprador, vendedor ou ID do pedido.
      </p>
    </GlassCard>
  );
}

function CategoriesTab() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {categories.map((category) => (
        <GlassCard key={category.id} className="p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">{category.name}</p>
            <p className="text-xs text-muted-foreground">{category.productCount} produtos</p>
          </div>
          <Badge variant="outline">Ativa</Badge>
        </GlassCard>
      ))}
    </div>
  );
}

function SellersTab() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {["NovaStore", "BlockTrade", "GameVault", "RiftMarket"].map((seller) => (
        <GlassCard key={seller} className="p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">{seller}</p>
            <p className="text-xs text-muted-foreground">Verificado · 4.9 ★</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 w-8 rounded-full glass flex items-center justify-center hover:text-emerald-400 transition-colors">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </button>
            <button className="h-8 w-8 rounded-full glass flex items-center justify-center hover:text-red-400 transition-colors">
              <Ban className="h-3.5 w-3.5" />
            </button>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

function ReportsTab() {
  return (
    <div className="space-y-4">
      {mockReports.map((report) => (
        <GlassCard key={report.id} className="p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-sm">
              {report.id} · {report.target}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{report.reason}</p>
          </div>
          <Badge
            variant={
              report.status === "Resolvida"
                ? "success"
                : report.status === "Em análise"
                ? "warning"
                : "destructive"
            }
          >
            {report.status}
          </Badge>
        </GlassCard>
      ))}
    </div>
  );
}

function FinanceTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={DollarSign} label="Receita bruta (mês)" value={formatPrice(3400000)} />
        <StatCard icon={Landmark} label="Taxas retidas" value={formatPrice(272000)} />
        <StatCard icon={Users} label="Saques pendentes" value={formatPrice(84500)} />
      </div>
      <GlassCard className="p-6">
        <h4 className="font-display font-semibold mb-4">Solicitações de saque</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Aprove ou rejeite solicitações de saque dos vendedores.
        </p>
        <Button>Ver todas as solicitações</Button>
      </GlassCard>
    </div>
  );
}
