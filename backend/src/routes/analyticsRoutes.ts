import express from 'express';
import { getEmissionAnalytics, getCreditAnalytics, getMarketAnalytics } from '../controllers/analyticsController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/emissions', getEmissionAnalytics);
router.get('/credits', getCreditAnalytics);
router.get('/market', getMarketAnalytics);

export default router;