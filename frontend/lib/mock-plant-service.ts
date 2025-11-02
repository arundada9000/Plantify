export interface PlantLocation {
  id: string
  name: string
  plantedBy: string
  userId: string
  date: string
  region: string
  latitude: number
  longitude: number
  photo?: string
  description: string
}

// Mock plant locations
const mockPlantLocations: PlantLocation[] = [
  {
    id: "plant-1",
    name: "Oak",
    plantedBy: "Sarah Green",
    userId: "user-2",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    region: "North Forest",
    latitude: 40.7128,
    longitude: -74.006,
    description: "Beautiful oak tree in Central Park",
  },
  {
    id: "plant-2",
    name: "Maple",
    plantedBy: "Alex Trees",
    userId: "user-3",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    region: "East Valley",
    latitude: 34.0522,
    longitude: -118.2437,
    description: "Vibrant maple in the valley",
  },
  {
    id: "plant-3",
    name: "Pine",
    plantedBy: "Admin User",
    userId: "admin-1",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    region: "West Ridge",
    latitude: 47.6062,
    longitude: -122.3321,
    description: "Strong pine on the ridge",
  },
  {
    id: "plant-4",
    name: "Birch",
    plantedBy: "Jordan Eco",
    userId: "user-4",
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    region: "South Grove",
    latitude: 37.7749,
    longitude: -122.4194,
    description: "Elegant birch tree in the grove",
  },
]

export const mockPlantService = {
  async getPlantLocations(userId?: string): Promise<PlantLocation[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    if (userId) {
      return mockPlantLocations.filter((p) => p.userId === userId)
    }
    return mockPlantLocations
  },

  async addPlantLocation(
    userId: string,
    plantedBy: string,
    name: string,
    region: string,
    latitude: number,
    longitude: number,
    description: string,
  ): Promise<PlantLocation> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const newPlant: PlantLocation = {
      id: `plant-${Date.now()}`,
      name,
      plantedBy,
      userId,
      date: new Date().toISOString(),
      region,
      latitude,
      longitude,
      description,
    }
    mockPlantLocations.push(newPlant)
    return newPlant
  },

  async getPlantsByRegion(region: string): Promise<PlantLocation[]> {
    await new Promise((resolve) => setTimeout(resolve, 250))
    return mockPlantLocations.filter((p) => p.region === region)
  },

  async getAllRegions(): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return Array.from(new Set(mockPlantLocations.map((p) => p.region)))
  },
}
