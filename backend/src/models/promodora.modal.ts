import mongoose, { Schema, Document } from "mongoose";

export interface IPomodoro extends Document {
  taskName: string;
  focusTime: number; // in minutes
  shortBreak: number;
  longBreak: number;
  rounds: number;
  currentRound: number;
  status: "idle" | "running" | "paused" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const PomodoroSchema: Schema = new Schema(
  {
    taskName: { type: String, required: true },
    focusTime: { type: Number, default: 25 },
    shortBreak: { type: Number, default: 5 },
    longBreak: { type: Number, default: 15 },
    rounds: { type: Number, default: 4 },
    currentRound: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["idle", "running", "paused", "completed"],
      default: "idle",
    },
  },
  { timestamps: true }
);

export const Pomodoro = mongoose.model<IPomodoro>("Pomodoro", PomodoroSchema);
