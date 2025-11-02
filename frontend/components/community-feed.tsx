"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Leaf, Target, Clock, Zap, Send } from "lucide-react";

// --- Simple Card Components (for styling only) ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={`rounded-xl border bg-white shadow ${className || ""}`}>
    {children}
  </div>
);

const CardContent: React.FC<CardProps> = ({ children, className }) => (
  <div className={`p-6 ${className || ""}`}>{children}</div>
);

// --- Types ---
interface AuthUser {
  id: string;
  name: string;
}

interface Achievement {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  value: string | number;
  color: string;
}

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  achievement: Achievement;
  caption: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

// --- Mock Auth ---
const useAuth = (): { user: AuthUser | null } => ({
  user: { id: "u1", name: "Gobind" },
});

// --- Example Achievements ---
const achievements: Achievement[] = [
  {
    id: "trees",
    title: "Planted 42 Trees",
    icon: <Leaf className="w-5 h-5 text-green-500" />,
    description: "Your focus grew your virtual forest 🌳",
    value: 42,
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "streak",
    title: "7-Day Focus Streak",
    icon: <Flame className="w-5 h-5 text-orange-500" />,
    description: "Consistency is your superpower 🔥",
    value: 7,
    color: "from-orange-400 to-red-500",
  },
  {
    id: "sessions",
    title: "132 Pomodoros Completed",
    icon: <Target className="w-5 h-5 text-blue-500" />,
    description: "You’re becoming a master of focus 🎯",
    value: 132,
    color: "from-sky-400 to-indigo-500",
  },
  {
    id: "hours",
    title: "48 Hours of Focus",
    icon: <Clock className="w-5 h-5 text-purple-500" />,
    description: "That’s nearly 2 full days of deep work ⏱️",
    value: "48h",
    color: "from-purple-400 to-fuchsia-500",
  },
  {
    id: "energy",
    title: "Saved 3.2 kWh Energy",
    icon: <Zap className="w-5 h-5 text-yellow-500" />,
    description: "Your eco mode made a difference 🌍",
    value: "3.2 kWh",
    color: "from-yellow-400 to-amber-500",
  },
];

// --- Initial Feed ---
const initialPosts: Post[] = [
  {
    id: "1",
    userId: "101",
    userName: "Arun Neupane",
    userAvatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jocelyn",
    achievement: achievements[0],
    caption: "I did It ",
    createdAt: new Date().toISOString(),
    likes: 6,
    isLiked: false,
  },
  {
    id: "2",
    userId: "102",
    userName: "Aayush Chapagain",
    userAvatar: "https://api.dicebear.com/9.x/micah/svg?seed=Destiny",
    achievement: achievements[2],
    caption: "Focus really pays off! 🌱",
    createdAt: new Date().toISOString(),
    likes: 12,
    isLiked: false,
  },
  {
    id: "3",
    userId: "103",
    userName: "Bal Gobin",
    userAvatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Andrea",
    achievement: achievements[1],
    caption: "Ahhhhhh",
    createdAt: new Date().toISOString(),
    likes: 10,
    isLiked: false,
  },
  {
    id: "4",
    userId: "104",
    userName: "Bibek Bhusal",
    userAvatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sophia",
    achievement: achievements[3],
    caption: "Go Greeen.",
    createdAt: new Date().toISOString(),
    likes: 120,
    isLiked: false,
  },
];

// --- Component ---
const CommunityFeed: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedAchievement, setSelectedAchievement] = useState<string>("");
  const [caption, setCaption] = useState<string>("");

  const handleShare = () => {
    if (!selectedAchievement || !caption.trim() || !user) return;

    const achievement = achievements.find((a) => a.id === selectedAchievement);
    if (!achievement) return;

    const newPost: Post = {
      id: crypto.randomUUID(),
      userId: user.id,
      userName: user.name,
      userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`,
      achievement,
      caption,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    setPosts((prev) => [newPost, ...prev]);
    setCaption("");
    setSelectedAchievement("");
  };

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Community Achievements 🌿
          </h1>
          <p className="text-gray-500 mt-2">
            Share your achievements and inspire others!
          </p>
        </div>

        {/* Share Box */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Achievement
                </label>
                <select
                  value={selectedAchievement}
                  onChange={(e) => setSelectedAchievement(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select your achievement</option>
                  {achievements.map((ach) => (
                    <option key={ach.id} value={ach.id}>
                      {ach.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Caption
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Say something about your achievement..."
                  className="w-full mt-1 p-2 border rounded-md resize-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <button
                onClick={handleShare}
                disabled={!caption.trim() || !selectedAchievement}
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 disabled:opacity-50 transition"
              >
                <Send className="w-4 h-4" /> Share Achievement
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="hover:shadow-md transition">
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={post.userAvatar}
                      alt={post.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{post.userName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-md p-3 mb-3 bg-gray-50">
                    <div className="flex items-center gap-2 mb-1">
                      {post.achievement.icon}
                      <span className="font-semibold text-gray-800">
                        {post.achievement.title}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {post.achievement.description}
                    </p>
                  </div>

                  <p className="mb-3">{post.caption}</p>

                  <div className="flex items-center gap-3 border-t pt-3">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 text-sm transition ${
                        post.isLiked
                          ? "text-green-600"
                          : "text-gray-500 hover:text-green-600"
                      }`}
                    >
                      <Flame
                        className={`w-4 h-4 ${
                          post.isLiked ? "fill-green-500 text-green-600" : ""
                        }`}
                      />
                      {post.likes} Likes
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityFeed;
