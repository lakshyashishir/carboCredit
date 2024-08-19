import express from 'express';
import { getBalance, mintCredits, getTransactionHistory } from '../controllers/creditController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/balance', getBalance);
router.post('/mint', mintCredits);
router.get('/history', getTransactionHistory);

export default router;