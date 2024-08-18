import { Request, Response } from 'express';
import { supabase } from '../config/database';

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to get user profile' });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const { username } = req.body;

        const { data, error } = await supabase
            .from('users')
            .update({ username })
            .eq('id', userId)
            .single();

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update user profile' });
    }
};