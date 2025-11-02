"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Leaf, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFetchUsers } from "@/hooks/userData";

interface TimerConfig {
  focusMinutes: number;
  breakMinutes: number;
  type: "focus" | "break";
}

export default function PomodoroTimer() {
  useFetchUsers();

  const [users, setUsers] = useState([]);
  const [showPlantedGif, setShowPlantedGif] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const [config, setConfig] = useState<TimerConfig>({
    focusMinutes: 25,
    breakMinutes: 5,
    type: "focus",
  });

  const [seconds, setSeconds] = useState(config.focusMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalEnergySaved, setTotalEnergySaved] = useState(0);

  const presets = [25, 50, 90];

  // Energy tips array
  const energyTips = [
    "Turn off unused devices to save energy 🌱",
    "Use natural light whenever possible ☀️",
    "Unplug chargers when not in use 🔌",
    "Keep your computer on power-saving mode 💻",
    "Avoid overcharging devices ⚡",
    "Use fans instead of AC when possible 🍃",
  ];

  // Tip notification state
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState("");

  // Show tip when timer starts
  useEffect(() => {
    if (!isRunning) return;

    const randomTip = energyTips[Math.floor(Math.random() * energyTips.length)];
    setCurrentTip(randomTip);
    setShowTip(true);

    const timeout = setTimeout(() => setShowTip(false), 5000);

    return () => clearTimeout(timeout);
  }, [isRunning]);

  // Main timer effect
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000); // decrement by 1 per second

    if (seconds === 0) {
      clearInterval(interval);
      setIsRunning(false);

      // Play sound
      const audio = new Audio("/sounds/completed.mp3");
      audio.play().catch(() => console.warn("Sound play failed"));

      if (config.type === "focus") {
        setShowLoader(true);
        setCompletedSessions((prev) => prev + 1);
        setTotalEnergySaved((prev) => prev + config.focusMinutes);

        setTimeout(() => {
          setShowLoader(false);

          // Show GIF
          setShowPlantedGif(true);

          setTimeout(() => {
            setShowPlantedGif(false);
            setShowCompletionModal(true);
            switchToBreak();
          }, 4000); // GIF duration
        }, 3000); // Loader duration
      } else {
        switchToFocus();
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds, config.type, config.focusMinutes]);

  const switchToBreak = () => {
    setConfig((prev) => ({ ...prev, type: "break" }));
    setSeconds(config.breakMinutes * 60);
  };

  const switchToFocus = () => {
    setConfig((prev) => ({ ...prev, type: "focus" }));
    setSeconds(config.focusMinutes * 60);
  };

  const handlePreset = (minutes: number) => {
    setConfig((prev) => ({ ...prev, focusMinutes: minutes }));
    setSeconds(minutes * 60);
    setIsRunning(false);
  };

  const handleCustom = () => {
    const min = Number.parseInt(customMinutes);
    if (!min || min < 20) {
      alert("Custom time must be at least 20 minutes 🌱");
      return;
    }
    setConfig((prev) => ({ ...prev, focusMinutes: min }));
    setSeconds(min * 60);
    setIsRunning(false);
    setCustomMinutes("");
    setShowCustomDialog(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(config.focusMinutes * 60);
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const displayTime = `${String(minutes).padStart(2, "0")}:${String(
    secs
  ).padStart(2, "0")}`;

  const totalSeconds =
    config.type === "focus"
      ? config.focusMinutes * 60
      : config.breakMinutes * 60;
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;

  return (
    <div className="w-full md:min-h-screen min-h-200 flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 px-4">
      {/* Energy Tip Notification */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={showTip ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="fixed top-20 right-10 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded-lg shadow-md z-50"
      >
        {currentTip}
      </motion.div>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-700 flex items-center justify-center gap-2">
          <Leaf className="w-7 h-7 text-green-600" />
          Plantify Pomodoro
        </h1>
        <p className="text-green-600 mt-2">
          {config.type === "focus"
            ? "Stay focused and grow your virtual plant 🌱"
            : "Take a short break to recharge 🍃"}
        </p>
      </div>

      {/* Loader */}
      {showLoader && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-50/80 backdrop-blur-sm z-50">
          <motion.div
            className="w-24 h-24 rounded-full bg-green-400/40 relative overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.2,
            }}
          >
            <motion.div
              className="absolute bottom-0 w-full bg-green-500/60"
              style={{ height: "60%" }}
              animate={{
                y: ["0%", "-15%", "0%"],
                borderRadius: ["50% 50% 0 0", "40% 60% 0 0", "50% 50% 0 0"],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
          <motion.p
            className="text-green-800 font-medium mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Growing your forest... 🌿
          </motion.p>
        </div>
      )}

      {/* Planted GIF overlay */}
      {showPlantedGif && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <img
            src="/gifs/planted.gif"
            alt="Planted GIF"
            className="w-72 h-72 rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* Timer Circle */}
      <div
        className="relative w-60 h-60 mb-8 cursor-pointer group"
        onClick={() => !isRunning && setShowCustomDialog(true)}
      >
        <svg
          className="absolute top-0 left-0 w-full h-full -rotate-90"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#e0f2e9"
            strokeWidth="10"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={config.type === "focus" ? "#4CAF50" : "#81C784"}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * 565.48} 565.48`}
            animate={{ strokeDasharray: `${(progress / 100) * 565.48} 565.48` }}
            transition={{ duration: 0.5 }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={displayTime}
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-5xl font-bold text-green-800"
          >
            {displayTime}
          </motion.div>
          <p className="text-sm text-green-600 mt-2 uppercase tracking-wide">
            {config.type === "focus" ? "Focus Mode" : "Break Mode"}
          </p>

          {!isRunning && (
            <motion.div
              className="absolute bottom-6 text-xs text-green-500 opacity-0 group-hover:opacity-100 transition-all"
              initial={{ y: 5 }}
              animate={{ y: 0 }}
            >
              <Clock className="inline w-4 h-4 mr-1" />
              Click to set custom time
            </motion.div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <Button
          onClick={toggleTimer}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg"
        >
          {isRunning ? (
            <Pause className="w-5 h-5 m-2" />
          ) : (
            <Play className="w-5 h-5 m-2" />
          )}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-green-400 text-green-700 hover:bg-green-100 px-5 py-3 rounded-xl text-lg"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Presets */}
      {!isRunning && (
        <div className="w-full max-w-md mb-10 text-center">
          <p className="text-sm text-green-700 mb-2 font-medium">Presets</p>
          <div className="grid grid-cols-3 gap-3">
            {presets.map((p) => (
              <Button
                key={p}
                onClick={() => handlePreset(p)}
                className={`rounded-lg py-2 ${
                  config.focusMinutes === p
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                {p}m
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      {!isRunning && (
        <div className="grid grid-cols-2 gap-8 text-center">
          <div>
            <p className="text-sm text-green-600">Sessions Completed</p>
            <p className="text-2xl font-bold text-green-700">
              {completedSessions}
            </p>
          </div>
          <div>
            <p className="text-sm text-green-600">Energy Saved</p>
            <p className="text-2xl font-bold text-green-700">
              {totalEnergySaved} min
            </p>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      <Dialog open={showCompletionModal} onOpenChange={setShowCompletionModal}>
        <DialogContent className="sm:max-w-md bg-green-50 border-green-200 shadow-xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-6 py-6"
          >
            <DialogHeader>
              <DialogTitle className="text-3xl font-semibold text-green-800">
                Great Job! 🌿
              </DialogTitle>
            </DialogHeader>

            <motion.div
              className="text-6xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              🌱
            </motion.div>

            <p className="text-green-700 text-lg font-medium">
              You just saved {config.focusMinutes} minutes of energy!
            </p>

            <Button
              onClick={() => setShowCompletionModal(false)}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-2"
            >
              Continue
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Custom Time Modal */}
      <Dialog open={showCustomDialog} onOpenChange={setShowCustomDialog}>
        <DialogContent className="sm:max-w-sm bg-green-50 border-green-200 shadow-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-green-800">
              Set Custom Focus Time
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <input
              type="number"
              min="20"
              max="180"
              placeholder="Enter minutes (min 20)"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-green-300 text-green-800 focus:ring-2 focus:ring-green-400 focus:outline-none text-center"
            />
            <Button
              onClick={handleCustom}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Set Timer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
