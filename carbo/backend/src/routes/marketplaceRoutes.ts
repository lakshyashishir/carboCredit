import express from 'express';
import { getListings, createListing, buyCredits, sellCredits } from '../controllers/marketplaceController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/listings', getListings);
router.post('/create-listing', createListing);
router.post('/buy', buyCredits);
router.post('/sell', sellCredits);

export default router;