export interface Post {
  id: string
  userId: string
  userName: string
  userAvatar: string
  caption: string
  image?: string
  likes: number
  comments: number
  createdAt: string
  isLiked: boolean
  isUserPost: boolean
  status: "approved" | "pending" | "rejected"
}

export interface Comment {
  id: string
  postId: string
  userId: string
  userName: string
  userAvatar: string
  text: string
  createdAt: string
}

// Mock posts database
const mockPosts: Post[] = [
  {
    id: "post-1",
    userId: "user-2",
    userName: "Sarah Green",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    caption: "Just completed my first 25-minute focus session! Growing my digital forest.",
    image: "/focus-workspace.jpg",
    likes: 24,
    comments: 5,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isUserPost: false,
    status: "approved",
  },
  {
    id: "post-2",
    userId: "user-3",
    userName: "Alex Trees",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    caption: "Day 7 of my focus streak! The forest is getting denser.",
    image: "/forest-trees.png",
    likes: 42,
    comments: 8,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isUserPost: false,
    status: "approved",
  },
  {
    id: "post-3",
    userId: "user-4",
    userName: "Jordan Eco",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    caption: "Saved 500 minutes of energy this month! Every pomodoro counts.",
    image: "/solar-energy-green.jpg",
    likes: 18,
    comments: 3,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isUserPost: false,
    status: "approved",
  },
]

const mockPostComments: Record<string, Comment[]> = {
  "post-1": [
    {
      id: "comment-1",
      postId: "post-1",
      userId: "user-1",
      userName: "You",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
      text: "Great work! Keep it up!",
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
  ],
}

export const mockPostService = {
  async getPosts(userId: string, limit = 20): Promise<Post[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockPosts.map((post) => ({
      ...post,
      isLiked: Math.random() > 0.5,
      isUserPost: post.userId === userId,
    }))
  },

  async createPost(
    userId: string,
    userName: string,
    userAvatar: string,
    caption: string,
    image?: string,
  ): Promise<Post> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId,
      userName,
      userAvatar,
      caption,
      image,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      isLiked: false,
      isUserPost: true,
      status: "pending",
    }
    mockPosts.unshift(newPost)
    return newPost
  },

  async updatePost(postId: string, caption: string): Promise<Post> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const post = mockPosts.find((p) => p.id === postId)
    if (!post) throw new Error("Post not found")
    post.caption = caption
    return post
  },

  async deletePost(postId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = mockPosts.findIndex((p) => p.id === postId)
    if (index > -1) {
      mockPosts.splice(index, 1)
    }
  },

  async likePost(postId: string): Promise<Post> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const post = mockPosts.find((p) => p.id === postId)
    if (!post) throw new Error("Post not found")
    post.isLiked = !post.isLiked
    post.likes += post.isLiked ? 1 : -1
    return post
  },

  async getPostComments(postId: string): Promise<Comment[]> {
    await new Promise((resolve) => setTimeout(resolve, 250))
    return mockPostComments[postId] || []
  },

  async addComment(
    postId: string,
    userId: string,
    userName: string,
    userAvatar: string,
    text: string,
  ): Promise<Comment> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      postId,
      userId,
      userName,
      userAvatar,
      text,
      createdAt: new Date().toISOString(),
    }
    if (!mockPostComments[postId]) {
      mockPostComments[postId] = []
    }
    mockPostComments[postId].push(comment)
    const post = mockPosts.find((p) => p.id === postId)
    if (post) {
      post.comments += 1
    }
    return comment
  },

  async getAllPosts(): Promise<Post[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockPosts
  },

  async approvePosts(postIds: string[]): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    postIds.forEach((id) => {
      const post = mockPosts.find((p) => p.id === id)
      if (post) post.status = "approved"
    })
  },

  async rejectPost(postId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const post = mockPosts.find((p) => p.id === postId)
    if (post) post.status = "rejected"
  },
}
