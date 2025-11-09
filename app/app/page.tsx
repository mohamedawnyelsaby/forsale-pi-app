"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Users, ShoppingCart, DollarSign, Zap, Globe } from "lucide-react"
import { analytics } from "@/lib/analytics"

export default function AnalyticsDashboard() {
  const analyticsData = analytics.getAnalytics()

  const chartData = [
    { month: "Jan", sales: 4000, users: 2400, transactions: 2400 },
    { month: "Feb", sales: 3000, users: 1398, transactions: 2210 },
    { month: "Mar", sales: 2000, users: 9800, transactions: 2290 },
    { month: "Apr", sales: 2780, users: 3908, transactions: 2000 },
    { month: "May", sales: 1890, users: 4800, transactions: 2181 },
    { month: "Jun", sales: 2390, users: 3800, transactions: 2500 },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time insights into Forsale's performance</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                <p className="text-3xl font-bold text-foreground">2.5M</p>
                <p className="text-xs text-primary mt-2">+12% from last month</p>
              </div>
              <Users className="w-12 h-12 text-primary/20" />
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Sales</p>
                <p className="text-3xl font-bold text-foreground">$8.5M</p>
                <p className="text-xs text-primary mt-2">+8% from last month</p>
              </div>
              <DollarSign className="w-12 h-12 text-primary/20" />
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Transactions</p>
                <p className="text-3xl font-bold text-foreground">8.5M</p>
                <p className="text-xs text-primary mt-2">+15% from last month</p>
              </div>
              <ShoppingCart className="w-12 h-12 text-primary/20" />
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <Card className="bg-card border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Sales Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-card border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                <Legend />
                <Bar dataKey="users" fill="var(--primary)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Features Status */}
        <Card className="bg-card border-border p-6">
          <h3 className="font-semibold text-foreground mb-6">Platform Features Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "AI Search Engine", status: "Active", icon: Zap },
              { name: "Price Optimization", status: "Active", icon: TrendingUp },
              { name: "Pi Network Integration", status: "Active", icon: Globe },
              { name: "24/7 AI Support", status: "Active", icon: Users },
              { name: "Smart Shipping", status: "Active", icon: ShoppingCart },
              { name: "Image Processing", status: "Active", icon: Zap },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{feature.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-primary bg-primary/20 px-2 py-1 rounded">
                    {feature.status}
                  </span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      <Footer />
    </main>
  )
}
