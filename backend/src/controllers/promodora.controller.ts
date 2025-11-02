import { Request, Response } from "express";
import { Pomodoro } from "../models/promodora.modal";

// Create a new pomodoro session
export const createPomodoro = async (req: Request, res: Response) => {
  try {
    const pomodoro = await Pomodoro.create(req.body);
    res.status(201).json({ success: true, data: pomodoro });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating Pomodoro", error });
  }
};

// Get all sessions
export const getAllPomodoros = async (_req: Request, res: Response) => {
  try {
    const pomodoros = await Pomodoro.find().sort({ createdAt: -1 });
    res.json({ success: true, data: pomodoros });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching sessions", error });
  }
};

// Start a session
export const startPomodoro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await Pomodoro.findByIdAndUpdate(
      id,
      { status: "running" },
      { new: true }
    );
    res.json({ success: true, message: "Pomodoro started", data: session });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to start session", error });
  }
};

// Pause a session
export const pausePomodoro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await Pomodoro.findByIdAndUpdate(
      id,
      { status: "paused" },
      { new: true }
    );
    res.json({ success: true, message: "Pomodoro paused", data: session });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to pause session", error });
  }
};

// Resume a session
export const resumePomodoro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await Pomodoro.findByIdAndUpdate(
      id,
      { status: "running" },
      { new: true }
    );
    res.json({ success: true, message: "Pomodoro resumed", data: session });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to resume session", error });
  }
};

// Complete or move to next round
export const completeRound = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await Pomodoro.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.currentRound += 1;
    if (session.currentRound >= session.rounds) {
      session.status = "completed";
    } else {
      session.status = "idle";
    }
    await session.save();

    res.json({ success: true, message: "Round completed", data: session });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error completing round", error });
  }
};

// Delete a session
export const deletePomodoro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Pomodoro.findByIdAndDelete(id);
    res.json({ success: true, message: "Pomodoro deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting session", error });
  }
};
