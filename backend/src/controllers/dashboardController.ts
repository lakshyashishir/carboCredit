import { Request, Response } from 'express';
import { supabase } from '../config/database';
import { Credit} from '../models/Credit';
import { Emission } from '../models/Emission';
import { MarketplaceListing } from '../models/MarketplaceListing';
import { User } from '../models/User';

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const { data: user, error: userError } = await supabase
            .from('users')
            .select('id, walletAddress, username, profilePicture, carbonCredits, createdAt, updatedAt')
            .eq('id', userId)
            .single();

        if (userError) throw userError;

        const { data: emissions, error: emissionsError } = await supabase
            .from('emissions')
            .select('*')
            .eq('userId', userId)
            .order('date', { ascending: false })
            .limit(6);

        if (emissionsError) throw emissionsError;

        const { data: credits, error: creditsError } = await supabase
            .from('credits')
            .select('*')
            .eq('userId', userId)
            .order('createdAt', { ascending: false })
            .limit(5);

        if (creditsError) throw creditsError;

        const { data: listings, error: listingsError } = await supabase
            .from('marketplace_listings')
            .select('*')
            .eq('userId', userId)
            .order('createdAt', { ascending: false })
            .limit(3);

        if (listingsError) throw listingsError;

        const totalEmissions = emissions.reduce((sum, emission) => sum + emission.amount, 0);

        const dashboardData = {
            user: user as User,
            recentEmissions: emissions as Emission[],
            recentCredits: credits as Credit[],
            recentListings: listings as MarketplaceListing[],
            totalEmissions,
            emissionTrend: prepareEmissionTrend(emissions),
        };

        res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
};

function prepareEmissionTrend(emissions: Emission[]): { month: string; emissions: number }[] {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const trend = emissions
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 6)
        .map(emission => ({
            month: monthNames[new Date(emission.date).getMonth()],
            emissions: emission.amount
        }));
    
    return trend;
}