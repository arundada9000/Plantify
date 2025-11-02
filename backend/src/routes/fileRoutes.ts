import express from 'express';
import { uploadFile, getFile } from '../controllers/fileController';
import { upload } from '../middlewares/upload';
import { registerUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/', upload.array('files'), uploadFile);
router.get('/:id', getFile);
router.post("/register", registerUser);

export default router;
