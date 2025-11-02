"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Sprout } from "lucide-react"
import Link from "next/link"

type UserRole = "user" | "admin"

interface LoginFormProps {
  defaultRole?: UserRole
}

export function LoginForm({ defaultRole = "user" }: LoginFormProps) {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>(defaultRole)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password, role)
      router.push(role === "admin" ? "/admin/dashboard" : "/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary rounded-lg">
            <Sprout className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Plant Pomodoro</h1>
        <p className="text-sm text-muted-foreground mt-2">Stay focused, grow forests</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role Selection */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              role === "admin"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Demo Credentials */}
        {role === "user" && (
          <div className="p-3 bg-accent/10 border border-accent rounded-lg text-sm">
            <p className="font-medium text-accent-foreground">Demo credentials:</p>
            <p className="text-muted-foreground">Email: user@example.com</p>
            <p className="text-muted-foreground">Password: password123</p>
          </div>
        )}
        {role === "admin" && (
          <div className="p-3 bg-accent/10 border border-accent rounded-lg text-sm">
            <p className="font-medium text-accent-foreground">Demo credentials:</p>
            <p className="text-muted-foreground">Email: admin@example.com</p>
            <p className="text-muted-foreground">Password: admin123</p>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="border-border focus:border-primary"
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="border-border focus:border-primary"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-secondary text-primary-foreground font-medium py-2 rounded-lg transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>

        {/* Signup Link */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:text-secondary font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
