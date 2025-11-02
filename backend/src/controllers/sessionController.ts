import { Request, Response } from 'express';
import User from '../models/user';
import Plant from '../models/plant';
import { MINUTES_TO_KWH } from '../models/user';

export const completeSession = async (req: Request, res: Response) => {
  const { userId, duration = 25, plantName, location, photo } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update stats
    user.pomodorosCompleted += 1;
    user.treesPlanted += 1;
    user.energySaved += duration;

    // Streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (user.lastPomodoroDate) {
      const last = new Date(user.lastPomodoroDate);
      last.setHours(0, 0, 0, 0);
      const diff = (today.getTime() - last.getTime()) / (1000 * 3600 * 24);
      user.streak = diff === 1 ? user.streak + 1 : diff > 1 ? 1 : user.streak;
    } else {
      user.streak = 1;
    }
    user.lastPomodoroDate = new Date();
    await user.save();

    // Create plant
    const plant = new Plant({
      userId,
      name: plantName || `Tree #${user.treesPlanted}`,
      location: location || { lat: 40.7128, lng: -74.0060 }, // default NYC
      photo,
    });
    await plant.save();

    // Populate for response
    const populatedPlant = await Plant.findById(plant._id).populate('userId', 'name avatar');

    res.json({
      message: 'Session completed!',
      user: {
        treesPlanted: user.treesPlanted,
        streak: user.streak,
        pomodorosCompleted: user.pomodorosCompleted,
        energySavedKwh: (user.energySaved * MINUTES_TO_KWH).toFixed(2),
      },
      plant: {
        _id: populatedPlant._id,
        name: populatedPlant.name,
        location: populatedPlant.location,
        photo: populatedPlant.photo,
        plantedBy: populatedPlant.userId.name,
        avatar: populatedPlant.userId.avatar,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};