import { Request, Response } from 'express';
import { supabase } from '../config/database';

export const submitVerificationRequest = async (req: Request, res: Response) => {
    try {
        const { amount, category, evidence } = req.body;
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('verification_requests')
            .insert({ user_id: userId, amount, category, evidence, status: 'pending' });

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to submit verification request' });
    }
};

export const getVerificationRequests = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('verification_requests')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to get verification requests' });
    }
};

export const approveVerificationRequest = async (req: Request, res: Response) => {
    try {
        const { requestId } = req.params;
        const verifierId = req.user.id;

        const { data, error } = await supabase
            .from('verification_requests')
            .update({ status: 'approved', verifier_id: verifierId })
            .eq('id', requestId)
            .single();

        if (error) throw error;

        // Simulate minting credits on the blockchain
        await supabase
            .from('credits')
            .insert({
                user_id: data.user_id,
                amount: data.amount,
                transaction_type: 'minted',
                transaction_id: `simulated_tx_${Date.now()}`
            });

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to approve verification request' });
    }
};