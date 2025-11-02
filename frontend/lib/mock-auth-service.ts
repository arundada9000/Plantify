import type { User, UserRole } from "./auth-types"

// Mock users database
const mockUsers: Record<string, User & { password: string }> = {
  "user@example.com": {
    id: "user-1",
    email: "user@example.com",
    name: "John Planter",
    role: "user",
    password: "password123",
    avatar: "/placeholder-user.jpg",
    createdAt: new Date().toISOString(),
  },
  "admin@example.com": {
    id: "admin-1",
    email: "admin@example.com",
    name: "Admin Forest",
    role: "admin",
    password: "admin123",
    avatar: "/placeholder-user.jpg",
    createdAt: new Date().toISOString(),
  },
}

export const mockAuthService = {
  async login(email: string, password: string, role: UserRole): Promise<User> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = mockUsers[email]

    if (!user || user.password !== password) {
      throw new Error("Invalid email or password")
    }

    if (user.role !== role) {
      throw new Error(`This account is registered as ${user.role}, not ${role}`)
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  },

  async signup(email: string, password: string, name: string): Promise<User> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (mockUsers[email]) {
      throw new Error("Email already registered")
    }

    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      email,
      name,
      password,
      role: "user",
      avatar: "/placeholder-user.jpg",
      createdAt: new Date().toISOString(),
    }

    mockUsers[email] = newUser

    const { password: _, ...userWithoutPassword } = newUser
    return userWithoutPassword
  },

  async logout(): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    for (const userEmail in mockUsers) {
      if (mockUsers[userEmail].id === userId) {
        mockUsers[userEmail] = { ...mockUsers[userEmail], ...updates }
        const { password: _, ...userWithoutPassword } = mockUsers[userEmail]
        return userWithoutPassword
      }
    }

    throw new Error("User not found")
  },
}
