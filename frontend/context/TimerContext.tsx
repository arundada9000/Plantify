"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TimerContextType {
  isRunning: boolean;
  setIsRunning: (value: boolean) => void;
  toggleTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider = ({ children }: TimerProviderProps) => {
  const [isRunning, setIsRunning] = useState(false);

  const toggleTimer = () => setIsRunning((prev) => !prev);

  return (
    <TimerContext.Provider value={{ isRunning, setIsRunning, toggleTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
