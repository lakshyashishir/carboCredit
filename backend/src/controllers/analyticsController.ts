import { Request, Response } from 'express';
import { supabase } from '../config/database';

export const getEmissionAnalytics = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('emissions')
            .select('amount, category, date')
            .eq('userId', userId)
            .order('date', { ascending: true });

        if (error) throw error;

        // Simple analytics: total emissions per category
        const analytics = data.reduce((acc, emission) => {
            acc[emission.category] = (acc[emission.category] || 0) + emission.amount;
            return acc;
        }, {});

        res.status(200).json(analytics);
    } catch (error) {
        res.status(400).json({ error: 'Failed to get emission analytics' });
    }
};

export const getCreditAnalytics = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('credits')
            .select('amount, transactionType, createdAt')
            .eq('userId', userId)
            .order('createdAt', { ascending: true });

        if (error) throw error;

        // Simple analytics: total credits per transaction type
        const analytics = data.reduce((acc, credit) => {
            acc[credit.transactionType] = (acc[credit.transactionType] || 0) + credit.amount;
            return acc;
        }, {});

        res.status(200).json(analytics);
    } catch (error) {
        res.status(400).json({ error: 'Failed to get credit analytics' });
    }
};

export const getMarketAnalytics = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('marketplace_listings')
            .select('price, amount, status, createdAt')
            .order('createdAt', { ascending: true });

        if (error) throw error;

        // Simple analytics: average price and total volume
        const analytics = data.reduce((acc, listing) => {
            acc.totalVolume += listing.amount;
            acc.totalValue += listing.price * listing.amount;
            return acc;
        }, { totalVolume: 0, totalValue: 0 });

        analytics.averagePrice = analytics.totalValue / analytics.totalVolume;

        res.status(200).json(analytics);
    } catch (error) {
        res.status(400).json({ error: 'Failed to get market analytics' });
    }
};