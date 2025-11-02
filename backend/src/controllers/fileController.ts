import { Request, Response } from 'express';
import cloudinary, { uploadToCloudinary } from '../config/cloudinary';
import File from '../models/file';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const inputFiles = req.files as Express.Multer.File[];
    if (!inputFiles || inputFiles.length === 0) {
      return res.status(400).json({ message: 'No file uploaded' });
    }


    const uploadResults = await Promise.all(
    inputFiles.map((file ) =>uploadToCloudinary(file.buffer, 'uploads'))
    )


    const savedFiles = await Promise.all(
      uploadResults.map((r) => File.create({
        publicId: r.public_id,
        url: r.secure_url, 
        originalName: inputFiles
      }))
    )

     res.status(201).json(savedFiles);

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFile = async (req: Request, res: Response) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


