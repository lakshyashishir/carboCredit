import express from 'express';
import { getPredictions, getRecommendations, getAnomalies } from '../controllers/aiController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/predictions', getPredictions);
router.get('/recommendations', getRecommendations);
router.get('/anomalies', getAnomalies);

export default router;