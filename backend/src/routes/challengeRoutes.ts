import express from 'express';
import { getChallenges, createChallenge, updateChallenge, deleteChallenge } from '../controllers/challengeController';

const router = express.Router();

router.get('/', getChallenges);
router.post('/', createChallenge); // Admin
router.put('/:id', updateChallenge); // Admin
router.delete('/:id', deleteChallenge); // Admin

export default router;