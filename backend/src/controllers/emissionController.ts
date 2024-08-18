import { Request, Response } from 'express';
import { supabase } from '../config/database';
import { Emission } from '../models/Emission';

export const reportEmission = async (req: Request, res: Response) => {
    try {
        const { amount, category, description } = req.body;
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('emissions')
            .insert({ userId, amount, category, description, date: new Date() })
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to report emission' });
    }
};

export const getEmissionHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('emissions')
            .select('*')
            .eq('userId', userId)
            .order('date', { ascending: false });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to get emission history' });
    }
};

export const getTotalEmissions = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('emissions')
            .select('amount')
            .eq('userId', userId);

        if (error) throw error;

        const total = data.reduce((sum, emission) => sum + emission.amount, 0);

        res.status(200).json({ total });
    } catch (error) {
        res.status(400).json({ error: 'Failed to get total emissions' });
    }
};