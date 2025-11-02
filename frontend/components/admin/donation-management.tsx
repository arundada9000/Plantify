"use client"

import { useState, useEffect } from "react"
import { mockAdminService, type AdminDonation } from "@/lib/mock-admin-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Heart, TrendingUp } from "lucide-react"

export function DonationManagement() {
  const [donations, setDonations] = useState<AdminDonation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDonations() {
      setLoading(true)
      const data = await mockAdminService.getAllDonations()
      setDonations(data)
      setLoading(false)
    }
    loadDonations()
  }, [])

  const handleDeleteDonation = async (donationId: string) => {
    await mockAdminService.deleteDonation(donationId)
    setDonations(donations.filter((d) => d.id !== donationId))
  }

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0)
  const averageDonation = donations.length > 0 ? (totalDonations / donations.length).toFixed(2) : 0

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading donations...</div>
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Raised</p>
                <p className="text-3xl font-bold text-foreground mt-2">${totalDonations.toFixed(2)}</p>
              </div>
              <Heart className="w-8 h-8 text-destructive/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Donations</p>
                <p className="text-3xl font-bold text-foreground mt-2">{donations.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Donation</p>
                <p className="text-3xl font-bold text-foreground mt-2">${averageDonation}</p>
              </div>
              <Heart className="w-8 h-8 text-secondary/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donations List */}
      <div className="space-y-3">
        {donations.map((donation) => (
          <Card key={donation.id} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{donation.donorName}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{donation.partnerName}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(donation.createdAt).toLocaleDateString()}{" "}
                    {new Date(donation.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-secondary">${donation.amount.toFixed(2)}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteDonation(donation.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {donations.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No donations recorded yet</p>
        </div>
      )}
    </div>
  )
}
