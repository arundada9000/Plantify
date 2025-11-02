export interface UserStats {
  id: string
  userId: string
  pomodorosCompleted: number
  treesPlanted: number
  currentStreak: number
  longestStreak: number
  totalEnergySaved: number
  lastFocusDate: string | null
  badges: Badge[]
  createdAt: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: string
}

// Mock energy tips
export const ENERGY_TIPS = [
  "Turn off unnecessary lights during focus sessions",
  "Close unused browser tabs to reduce CPU usage",
  "Dim your screen brightness by 25% to save battery",
  "Disable background app refresh on your phone",
  "Use dark mode to reduce screen energy consumption",
  "Put your phone in airplane mode during focus time",
  "Close email and messaging apps during Pomodoros",
  "Use a fan instead of AC during focus sessions",
  "Unplug devices when not in use",
  "Keep your laptop clean for better cooling efficiency",
]

// Badge definitions
const BADGE_DEFINITIONS = {
  first_tree: {
    name: "Green Thumb",
    description: "Plant your first tree",
    icon: "Sprout",
  },
  ten_trees: {
    name: "Forest Builder",
    description: "Plant 10 trees",
    icon: "Trees",
  },
  fifty_trees: {
    name: "Eco Warrior",
    description: "Plant 50 trees",
    icon: "LeafyGreen",
  },
  five_streak: {
    name: "On Fire",
    description: "Maintain a 5-day streak",
    icon: "Flame",
  },
  ten_streak: {
    name: "Unstoppable",
    description: "Maintain a 10-day streak",
    icon: "Zap",
  },
  hundred_pomodoros: {
    name: "Focus Master",
    description: "Complete 100 Pomodoros",
    icon: "Target",
  },
  five_hundred_energy: {
    name: "Energy Saver",
    description: "Save 500 minutes of energy",
    icon: "Leaf",
  },
}

// Mock user stats database
const mockUserStats: Record<string, UserStats> = {
  "user-1": {
    id: "stat-1",
    userId: "user-1",
    pomodorosCompleted: 12,
    treesPlanted: 12,
    currentStreak: 3,
    longestStreak: 7,
    totalEnergySaved: 300,
    lastFocusDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    badges: [
      {
        id: "badge-1",
        name: "Green Thumb",
        description: "Plant your first tree",
        icon: "Sprout",
        earnedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
  "admin-1": {
    id: "stat-2",
    userId: "admin-1",
    pomodorosCompleted: 45,
    treesPlanted: 45,
    currentStreak: 12,
    longestStreak: 30,
    totalEnergySaved: 1125,
    lastFocusDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString(),
    badges: [
      {
        id: "badge-2",
        name: "Green Thumb",
        description: "Plant your first tree",
        icon: "Sprout",
        earnedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "badge-3",
        name: "Forest Builder",
        description: "Plant 10 trees",
        icon: "Trees",
        earnedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "badge-4",
        name: "On Fire",
        description: "Maintain a 5-day streak",
        icon: "Flame",
        earnedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "badge-5",
        name: "Focus Master",
        description: "Complete 100 Pomodoros",
        icon: "Target",
        earnedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
}

export const mockUserService = {
  async getUserStats(userId: string): Promise<UserStats> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockUserStats[userId] || createDefaultStats(userId)
  },

  async updateUserStats(userId: string, updates: Partial<UserStats>): Promise<UserStats> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    if (!mockUserStats[userId]) {
      mockUserStats[userId] = createDefaultStats(userId)
    }
    mockUserStats[userId] = { ...mockUserStats[userId], ...updates }
    return mockUserStats[userId]
  },

  async addPomodoro(userId: string, energySaved: number): Promise<UserStats> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const stats = mockUserStats[userId] || createDefaultStats(userId)
    const today = new Date().toDateString()
    const lastFocusDateObj = stats.lastFocusDate ? new Date(stats.lastFocusDate).toDateString() : null
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()

    let newStreak = stats.currentStreak
    if (lastFocusDateObj === yesterday) {
      newStreak += 1
    } else if (lastFocusDateObj !== today) {
      newStreak = 1
    }

    const updated: UserStats = {
      ...stats,
      pomodorosCompleted: stats.pomodorosCompleted + 1,
      treesPlanted: stats.treesPlanted + 1,
      currentStreak: newStreak,
      longestStreak: Math.max(stats.longestStreak, newStreak),
      totalEnergySaved: stats.totalEnergySaved + energySaved,
      lastFocusDate: new Date().toISOString(),
    }

    mockUserStats[userId] = updated
    return updated
  },

  async getAllUserStats(): Promise<UserStats[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return Object.values(mockUserStats)
  },

  async checkAndAwardBadges(userId: string): Promise<Badge[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const stats = mockUserStats[userId]
    if (!stats) return []

    const newBadges: Badge[] = []
    const existingBadgeNames = stats.badges.map((b) => b.name)

    if (stats.treesPlanted === 1 && !existingBadgeNames.includes("Green Thumb")) {
      newBadges.push({
        id: `badge-${Date.now()}`,
        name: BADGE_DEFINITIONS.first_tree.name,
        description: BADGE_DEFINITIONS.first_tree.description,
        icon: BADGE_DEFINITIONS.first_tree.icon,
        earnedAt: new Date().toISOString(),
      })
    }

    if (stats.treesPlanted === 10 && !existingBadgeNames.includes("Forest Builder")) {
      newBadges.push({
        id: `badge-${Date.now()}-2`,
        name: BADGE_DEFINITIONS.ten_trees.name,
        description: BADGE_DEFINITIONS.ten_trees.description,
        icon: BADGE_DEFINITIONS.ten_trees.icon,
        earnedAt: new Date().toISOString(),
      })
    }

    if (stats.treesPlanted === 50 && !existingBadgeNames.includes("Eco Warrior")) {
      newBadges.push({
        id: `badge-${Date.now()}-3`,
        name: BADGE_DEFINITIONS.fifty_trees.name,
        description: BADGE_DEFINITIONS.fifty_trees.description,
        icon: BADGE_DEFINITIONS.fifty_trees.icon,
        earnedAt: new Date().toISOString(),
      })
    }

    if (stats.currentStreak === 5 && !existingBadgeNames.includes("On Fire")) {
      newBadges.push({
        id: `badge-${Date.now()}-4`,
        name: BADGE_DEFINITIONS.five_streak.name,
        description: BADGE_DEFINITIONS.five_streak.description,
        icon: BADGE_DEFINITIONS.five_streak.icon,
        earnedAt: new Date().toISOString(),
      })
    }

    if (stats.currentStreak === 10 && !existingBadgeNames.includes("Unstoppable")) {
      newBadges.push({
        id: `badge-${Date.now()}-5`,
        name: BADGE_DEFINITIONS.ten_streak.name,
        description: BADGE_DEFINITIONS.ten_streak.description,
        icon: BADGE_DEFINITIONS.ten_streak.icon,
        earnedAt: new Date().toISOString(),
      })
    }

    if (stats.pomodorosCompleted === 100 && !existingBadgeNames.includes("Focus Master")) {
      newBadges.push({
        id: `badge-${Date.now()}-6`,
        name: BADGE_DEFINITIONS.hundred_pomodoros.name,
        description: BADGE_DEFINITIONS.hundred_pomodoros.description,
        icon: BADGE_DEFINITIONS.hundred_pomodoros.icon,
        earnedAt: new Date().toISOString(),
      })
    }

    if (stats.totalEnergySaved >= 500 && !existingBadgeNames.includes("Energy Saver")) {
      newBadges.push({
        id: `badge-${Date.now()}-7`,
        name: BADGE_DEFINITIONS.five_hundred_energy.name,
        description: BADGE_DEFINITIONS.five_hundred_energy.description,
        icon: BADGE_DEFINITIONS.five_hundred_energy.icon,
        earnedAt: new Date().toISOString(),
      })
    }

    if (newBadges.length > 0) {
      stats.badges.push(...newBadges)
      mockUserStats[userId] = stats
    }

    return newBadges
  },
}

function createDefaultStats(userId: string): UserStats {
  return {
    id: `stat-${Date.now()}`,
    userId,
    pomodorosCompleted: 0,
    treesPlanted: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalEnergySaved: 0,
    lastFocusDate: null,
    badges: [],
    createdAt: new Date().toISOString(),
  }
}
