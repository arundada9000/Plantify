import express from 'express';
import { getPlants, getPlantById, createPlant, updatePlant, deletePlant } from '../controllers/plantController';

const router = express.Router();

router.get('/', getPlants);
router.get('/:id', getPlantById);
router.post('/', createPlant); // Called internally or by admin
router.put('/:id', updatePlant); // Admin
router.delete('/:id', deletePlant); // Admin

export default router;