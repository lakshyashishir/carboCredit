import { Request, Response, NextFunction } from 'express';
import { authenticateUser } from '../services/authService';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const walletAddress = req.headers['x-wallet-address'] as string;

    if (!walletAddress) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const user = await authenticateUser(walletAddress);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
}

export const auditorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== 'auditor') {
      return res.status(403).json({ error: 'Access denied. Auditor role required.' });
    }
    next();
  };