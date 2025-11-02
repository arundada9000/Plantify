"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Sprout, Trees, Target, Zap, Leaf } from "lucide-react"
import type { Badge, UserStats } from "@/lib/mock-user-service"

interface StreaksAndBadgesProps {
  stats: UserStats
}

const BADGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Sprout: Sprout,
  Trees: Trees,
  LeafyGreen: Leaf,
  Flame: Flame,
  Zap: Zap,
  Target: Target,
  Leaf: Leaf,
}

export function StreaksAndBadges({ stats }: StreaksAndBadgesProps) {
  const [badges, setBadges] = useState<Badge[]>(stats.badges)

  useEffect(() => {
    setBadges(stats.badges)
  }, [stats.badges])

  const getStreakColor = (streak: number) => {
    if (streak >= 10) return "text-orange-500"
    if (streak >= 5) return "text-yellow-500"
    return "text-red-500"
  }

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Start a Pomodoro to begin your streak!"
    if (streak === 1) return "You're on fire! Keep it up!"
    if (streak < 5) return "Building momentum!"
    if (streak < 10) return "Unstoppable! Almost there!"
    return "Legend status achieved!"
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-accent" />
            Daily Streak
          </CardTitle>
          <CardDescription>Keep the momentum going</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center py-6 bg-muted/50 rounded-lg border border-border">
              <p className={`text-5xl font-bold ${getStreakColor(stats.currentStreak)}`}>{stats.currentStreak}</p>
              <p className="text-sm text-muted-foreground mt-2">days</p>
            </div>
            <div>
              <p className="text-sm text-foreground font-medium">{getStreakMessage(stats.currentStreak)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Longest streak: <span className="font-semibold text-foreground">{stats.longestStreak}</span> days
              </p>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-8 rounded flex items-center justify-center text-xs font-semibold ${
                    i < stats.currentStreak ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-primary" />
            Badges & Achievements
          </CardTitle>
          <CardDescription>Earn rewards by hitting milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {badges.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">Start completing Pomodoros to unlock badges!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {badges.map((badge) => {
                  const IconComponent = BADGE_ICONS[badge.icon as keyof typeof BADGE_ICONS] || Sprout
                  return (
                    <div
                      key={badge.id}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors group cursor-default"
                      title={badge.description}
                    >
                      <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-xs font-semibold text-foreground text-center line-clamp-2">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(badge.earnedAt).toLocaleDateString()}</p>
                    </div>
                  )
                })}
              </div>
            )}

            {badges.length > 0 && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  You have earned {badges.length} badge{badges.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
