import { Request, Response } from 'express';
import User from '../models/user';
import Post from '../models/post';
import Plant from '../models/plant';
import Donation from '../models/donation';

// Admin dashboard stats
export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTrees = await Plant.countDocuments();
    const totalPomodoros = await User.aggregate([{ $group: { _id: null, total: { $sum: '$pomodorosCompleted' } } }]);
    const totalDonations = await Donation.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);

    res.json({
      totalUsers,
      totalTrees,
      totalPomodoros: totalPomodoros[0]?.total || 0,
      totalDonations: totalDonations[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Analytics data (simple aggregates)
export const getAnalytics = async (req: Request, res: Response) => {
  try {
    // Example: Pomodoros per day, etc. For now, total aggregates
    const activeUsers = await User.countDocuments({ pomodorosCompleted: { $gt: 0 } });
    const totalEnergySaved = await User.aggregate([{ $group: { _id: null, total: { $sum: '$energySaved' } } }]);
    const plantGrowth = await Plant.countDocuments(); // Or more complex queries

    res.json({
      activeUsers,
      totalEnergySaved: totalEnergySaved[0]?.total || 0,
      plantGrowth,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};