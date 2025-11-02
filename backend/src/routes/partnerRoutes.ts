import express from 'express';
import { getPartners, getPartnerById, createPartner, updatePartner, deletePartner } from '../controllers/partnerController';

const router = express.Router();

router.get('/', getPartners);
router.get('/:id', getPartnerById);
router.post('/', createPartner); // Admin
router.put('/:id', updatePartner); // Admin
router.delete('/:id', deletePartner); // Admin

export default router;