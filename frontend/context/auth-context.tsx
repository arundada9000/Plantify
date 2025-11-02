"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, AuthContextType, UserRole } from "@/lib/auth-types"
import { mockAuthService } from "@/lib/mock-auth-service"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("currentUser")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true)
    try {
      const loggedInUser = await mockAuthService.login(email, password, role)
      setUser(loggedInUser)
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser))
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      const newUser = await mockAuthService.signup(email, password, name)
      setUser(newUser)
      localStorage.setItem("currentUser", JSON.stringify(newUser))
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await mockAuthService.logout()
      setUser(null)
      localStorage.removeItem("currentUser")
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error("No user logged in")
    setLoading(true)
    try {
      const updatedUser = await mockAuthService.updateProfile(user.id, updates)
      setUser(updatedUser)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


