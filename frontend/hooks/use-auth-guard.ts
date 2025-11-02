"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import type { UserRole } from "@/lib/auth-types"

export function useAuthGuard(requiredRole?: UserRole) {
  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (loading) return

    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (requiredRole && user?.role !== requiredRole) {
      router.push("/")
      return
    }
  }, [loading, isAuthenticated, user, requiredRole, router])

  return { isAuthorized: isAuthenticated && (!requiredRole || user?.role === requiredRole) }
}
