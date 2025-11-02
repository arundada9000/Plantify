"use client"

import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Users, Trees, Zap, Heart, BarChart3, MessageSquare, Leaf, Gift, Target } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { mockAdminService } from "@/lib/mock-admin-service"

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTrees: 0,
    totalPomodoros: 0,
    totalDonations: 0,
  })

  useEffect(() => {
    async function loadStats() {
      const analytics = await mockAdminService.getMockAnalytics()
      setStats({
        totalUsers: analytics.totalUsers,
        totalTrees: analytics.totalTrees,
        totalPomodoros: analytics.totalPomodoros,
        totalDonations: analytics.totalDonations,
      })
    }
    loadStats()
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user?.name}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">{stats.totalUsers}</p>
              <p className="text-sm text-muted-foreground mt-2">Active accounts</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trees className="w-5 h-5 text-secondary" />
                Total Trees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-secondary">{stats.totalTrees}</p>
              <p className="text-sm text-muted-foreground mt-2">Planted globally</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Pomodoros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-accent">{stats.totalPomodoros}</p>
              <p className="text-sm text-muted-foreground mt-2">Sessions completed</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-destructive" />
                Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-destructive">${stats.totalDonations.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-2">Total raised</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Link href="/admin/users">
            <Card className="bg-card border-border hover:border-primary/50 cursor-pointer transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  User Management
                </CardTitle>
                <CardDescription>View and manage all users</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Create, update, and delete user accounts. Manage roles and permissions.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/posts">
            <Card className="bg-card border-border hover:border-primary/50 cursor-pointer transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-muted-foreground" />
                  Post Moderation
                </CardTitle>
                <CardDescription>Review and moderate community posts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Approve, reject, or delete community posts and manage reports.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card className="bg-card border-border hover:border-primary/50 cursor-pointer transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  Analytics
                </CardTitle>
                <CardDescription>View app statistics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Track user activity, tree growth, and engagement metrics.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/plants">
            <Card className="bg-card border-border hover:border-primary/50 cursor-pointer transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-secondary" />
                  Plant Management
                </CardTitle>
                <CardDescription>Add and manage planted trees</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Create, update, and delete plant records with location data.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/donations">
            <Card className="bg-card border-border hover:border-primary/50 cursor-pointer transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-destructive" />
                  Donation Management
                </CardTitle>
                <CardDescription>Track and manage donations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View donation records and manage user contributions to partners.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/partners">
            <Card className="bg-card border-border hover:border-primary/50 cursor-pointer transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Partner Management
                </CardTitle>
                <CardDescription>Manage partner organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Add, update, and delete partner organizations and their impact goals.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/campaigns">
            <Card className="bg-card border-border hover:border-primary/50 cursor-pointer transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-secondary" />
                  Campaigns & Challenges
                </CardTitle>
                <CardDescription>Create global events</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Set up challenges and donation campaigns for users.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  )
}
