import express from 'express';
import { getDonations, createDonation, updateDonation, deleteDonation } from '../controllers/donationController';

const router = express.Router();

router.get('/', getDonations);
router.post('/', createDonation);
router.put('/:id', updateDonation); // Admin
router.delete('/:id', deleteDonation); // Admin

export default router;