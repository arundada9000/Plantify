import { Request, Response } from 'express';
import Partner, { IPartner } from '../models/partner';

// Get all partners
export const getPartners = async (req: Request, res: Response) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get partner by ID
export const getPartnerById = async (req: Request, res: Response) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.json(partner);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create partner (admin)
export const createPartner = async (req: Request, res: Response) => {
  try {
    const { name, logo, description, link } = req.body;
    const partner = new Partner({ name, logo, description, link });
    await partner.save();
    res.status(201).json(partner);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update partner (admin)
export const updatePartner = async (req: Request, res: Response) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.json(partner);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete partner (admin)
export const deletePartner = async (req: Request, res: Response) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.json({ message: 'Partner deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};