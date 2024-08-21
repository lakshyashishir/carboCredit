import express from 'express';
import { 
    getEmissionPredictions, 
    getEmissionRecommendations, 
    getEmissionAnomalies 
} from '../controllers/aiController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/predictions', getEmissionPredictions);
router.get('/recommendations', getEmissionRecommendations);
router.get('/anomalies', getEmissionAnomalies);

export default router;