import { Request, Response } from 'express';
import { uploadToCloudinary } from '../config/cloudinary';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.buffer, 'plantify');
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err: any) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};