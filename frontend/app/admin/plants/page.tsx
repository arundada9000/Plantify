"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { PlantManagement } from "@/components/admin/plant-management"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function AdminPlantsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <main className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Plant Management</h1>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <PlantManagement />
        </div>
      </main>
    </ProtectedRoute>
  )
}
