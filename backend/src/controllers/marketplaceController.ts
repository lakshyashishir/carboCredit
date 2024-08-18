import { Request, Response } from 'express';
import { supabase } from '../config/database';

export const createListing = async (req: Request, res: Response) => {
    try {
        const { amount, price } = req.body;
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('marketplace_listings')
            .insert({ userId, amount, price, status: 'active' })
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create listing' });
    }
};

export const getListings = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('marketplace_listings')
            .select('*')
            .eq('status', 'active')
            .order('createdAt', { ascending: false });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to get marketplace listings' });
    }
};

export const buyCredits = async (req: Request, res: Response) => {
    try {
        const { listingId, amount } = req.body;
        const buyerId = req.user.id;

        const { data, error } = await supabase.rpc('buy_credits', {
            p_listing_id: listingId,
            p_amount: amount,
            p_buyer_id: buyerId
        });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to buy credits' });
    }
};

export const sellCredits = async (req: Request, res: Response) => {
    try {
        const { amount, price } = req.body;
        const sellerId = req.user.id;

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('carbonCredits')
            .eq('id', sellerId)
            .single();

        if (userError) throw userError;
        if (userData.carbonCredits < amount) {
            return res.status(400).json({ error: 'Insufficient credits' });
        }

        const { data, error } = await supabase
            .from('marketplace_listings')
            .insert({ userId: sellerId, amount, price, status: 'active' })
            .single();

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to sell credits' });
    }
};