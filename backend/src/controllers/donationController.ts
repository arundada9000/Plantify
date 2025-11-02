import { Request, Response } from 'express';
import Donation, { IDonation } from '../models/donation';

// Get all donations (admin or user-specific)
export const getDonations = async (req: Request, res: Response) => {
  try {
    const query = req.query.userId ? { userId: req.query.userId } : {};
    const donations = await Donation.find(query).populate('userId', 'name');
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create donation
export const createDonation = async (req: Request, res: Response) => {
  try {
    const { userId, amount, cause } = req.body;
    const donation = new Donation({ userId, amount, cause });
    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update donation (admin)
export const updateDonation = async (req: Request, res: Response) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete donation (admin)
export const deleteDonation = async (req: Request, res: Response) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.json({ message: 'Donation deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};