import { Request, Response } from 'express';
import { supabase } from '../config/database';
import { Credit } from '../models/Credit';

export const mintCarbonCredits = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body;
        const userId = req.user.id;

        // TODO:  interact with Hedera here to mint the credits

        const { data, error } = await supabase
            .from('credits')
            .insert({ userId, amount, transactionType: 'minted' })
            .single();

        if (error) throw error;

        // Update user's credit balance
        await supabase
            .from('users')
            .update({ carbonCredits: req.user.carbonCredits + amount })
            .eq('id', userId);

        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to mint carbon credits' });
    }
};

export const getBalance = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('users')
            .select('carbonCredits')
            .eq('id', userId)
            .single();

        if (error) throw error;

        res.status(200).json({ balance: data.carbonCredits });
    } catch (error) {
        res.status(400).json({ error: 'Failed to get credit balance' });
    }
};

export const getTransactionHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('credits')
            .select('*')
            .eq('userId', userId)
            .order('createdAt', { ascending: false });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to get transaction history' });
    }
};