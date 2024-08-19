import { Request, Response } from 'express';
import { supabase } from '../config/database';

export const getPendingVerifications = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('verification_requests')
      .select('*, users(username)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch pending verifications' });
  }
};

export const getApprovedVerifications = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('verification_requests')
      .select('*, users(username), auditors:users!auditor_id(username)')
      .eq('status', 'approved')
      .order('approved_at', { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch approved verifications' });
  }
};

export const approveVerification = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;
    const auditorId = req.user.id;

    const { data, error } = await supabase
      .from('verification_requests')
      .update({ status: 'approved', auditor_id: auditorId, approved_at: new Date() })
      .eq('id', requestId)
      .single();

    if (error) throw error;

    // TODO:  trigger the carbon credit minting process

    res.status(200).json({ message: 'Verification approved successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to approve verification' });
  }
};

export const rejectVerification = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;
    const auditorId = req.user.id;
    const { reason } = req.body;

    const { data, error } = await supabase
      .from('verification_requests')
      .update({ status: 'rejected', auditor_id: auditorId, rejected_at: new Date(), rejection_reason: reason })
      .eq('id', requestId)
      .single();

    if (error) throw error;

    res.status(200).json({ message: 'Verification rejected successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to reject verification' });
  }
};