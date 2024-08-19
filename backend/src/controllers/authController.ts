import { Request, Response } from 'express';
import { supabase } from '../config/database';

export const login = async (req: Request, res: Response) => {
    try {
        const { walletAddress } = req.body;

        let { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('walletAddress', walletAddress)
            .single();

        if (error && error.code === 'PGRST116') {
            const newUser = {
                walletAddress,
                username: `User-${walletAddress.slice(0, 6)}`,
                carbonCredits: 0
            };

            const { data, error: insertError } = await supabase
                .from('users')
                .insert(newUser)
                .single();

            if (insertError) throw insertError;
            user = data;
        } else if (error) {
            throw error;
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: 'Authentication failed' });
    }
};

export const logout = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Logout successful' });
};