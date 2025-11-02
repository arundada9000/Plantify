"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Leaf,
  Flame,
  Target,
  Award,
  Edit3,
  Save,
  X,
} from "lucide-react";

import { useAuth } from "@/context/auth-context";
import { ProtectedRoute } from "@/components/protected-route";
import { mockUserService, type UserStats } from "@/lib/mock-user-service";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ✅ Animation presets with type safety
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// ✅ Component
const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>("");
  const [editedPreferences, setEditedPreferences] = useState<string>("");

  useEffect(() => {
    if (user) void loadUserData();
  }, [user]);

  const loadUserData = async (): Promise<void> => {
    if (!user) return;
    setLoading(true);
    const stats = await mockUserService.getUserStats(user.id);
    setUserStats(stats);
    setEditedName(user.name);
    setEditedPreferences("Focus on deep work and minimize distractions.");
    setLoading(false);
  };

  const handleSave = async (): Promise<void> => {
    setIsEditing(false);
  };

  const handleLogout = async (): Promise<void> => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <main className="flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground"
          >
            Loading your profile...
          </motion.div>
        </main>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="mb-12 min-h-screen bg-gradient-to-b from-background via-muted/20 to-muted/40">
        {/* Header */}
        <motion.header
          className="border-b border-border bg-card/70 backdrop-blur-md sticky top-0 z-30"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
            <motion.h1
              className="text-3xl font-bold bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Profile
            </motion.h1>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-primary/10 transition-all"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </motion.header>

        <motion.section
          className="max-w-6xl mx-auto px-6 py-10 space-y-10"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Card */}
          <motion.div variants={fadeIn}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
            >
              <Card className="relative overflow-hidden border-border shadow-lg hover:shadow-2xl transition-all bg-card/80 backdrop-blur-md group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-8 flex flex-col md:flex-row gap-8 items-center relative z-10">
                  <motion.img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                      user?.name ?? "User"
                    }`}
                    alt={user?.name ?? "User avatar"}
                    className="w-28 h-28 rounded-full border-4 border-primary shadow-lg"
                    whileHover={{ rotate: 3 }}
                    transition={{ type: "spring", stiffness: 120 }}
                  />
                  <div className="flex-1 space-y-3 text-center md:text-left">
                    {isEditing ? (
                      <div className="space-y-4">
                        <Input
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="max-w-sm"
                        />
                        <div className="flex flex-wrap gap-3">
                          <Button
                            onClick={handleSave}
                            className="bg-primary hover:bg-primary/90"
                          >
                            <Save className="w-4 h-4 mr-2" /> Save
                          </Button>
                          <Button
                            onClick={() => setIsEditing(false)}
                            variant="outline"
                          >
                            <X className="w-4 h-4 mr-2" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold">{editedName}</h2>
                        <p className="text-muted-foreground">{user?.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Member since{" "}
                          {user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "—"}
                        </p>
                        <Button
                          variant="outline"
                          className="mt-2 transition-all hover:shadow-md"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
          >
            <StatCard
              title="Pomodoros"
              icon={<Target className="text-primary" />}
              value={userStats?.pomodorosCompleted ?? 0}
              desc="Focus sessions completed"
            />
            <StatCard
              title="Trees Planted"
              icon={<Leaf className="text-green-500" />}
              value={userStats?.treesPlanted ?? 0}
              desc="Your forest grows"
            />
            <StatCard
              title="Current Streak"
              icon={<Flame className="text-orange-500" />}
              value={userStats?.currentStreak ?? 0}
              desc="Days of focus"
            />
            <StatCard
              title="Energy Saved"
              icon={<Award className="text-yellow-500" />}
              value={userStats?.totalEnergySaved ?? 0}
              desc="Minutes saved"
            />
          </motion.div>

          {/* Preferences */}
          <motion.div variants={fadeIn}>
            <Card className="border-border bg-card/80 hover:bg-card/90 transition-all">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your focus style</CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedPreferences}
                    onChange={(e) => setEditedPreferences(e.target.value)}
                    className="resize-none"
                    rows={4}
                  />
                ) : (
                  <motion.p
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-muted-foreground"
                  >
                    {editedPreferences}
                  </motion.p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Forest Overview */}
          <motion.div variants={fadeIn}>
            <Card className="border-border bg-card/80 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle>Your Forest Overview</CardTitle>
                <CardDescription>Environmental impact summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    className="bg-gradient-to-b from-green-50 to-emerald-100 rounded-lg p-8 flex flex-col items-center justify-center shadow-inner"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 120 }}
                  >
                    <motion.div
                      className="text-5xl mb-3"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                    >
                      {userStats?.treesPlanted && userStats.treesPlanted > 0
                        ? "🌲".repeat(Math.min(userStats.treesPlanted, 5))
                        : "🌱"}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-primary">
                      {userStats?.treesPlanted ?? 0} Trees
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Growing your digital forest
                    </p>
                  </motion.div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <ImpactStat
                      label="Total Focus Time"
                      value={`${(userStats?.pomodorosCompleted ?? 0) * 25} min`}
                    />
                    <ImpactStat
                      label="Device Time Saved"
                      value={`${userStats?.totalEnergySaved ?? 0} min`}
                    />
                    <ImpactStat
                      label="Longest Streak"
                      value={`${userStats?.longestStreak ?? 0} days`}
                    />
                    <ImpactStat
                      label="CO₂ Saved"
                      value={`${Math.round(
                        (userStats?.totalEnergySaved ?? 0) * 0.05
                      )} kg`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </main>
    </ProtectedRoute>
  );
};

// 🔹 Reusable Components
interface StatCardProps {
  title: string;
  icon: React.ReactNode;
  value?: number;
  desc: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, icon, value, desc }) => (
  <motion.div
    variants={fadeIn}
    whileHover={{
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    }}
    transition={{ type: "spring", stiffness: 150, damping: 12 }}
  >
    <Card className="relative overflow-hidden border-border hover:border-primary/40 bg-card/80 backdrop-blur-sm transition-all">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-3xl font-bold text-primary">{value ?? 0}</p>
        <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      </CardContent>
    </Card>
  </motion.div>
);

interface ImpactStatProps {
  label: string;
  value: string;
}

const ImpactStat: React.FC<ImpactStatProps> = ({ label, value }) => (
  <motion.div
    whileHover={{
      scale: 1.05,
      backgroundColor: "rgba(0, 255, 100, 0.05)",
    }}
    transition={{ type: "spring", stiffness: 120, damping: 10 }}
    className="p-4 bg-accent/10 border border-accent rounded-lg text-center transition-colors"
  >
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-xl font-bold text-primary">{value}</p>
  </motion.div>
);

export default ProfilePage;
