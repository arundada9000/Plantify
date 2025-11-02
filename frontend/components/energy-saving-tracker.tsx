"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Leaf } from "lucide-react"
import { ENERGY_TIPS } from "@/lib/mock-user-service"

interface EnergySavingTrackerProps {
  totalEnergySaved: number
}

export function EnergySavingTracker({ totalEnergySaved }: EnergySavingTrackerProps) {
  const [randomTip, setRandomTip] = useState<string>("")

  useEffect(() => {
    setRandomTip(ENERGY_TIPS[Math.floor(Math.random() * ENERGY_TIPS.length)])
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            Energy Saved
          </CardTitle>
          <CardDescription>Minutes of energy preserved</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-4xl font-bold text-primary">{totalEnergySaved}</p>
              <p className="text-sm text-muted-foreground mt-1">minutes saved</p>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">
                That's equivalent to {Math.round(totalEnergySaved / 60)} hours of device time saved!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            Energy-Saving Tip
          </CardTitle>
          <CardDescription>Quick ways to save energy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-foreground font-medium">{randomTip}</p>
            <button
              onClick={() => setRandomTip(ENERGY_TIPS[Math.floor(Math.random() * ENERGY_TIPS.length)])}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Get another tip
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
