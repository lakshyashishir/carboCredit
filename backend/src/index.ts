import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import emissionRoutes from './routes/emissionRoutes';
import creditRoutes from './routes/creditRoutes';
import marketplaceRoutes from './routes/marketplaceRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import aiRoutes from './routes/aiRoutes';
import verificationRoutes from './routes/verificationRoutes';
import auditorRoutes from './routes/auditorRoutes';
import {errorHandler} from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/emissions', emissionRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/auditor', auditorRoutes);

app.use(errorHandler);

export default app;