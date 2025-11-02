"use client"

import { useState, useEffect } from "react"
import { mockAdminService, type AdminPlant } from "@/lib/mock-admin-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, MapPin } from "lucide-react"
import Image from "next/image"

export function PlantManagement() {
  const [plants, setPlants] = useState<AdminPlant[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    plantedBy: "",
    plantName: "",
    latitude: 0,
    longitude: 0,
  })

  useEffect(() => {
    async function loadPlants() {
      setLoading(true)
      const data = await mockAdminService.getAllPlants()
      setPlants(data)
      setLoading(false)
    }
    loadPlants()
  }, [])

  const handleAddPlant = async () => {
    if (formData.plantedBy && formData.plantName) {
      const newPlant = await mockAdminService.addPlant({
        userId: "admin-1",
        plantedBy: formData.plantedBy,
        plantName: formData.plantName,
        latitude: formData.latitude,
        longitude: formData.longitude,
        plantedDate: new Date().toISOString(),
      })
      setPlants([...plants, newPlant])
      setFormData({ plantedBy: "", plantName: "", latitude: 0, longitude: 0 })
      setShowForm(false)
    }
  }

  const handleDeletePlant = async (plantId: string) => {
    await mockAdminService.deletePlant(plantId)
    setPlants(plants.filter((p) => p.id !== plantId))
  }

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading plants...</div>
  }

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Plant
      </Button>

      {/* Add Form */}
      {showForm && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Add New Plant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Planted By"
                value={formData.plantedBy}
                onChange={(e) => setFormData({ ...formData, plantedBy: e.target.value })}
                className="px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground"
              />
              <input
                type="text"
                placeholder="Plant Name"
                value={formData.plantName}
                onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
                className="px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground"
              />
              <input
                type="number"
                placeholder="Latitude"
                step="0.0001"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: Number.parseFloat(e.target.value) })}
                className="px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground"
              />
              <input
                type="number"
                placeholder="Longitude"
                step="0.0001"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: Number.parseFloat(e.target.value) })}
                className="px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddPlant} className="flex-1">
                Save Plant
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plants Grid */}
      <div className="grid gap-4">
        {plants.map((plant) => (
          <Card key={plant.id} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                {plant.photo && (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={plant.photo || "/placeholder.svg"}
                      alt={plant.plantName}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{plant.plantName}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Planted by: {plant.plantedBy}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                    <MapPin className="w-4 h-4" />
                    {plant.latitude.toFixed(4)}, {plant.longitude.toFixed(4)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(plant.plantedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeletePlant(plant.id)}
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

      {plants.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No plants have been added yet</p>
        </div>
      )}
    </div>
  )
}
