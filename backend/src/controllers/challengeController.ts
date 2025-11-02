import { Request, Response } from 'express';
import Challenge, { IChallenge } from '../models/challenge';

// Get all challenges
export const getChallenges = async (req: Request, res: Response) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create challenge (admin)
export const createChallenge = async (req: Request, res: Response) => {
  try {
    const { name, description, startDate, endDate, goal } = req.body;
    const challenge = new Challenge({ name, description, startDate, endDate, goal });
    await challenge.save();
    res.status(201).json(challenge);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update challenge (admin)
export const updateChallenge = async (req: Request, res: Response) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete challenge (admin)
export const deleteChallenge = async (req: Request, res: Response) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
    res.json({ message: 'Challenge deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};