"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Flame, Leaf, Target, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  {
    title: "Trees Planted",
    description: "Total trees in your forest",
    icon: <Leaf className="w-6 h-6 text-green-500" />,
    value: 42,
    color: "from-green-400 to-emerald-500",
    message: "Each Pomodoro grows your virtual forest 🌳",
  },
  {
    title: "Current Streak",
    description: "Days of focus maintained",
    icon: <Flame className="w-6 h-6 text-orange-500" />,
    value: 7,
    color: "from-orange-400 to-red-500",
    message: "Keep the momentum burning! 🔥",
  },
  {
    title: "Pomodoros Completed",
    description: "Focus sessions done",
    icon: <Target className="w-6 h-6 text-blue-500" />,
    value: 132,
    color: "from-sky-400 to-indigo-500",
    message: "Your focus power is leveling up ⚡",
  },
  {
    title: "Total Focus Hours",
    description: "Time invested in deep work",
    icon: <Clock className="w-6 h-6 text-purple-500" />,
    value: "48h",
    color: "from-purple-400 to-fuchsia-500",
    message: "That’s nearly 2 full days of focus ⏱️",
  },
  {
    title: "Energy Saved",
    description: "Power saved by using eco mode",
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    value: "3.2 kWh",
    color: "from-yellow-400 to-amber-500",
    message: "You helped reduce CO₂ emissions 🌍",
  },
];

const MotionCard = motion(Card);

const Page = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="mb-8 min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4 md:px-10"
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-6xl mx-auto text-center mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 via-sky-500 to-purple-500 bg-clip-text text-transparent">
          Your Productivity Forest 🌱
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          Track your focus, growth, and sustainability impact — beautifully.
        </p>
      </motion.div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <MotionCard
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden border border-border shadow-md bg-card/80 backdrop-blur-lg transition-all duration-300 hover:shadow-xl group"
            >
              {/* Subtle Gradient Overlay */}
              <div
                className={`absolute inset-0 opacity-10 bg-gradient-to-br ${stat.color}`}
              />

              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
              />

              <CardHeader className="flex flex-col items-start gap-3 z-10">
                <div className="flex items-center gap-3">
                  {stat.icon}
                  <CardTitle className="text-lg font-semibold">
                    {stat.title}
                  </CardTitle>
                </div>
                <CardDescription>{stat.description}</CardDescription>
              </CardHeader>

              <CardContent className="z-10">
                <motion.p
                  className={`text-4xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-muted-foreground mt-3">
                  {stat.message}
                </p>
              </CardContent>
            </MotionCard>
          </motion.div>
        ))}
      </div>

      {/* CALL TO ACTION */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(52, 211, 153, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-green-400/40 transition-all duration-300"
          >
            Start New Pomodoro
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Page;
