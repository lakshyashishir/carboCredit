import express from 'express';
import { reportEmission, getEmissionHistory, getTotalEmissions } from '../controllers/emissionController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.post('/report', reportEmission);
router.get('/history', getEmissionHistory);
router.get('/total', getTotalEmissions);

export default router;