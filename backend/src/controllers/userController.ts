import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import { MINUTES_TO_KWH } from '../models/user';


// Get all users (admin)
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, avatar }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user (admin)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Leaderboard
export const getLeaderboard = async (req: Request, res: Response) => {
  const sortBy = req.query.sortBy || 'pomodorosCompleted';
  try {
    const users = await User.find().sort({ [sortBy as string]: -1 }).limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// For admin: Update user role
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get detailed user stats for dashboard
export const getUserStats = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const focusMinutes = user.pomodorosCompleted * 25; // assuming 25-min sessions
    const focusHours = Math.floor(focusMinutes / 60);
    const energyKwh = (user.energySaved * MINUTES_TO_KWH).toFixed(2);

    res.json({
      treesPlanted: user.treesPlanted,
      streak: user.streak,
      pomodorosCompleted: user.pomodorosCompleted,
      totalFocusHours: focusHours,
      energySavedKwh: energyKwh,
      name: user.username,
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};