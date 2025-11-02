"use client"

import { useState, useEffect } from "react"
import { mockAdminService, type AdminPartner } from "@/lib/mock-admin-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, ExternalLink } from "lucide-react"
import Image from "next/image"

export function PartnerManagement() {
  const [partners, setPartners] = useState<AdminPartner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    impactGoal: "",
  })

  useEffect(() => {
    async function loadPartners() {
      setLoading(true)
      const data = await mockAdminService.getAllPartners()
      setPartners(data)
      setLoading(false)
    }
    loadPartners()
  }, [])

  const handleAddOrUpdate = async () => {
    if (formData.name && formData.description) {
      if (editingId) {
        const updated = await mockAdminService.updatePartner(editingId, formData)
        setPartners(partners.map((p) => (p.id === editingId ? updated : p)))
        setEditingId(null)
      } else {
        const newPartner = await mockAdminService.addPartner({
          name: formData.name,
          description: formData.description,
          website: formData.website,
          impactGoal: formData.impactGoal,
        })
        setPartners([...partners, newPartner])
      }
      setFormData({ name: "", description: "", website: "", impactGoal: "" })
      setShowForm(false)
    }
  }

  const handleEdit = (partner: AdminPartner) => {
    setFormData({
      name: partner.name,
      description: partner.description,
      website: partner.website,
      impactGoal: partner.impactGoal,
    })
    setEditingId(partner.id)
    setShowForm(true)
  }

  const handleDeletePartner = async (partnerId: string) => {
    await mockAdminService.deletePartner(partnerId)
    setPartners(partners.filter((p) => p.id !== partnerId))
  }

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading partners...</div>
  }

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <Button
        onClick={() => {
          setShowForm(!showForm)
          if (showForm) setEditingId(null)
          setFormData({ name: "", description: "", website: "", impactGoal: "" })
        }}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        {editingId ? "Update Partner" : "Add Partner"}
      </Button>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>{editingId ? "Update Partner" : "Add New Partner"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Partner Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                type="url"
                placeholder="Website URL"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground"
              />
              <input
                type="text"
                placeholder="Impact Goal"
                value={formData.impactGoal}
                onChange={(e) => setFormData({ ...formData, impactGoal: e.target.value })}
                className="px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddOrUpdate} className="flex-1">
                {editingId ? "Update Partner" : "Save Partner"}
              </Button>
              <Button
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({ name: "", description: "", website: "", impactGoal: "" })
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

      {/* Partners Grid */}
      <div className="grid gap-4">
        {partners.map((partner) => (
          <Card key={partner.id} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                {partner.logo && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
                  <p className="text-xs text-secondary mt-2">{partner.impactGoal}</p>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
                    >
                      Visit Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div className="flex flex-col gap-2 justify-start">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(partner)} className="bg-transparent">
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeletePartner(partner.id)}
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

      {partners.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No partners added yet</p>
        </div>
      )}
    </div>
  )
}
