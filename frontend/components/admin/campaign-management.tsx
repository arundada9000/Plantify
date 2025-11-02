"use client"

import { useState, useEffect } from "react"
import { mockAdminService, type AdminCampaign } from "@/lib/mock-admin-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Target } from "lucide-react"

export function CampaignManagement() {
  const [campaigns, setCampaigns] = useState<AdminCampaign[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: 0,
    endDate: "",
  })

  useEffect(() => {
    async function loadCampaigns() {
      setLoading(true)
      const data = await mockAdminService.getAllCampaigns()
      setCampaigns(data)
      setLoading(false)
    }
    loadCampaigns()
  }, [])

  const handleAddOrUpdate = async () => {
    if (formData.title && formData.description && formData.goal > 0) {
      if (editingId) {
        const updated = await mockAdminService.updateCampaign(editingId, {
          ...formData,
          active: new Date(formData.endDate) > new Date(),
        })
        setCampaigns(campaigns.map((c) => (c.id === editingId ? updated : c)))
        setEditingId(null)
      } else {
        const newCampaign = await mockAdminService.addCampaign({
          title: formData.title,
          description: formData.description,
          goal: formData.goal,
          current: 0,
          endDate: formData.endDate,
          active: new Date(formData.endDate) > new Date(),
        })
        setCampaigns([...campaigns, newCampaign])
      }
      setFormData({ title: "", description: "", goal: 0, endDate: "" })
      setShowForm(false)
    }
  }

  const handleEdit = (campaign: AdminCampaign) => {
    setFormData({
      title: campaign.title,
      description: campaign.description,
      goal: campaign.goal,
      endDate: campaign.endDate.split("T")[0],
    })
    setEditingId(campaign.id)
    setShowForm(true)
  }

  const handleDeleteCampaign = async (campaignId: string) => {
    await mockAdminService.deleteCampaign(campaignId)
    setCampaigns(campaigns.filter((c) => c.id !== campaignId))
  }

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading campaigns...</div>
  }

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <Button
        onClick={() => {
          setShowForm(!showForm)
          if (showForm) setEditingId(null)
          setFormData({ title: "", description: "", goal: 0, endDate: "" })
        }}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        {editingId ? "Update Campaign" : "Create Campaign"}
      </Button>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>{editingId ? "Update Campaign" : "Create New Campaign"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Campaign Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground"
              />
              <input
                type="number"
                placeholder="Goal (number of Pomodoros or hours)"
                min="1"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: Number.parseInt(e.target.value) || 0 })}
                className="px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground"
              />
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="px-3 py-2 bg-background border border-border rounded-md text-foreground"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddOrUpdate} className="flex-1">
                {editingId ? "Update Campaign" : "Create Campaign"}
              </Button>
              <Button
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({ title: "", description: "", goal: 0, endDate: "" })
                }}
                variant="outline"
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campaigns Grid */}
      <div className="grid gap-4">
        {campaigns.map((campaign) => {
          const progress = (campaign.current / campaign.goal) * 100
          return (
            <Card key={campaign.id} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-foreground">{campaign.title}</h3>
                        {campaign.active && (
                          <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-full">Active</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{campaign.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 justify-start">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(campaign)}
                        className="bg-transparent"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteCampaign(campaign.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">
                        {campaign.current} / {campaign.goal}
                      </span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <p className="text-xs text-muted-foreground">
                    Ends: {new Date(campaign.endDate).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No campaigns created yet</p>
        </div>
      )}
    </div>
  )
}
