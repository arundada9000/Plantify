"use client"

import { useState, useEffect } from "react"
import { mockAdminService, type AdminPost } from "@/lib/mock-admin-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Image from "next/image"

export function PostManagement() {
  const [posts, setPosts] = useState<AdminPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "approved" | "pending" | "rejected">("all")

  useEffect(() => {
    async function loadPosts() {
      setLoading(true)
      const data = await mockAdminService.getAllPosts()
      setPosts(data)
      setLoading(false)
    }
    loadPosts()
  }, [])

  const handleStatusChange = async (postId: string, status: "approved" | "rejected") => {
    await mockAdminService.updatePostStatus(postId, status)
    setPosts(posts.map((p) => (p.id === postId ? { ...p, status } : p)))
  }

  const handleDeletePost = async (postId: string) => {
    await mockAdminService.deletePost(postId)
    setPosts(posts.filter((p) => p.id !== postId))
  }

  const filteredPosts = posts.filter((p) => filter === "all" || p.status === filter)

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading posts...</div>
  }

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {["all", "approved", "pending", "rejected"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status as any)}
            className="capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {post.username}
                    {post.status === "approved" && <CheckCircle className="w-4 h-4 text-secondary" />}
                    {post.status === "pending" && <AlertCircle className="w-4 h-4 text-accent" />}
                    {post.status === "rejected" && <XCircle className="w-4 h-4 text-destructive" />}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(post.createdAt).toLocaleDateString()} {new Date(post.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                {post.reportCount > 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-destructive/10 rounded-md">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-destructive font-medium">{post.reportCount} reports</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Post Content */}
              <div className="space-y-3">
                <p className="text-foreground">{post.content}</p>
                {post.image && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt="Post image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
              </div>

              {/* Engagement Stats */}
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-border">
                {post.status === "pending" && (
                  <>
                    <Button size="sm" className="flex-1" onClick={() => handleStatusChange(post.id, "approved")}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleStatusChange(post.id, "rejected")}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
                {post.status !== "pending" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleStatusChange(post.id, "pending")}
                  >
                    Review Again
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeletePost(post.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No posts found with filter: {filter}</p>
        </div>
      )}
    </div>
  )
}
