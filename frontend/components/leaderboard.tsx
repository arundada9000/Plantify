"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Flame, Leaf } from "lucide-react";
import { mockUserService, type UserStats } from "@/lib/mock-user-service";
import { mockAdminService } from "@/lib/mock-admin-service";
import type { User } from "@/lib/auth-types";
import { motion } from "framer-motion";

interface LeaderboardEntry {
  user: User;
  stats: UserStats;
  rank: number;
}

export function Leaderboard() {
  const [pomodoros, setPomodoros] = useState<LeaderboardEntry[]>([]);
  const [trees, setTrees] = useState<LeaderboardEntry[]>([]);
  const [energy, setEnergy] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboards();
  }, []);

  const loadLeaderboards = async () => {
    setLoading(true);
    try {
      const [users, allStats] = await Promise.all([
        mockAdminService.getAllUsers(),
        mockUserService.getAllUserStats(),
      ]);

      const entries = users.map((user) => ({
        user,
        stats: allStats.find((s) => s.userId === user.id) || {
          userId: user.id,
          pomodorosCompleted: 0,
          treesPlanted: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalEnergySaved: 0,
          lastFocusDate: null,
          badges: [],
          id: "",
          createdAt: "",
        },
      }));

      // Sort by different metrics
      const pomodoroRanked = [...entries]
        .sort((a, b) => b.stats.pomodorosCompleted - a.stats.pomodorosCompleted)
        .map((entry, idx) => ({ ...entry, rank: idx + 1 }));

      const treeRanked = [...entries]
        .sort((a, b) => b.stats.treesPlanted - a.stats.treesPlanted)
        .map((entry, idx) => ({ ...entry, rank: idx + 1 }));

      const energyRanked = [...entries]
        .sort((a, b) => b.stats.totalEnergySaved - a.stats.totalEnergySaved)
        .map((entry, idx) => ({ ...entry, rank: idx + 1 }));

      setPomodoros(pomodoroRanked);
      setTrees(treeRanked);
      setEnergy(energyRanked);
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Trophy className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Trophy className="w-6 h-6 text-orange-500" />;
    return <span className="font-semibold text-green-700">{rank}</span>;
  };

  const LeaderboardTable = ({
    entries,
    metric,
  }: {
    entries: LeaderboardEntry[];
    metric: "pomodoros" | "trees" | "energy";
  }) => (
    <div className="space-y-2 ">
      {entries.map((entry, idx) => (
        <motion.div
          key={entry.user.id}
          className={` flex items-center gap-4 p-3 rounded-xl transition-all border border-green-200 ${
            idx % 2 === 0 ? "bg-green-50" : "bg-green-100"
          } hover:bg-green-200 shadow-sm`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-center w-12 h-12 text-lg font-bold">
            {getRankBadge(entry.rank)}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-green-800">{entry.user.name}</p>
            <p className="text-xs text-green-600">{entry.user.email}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-green-700 text-lg">
              {metric === "pomodoros"
                ? entry.stats.pomodorosCompleted
                : metric === "trees"
                ? entry.stats.treesPlanted
                : entry.stats.totalEnergySaved}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <Card className="bg-green-50 border-green-200 shadow-lg rounded-xl">
        <CardContent className="py-8 text-center text-green-700 font-medium">
          Loading leaderboards...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className=" border-green-200 rounded-xl bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl text-green-800">
          Leaderboards
        </CardTitle>
        <CardDescription className="text-green-700">
          Top performers across different categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pomodoros" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-green-100 rounded-xl p-1">
            <TabsTrigger
              value="pomodoros"
              className="flex items-center justify-center gap-2 font-medium text-green-800"
            >
              <span className="hidden sm:inline">Pomodoros</span>
              <Trophy className="w-4 h-4 sm:hidden text-green-800" />
            </TabsTrigger>
            <TabsTrigger
              value="trees"
              className="flex items-center justify-center gap-2 font-medium text-green-800"
            >
              <span className="hidden sm:inline">Trees Planted</span>
              <Leaf className="w-4 h-4 sm:hidden text-green-800" />
            </TabsTrigger>
            <TabsTrigger
              value="energy"
              className="flex items-center justify-center gap-2 font-medium text-green-800"
            >
              <span className="hidden sm:inline">Energy Saved</span>
              <Flame className="w-4 h-4 sm:hidden text-green-800" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pomodoros" className="mt-6">
            <LeaderboardTable entries={pomodoros} metric="pomodoros" />
          </TabsContent>

          <TabsContent value="trees" className="mt-6">
            <LeaderboardTable entries={trees} metric="trees" />
          </TabsContent>

          <TabsContent value="energy" className="mt-6">
            <LeaderboardTable entries={energy} metric="energy" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
