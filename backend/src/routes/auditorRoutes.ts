import express from 'express';
import { getPendingVerifications, getApprovedVerifications, approveVerification, rejectVerification } from '../controllers/auditorController';
import { authMiddleware, auditorMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);
router.use(auditorMiddleware);

router.get('/pending', getPendingVerifications);
router.get('/approved', getApprovedVerifications);
router.post('/approve/:requestId', approveVerification);
router.post('/reject/:requestId', rejectVerification);

export default router;