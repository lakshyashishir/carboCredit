import express from 'express';
import { submitVerificationRequest, getVerificationRequests, approveVerificationRequest } from '../controllers/verificationController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/submit', authMiddleware, submitVerificationRequest);
router.get('/requests', authMiddleware, getVerificationRequests);
router.post('/approve/:requestId', authMiddleware, approveVerificationRequest);

export default router;