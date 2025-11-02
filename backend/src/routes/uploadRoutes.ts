import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController';

const router = express.Router();
const upload = multer(); // memory storage

router.post('/', upload.single('image'), uploadImage);

export default router;