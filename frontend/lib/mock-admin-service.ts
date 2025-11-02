import type { User } from "./auth-types"

export interface AdminPost {
  id: string
  userId: string
  username: string
  content: string
  image?: string
  likes: number
  comments: number
  status: "approved" | "pending" | "rejected"
  createdAt: string
  reportCount: number
}

export interface AdminPlant {
  id: string
  userId: string
  plantedBy: string
  plantName: string
  latitude: number
  longitude: number
  plantedDate: string
  photo?: string
}

export interface AdminDonation {
  id: string
  userId: string
  donorName: string
  amount: number
  partnerId: string
  partnerName: string
  createdAt: string
}

export interface AdminPartner {
  id: string
  name: string
  description: string
  logo?: string
  website: string
  impactGoal: string
}

export interface AdminCampaign {
  id: string
  title: string
  description: string
  goal: number
  current: number
  endDate: string
  active: boolean
}

// Mock data
const mockPosts: AdminPost[] = [
  {
    id: "post-1",
    userId: "user-1",
    username: "John Planter",
    content: "Just completed my 5th Pomodoro session! Feeling productive.",
    image: "/focus-workspace.jpg",
    likes: 12,
    comments: 3,
    status: "approved",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    reportCount: 0,
  },
  {
    id: "post-2",
    userId: "user-1",
    username: "John Planter",
    content: "Planted my 10th tree today!",
    image: "/forest-trees.jpg",
    likes: 28,
    comments: 5,
    status: "pending",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    reportCount: 1,
  },
]

const mockPlants: AdminPlant[] = [
  {
    id: "plant-1",
    userId: "user-1",
    plantedBy: "John Planter",
    plantName: "Oak Tree",
    latitude: 40.7128,
    longitude: -74.006,
    plantedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    photo: "/oak-tree.jpg",
  },
  {
    id: "plant-2",
    userId: "user-1",
    plantedBy: "John Planter",
    plantName: "Maple Tree",
    latitude: 40.758,
    longitude: -73.9855,
    plantedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    photo: "/maple-tree.jpg",
  },
]

const mockDonations: AdminDonation[] = [
  {
    id: "donation-1",
    userId: "user-1",
    donorName: "John Planter",
    amount: 50,
    partnerId: "partner-1",
    partnerName: "Solar Initiative",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "donation-2",
    userId: "user-1",
    donorName: "John Planter",
    amount: 100,
    partnerId: "partner-2",
    partnerName: "Ocean Cleanup",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const mockPartners: AdminPartner[] = [
  {
    id: "partner-1",
    name: "Solar Initiative",
    description: "Bringing renewable energy to underserved communities",
    logo: "/solar-energy.jpg",
    website: "https://solarinitiative.org",
    impactGoal: "For every 1000 Pomodoros, we install solar panels",
  },
  {
    id: "partner-2",
    name: "Ocean Cleanup",
    description: "Removing plastic from our oceans",
    logo: "/ocean-cleanup.jpg",
    website: "https://oceancleanup.com",
    impactGoal: "For every 500 Pomodoros, we remove 1 ton of plastic",
  },
]

const mockCampaigns: AdminCampaign[] = [
  {
    id: "campaign-1",
    title: "Global Focus Month",
    description: "Complete 1000 Pomodoros together to plant 100 trees",
    goal: 1000,
    current: 456,
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    active: true,
  },
  {
    id: "campaign-2",
    title: "Energy Saver Challenge",
    description: "Save 500 hours of energy this month",
    goal: 500,
    current: 234,
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    active: true,
  },
]

// Mock users database (extended with admin capabilities)
export const mockAdminService = {
  async getAllUsers(): Promise<User[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return [
      {
        id: "user-1",
        email: "user@example.com",
        name: "John Planter",
        role: "user",
        avatar: "/placeholder-user.jpg",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "admin-1",
        email: "admin@example.com",
        name: "Admin Forest",
        role: "admin",
        avatar: "/placeholder-user.jpg",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]
  },

  async deleteUser(userId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
  },

  async updateUserRole(userId: string, newRole: "user" | "admin"): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return {
      id: userId,
      email: "user@example.com",
      name: "Updated User",
      role: newRole,
      createdAt: new Date().toISOString(),
    }
  },

  // Post Management
  async getAllPosts(): Promise<AdminPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return mockPosts
  },

  async updatePostStatus(postId: string, status: "approved" | "pending" | "rejected"): Promise<AdminPost> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const post = mockPosts.find((p) => p.id === postId)
    if (post) {
      post.status = status
    }
    return post || mockPosts[0]
  },

  async deletePost(postId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = mockPosts.findIndex((p) => p.id === postId)
    if (index > -1) {
      mockPosts.splice(index, 1)
    }
  },

  // Plant Management
  async getAllPlants(): Promise<AdminPlant[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return mockPlants
  },

  async addPlant(plant: Omit<AdminPlant, "id">): Promise<AdminPlant> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newPlant: AdminPlant = { ...plant, id: `plant-${Date.now()}` }
    mockPlants.push(newPlant)
    return newPlant
  },

  async updatePlant(plantId: string, updates: Partial<AdminPlant>): Promise<AdminPlant> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const plant = mockPlants.find((p) => p.id === plantId)
    if (plant) {
      Object.assign(plant, updates)
    }
    return plant || mockPlants[0]
  },

  async deletePlant(plantId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = mockPlants.findIndex((p) => p.id === plantId)
    if (index > -1) {
      mockPlants.splice(index, 1)
    }
  },

  // Donation Management
  async getAllDonations(): Promise<AdminDonation[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return mockDonations
  },

  async deleteDonation(donationId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = mockDonations.findIndex((d) => d.id === donationId)
    if (index > -1) {
      mockDonations.splice(index, 1)
    }
  },

  // Partner Management
  async getAllPartners(): Promise<AdminPartner[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return mockPartners
  },

  async addPartner(partner: Omit<AdminPartner, "id">): Promise<AdminPartner> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newPartner: AdminPartner = { ...partner, id: `partner-${Date.now()}` }
    mockPartners.push(newPartner)
    return newPartner
  },

  async updatePartner(partnerId: string, updates: Partial<AdminPartner>): Promise<AdminPartner> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const partner = mockPartners.find((p) => p.id === partnerId)
    if (partner) {
      Object.assign(partner, updates)
    }
    return partner || mockPartners[0]
  },

  async deletePartner(partnerId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = mockPartners.findIndex((p) => p.id === partnerId)
    if (index > -1) {
      mockPartners.splice(index, 1)
    }
  },

  // Campaign Management
  async getAllCampaigns(): Promise<AdminCampaign[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return mockCampaigns
  },

  async addCampaign(campaign: Omit<AdminCampaign, "id">): Promise<AdminCampaign> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newCampaign: AdminCampaign = { ...campaign, id: `campaign-${Date.now()}` }
    mockCampaigns.push(newCampaign)
    return newCampaign
  },

  async updateCampaign(campaignId: string, updates: Partial<AdminCampaign>): Promise<AdminCampaign> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const campaign = mockCampaigns.find((c) => c.id === campaignId)
    if (campaign) {
      Object.assign(campaign, updates)
    }
    return campaign || mockCampaigns[0]
  },

  async deleteCampaign(campaignId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = mockCampaigns.findIndex((c) => c.id === campaignId)
    if (index > -1) {
      mockCampaigns.splice(index, 1)
    }
  },

  // Analytics
  async getMockAnalytics() {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return {
      totalUsers: 2,
      totalTrees: mockPlants.length,
      totalPomodoros: 456,
      totalDonations: mockDonations.reduce((sum, d) => sum + d.amount, 0),
      weeklyData: [
        { day: "Mon", pomodoros: 45, trees: 2, energy: 1125 },
        { day: "Tue", pomodoros: 38, trees: 1, energy: 950 },
        { day: "Wed", pomodoros: 52, trees: 3, energy: 1300 },
        { day: "Thu", pomodoros: 41, trees: 2, energy: 1025 },
        { day: "Fri", pomodoros: 58, trees: 4, energy: 1450 },
        { day: "Sat", pomodoros: 35, trees: 1, energy: 875 },
        { day: "Sun", pomodoros: 49, trees: 3, energy: 1225 },
      ],
      activeUsers: 156,
      platformGrowth: [
        { week: "Week 1", users: 45 },
        { week: "Week 2", users: 78 },
        { week: "Week 3", users: 112 },
        { week: "Week 4", users: 156 },
      ],
    }
  },
}
