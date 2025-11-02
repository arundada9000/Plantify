import express from 'express';
import { getAdminStats, getAnalytics } from '../controllers/adminController';

const router = express.Router();

router.get('/stats', getAdminStats);
router.get('/analytics', getAnalytics);

export default router;