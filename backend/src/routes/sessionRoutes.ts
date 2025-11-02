import express from 'express';
import { completeSession } from '../controllers/sessionController';

const router = express.Router();

router.post('/complete', completeSession);

export default router;