import { Request, Response } from 'express';
import Plant, { IPlant } from '../models/plant';


// Get plant by ID
export const getPlantById = async (req: Request, res: Response) => {
  try {
    const plant = await Plant.findById(req.params.id).populate('userId', 'name');
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.json(plant);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create plant (called on Pomodoro completion)
export const createPlant = async (req: Request, res: Response) => {
  try {
    const { userId, name, location, photo } = req.body;
    const plant = new Plant({ userId, name, location, photo });
    await plant.save();
    res.status(201).json(plant);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update plant (admin)
export const updatePlant = async (req: Request, res: Response) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.json(plant);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete plant (admin)
export const deletePlant = async (req: Request, res: Response) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.json({ message: 'Plant deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPlants = async (req: Request, res: Response) => {
  try {
    const plants = await Plant.find()
      .populate({
        path: 'userId',
        select: 'name avatar',
      })
      .sort({ datePlanted: -1 });

    res.json(
      plants.map((p: any) => ({
        _id: p._id,
        name: p.name,
        location: p.location,
        datePlanted: p.datePlanted,
        photo: p.photo,
        plantedBy: p.userId.name,
        avatar: p.userId.avatar,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};