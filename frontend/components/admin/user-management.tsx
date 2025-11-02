"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/auth-types"
import { mockAdminService } from "@/lib/mock-admin-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, Shield, UserIcon, Loader2 } from "lucide-react"

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const data = await mockAdminService.getAllUsers()
      setUsers(data)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    setDeleting(userId)
    try {
      await mockAdminService.deleteUser(userId)
      setUsers(users.filter((u) => u.id !== userId))
    } finally {
      setDeleting(null)
    }
  }

  const handleUpdateRole = async (userId: string, newRole: "user" | "admin") => {
    try {
      const updated = await mockAdminService.updateUserRole(userId, newRole)
      setUsers(users.map((u) => (u.id === userId ? updated : u)))
    } catch (error) {
      console.error("Failed to update role:", error)
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage all users and their roles</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-border">
                    <TableCell className="font-medium flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-muted-foreground" />
                      {user.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          user.role === "admin"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      {user.role === "user" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateRole(user.id, "admin")}
                          className="flex items-center gap-1"
                        >
                          <Shield className="w-4 h-4" />
                          Make Admin
                        </Button>
                      )}
                      {user.role === "admin" && user.id !== "admin-1" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateRole(user.id, "user")}
                          className="flex items-center gap-1"
                        >
                          <UserIcon className="w-4 h-4" />
                          Make User
                        </Button>
                      )}
                      {user.id !== "admin-1" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive" disabled={deleting === user.id}>
                              {deleting === user.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete User</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {user.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogAction
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
