import express from 'express';
import { getBalance, mintCarbonCredits, getTransactionHistory } from '../controllers/creditController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/balance', getBalance);
router.post('/mint', mintCarbonCredits); 
router.get('/history', getTransactionHistory);

export default router;