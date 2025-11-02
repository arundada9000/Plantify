export interface Donation {
  id: string
  userId: string
  amount: number
  cause: string
  createdAt: string
}

export interface Partner {
  id: string
  name: string
  logo: string
  description: string
  link: string
  goal: string
  impact: string
}

// Mock donations
const mockDonations: Donation[] = [
  {
    id: "donation-1",
    userId: "user-1",
    amount: 50,
    cause: "solar-panels",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "donation-2",
    userId: "user-2",
    amount: 100,
    cause: "ocean-cleanup",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Mock partners
const mockPartners: Partner[] = [
  {
    id: "partner-1",
    name: "Solar Energy Initiative",
    logo: "https://api.dicebear.com/7.x/icons/svg?seed=solar",
    description: "Installing solar panels in developing communities",
    link: "https://solarinitiative.org",
    goal: "For every 1000 Pomodoros, we donate to solar panel installations",
    impact: "500+ installations completed",
  },
  {
    id: "partner-2",
    name: "Ocean Cleanup",
    logo: "https://api.dicebear.com/7.x/icons/svg?seed=ocean",
    description: "Removing plastic from our oceans",
    link: "https://theoceancleanup.com",
    goal: "For every 5000 trees planted, we support ocean cleanup missions",
    impact: "100,000 tons of plastic removed",
  },
  {
    id: "partner-3",
    name: "Reforestation Project",
    logo: "https://api.dicebear.com/7.x/icons/svg?seed=forest",
    description: "Planting trees globally to combat deforestation",
    link: "https://reforest.org",
    goal: "For every 500 Pomodoros, we plant a real tree",
    impact: "10 million trees planted",
  },
  {
    id: "partner-4",
    name: "Clean Water Foundation",
    logo: "https://api.dicebear.com/7.x/icons/svg?seed=water",
    description: "Providing clean water access to remote villages",
    link: "https://cleanwater.org",
    goal: "For every 1500 energy minutes saved, we fund water wells",
    impact: "500 wells in 50 countries",
  },
]

export const mockDonationService = {
  async getPartners(): Promise<Partner[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockPartners
  },

  async makeDonation(userId: string, amount: number, cause: string): Promise<Donation> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const donation: Donation = {
      id: `donation-${Date.now()}`,
      userId,
      amount,
      cause,
      createdAt: new Date().toISOString(),
    }
    mockDonations.push(donation)
    return donation
  },

  async getUserDonations(userId: string): Promise<Donation[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockDonations.filter((d) => d.userId === userId)
  },

  async getTotalDonations(): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 250))
    return mockDonations.reduce((sum, d) => sum + d.amount, 0)
  },
}
