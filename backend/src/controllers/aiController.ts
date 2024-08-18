import { Request, Response } from 'express';
import { supabase } from '../config/database';

export const getEmissionPredictions = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        // Fetch the user's last 30 emissions
        const { data: emissions, error } = await supabase
            .from('emissions')
            .select('amount, date')
            .eq('userId', userId)
            .order('date', { ascending: false })
            .limit(30);

        if (error) throw error;

        if (emissions.length === 0) {
            return res.status(200).json({ prediction: 0, message: "Not enough data for prediction" });
        }

        // Calculate average emission
        const averageEmission = emissions.reduce((sum, emission) => sum + emission.amount, 0) / emissions.length;

        // Simple prediction: Assume a 5% reduction from average
        const prediction = averageEmission * 0.95;

        // Generate next 7 days of predictions
        const today = new Date();
        const predictions = Array.from({ length: 7 }, (_, i) => ({
            date: new Date(today.getTime() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            prediction: Number(prediction.toFixed(2))
        }));

        res.status(200).json({ predictions });
    } catch (error) {
        res.status(400).json({ error: 'Failed to get emission predictions' });
    }
};

export const getEmissionRecommendations = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        // Fetch the user's last emission
        const { data: lastEmission, error } = await supabase
            .from('emissions')
            .select('amount, category')
            .eq('userId', userId)
            .order('date', { ascending: false })
            .limit(1)
            .single();

        if (error) throw error;

        // Simple recommendation system based on the last emission category
        let recommendations;
        switch (lastEmission.category) {
            case 'transport':
                recommendations = [
                    "Consider carpooling or using public transportation to reduce emissions",
                    "If possible, try walking or cycling for short distances",
                    "Look into electric or hybrid vehicle options for your next car purchase"
                ];
                break;
            case 'energy':
                recommendations = [
                    "Switch to energy-efficient LED bulbs",
                    "Unplug electronics when not in use to avoid phantom energy consumption",
                    "Consider installing solar panels for renewable energy"
                ];
                break;
            case 'food':
                recommendations = [
                    "Try incorporating more plant-based meals into your diet",
                    "Buy local and seasonal produce to reduce transportation emissions",
                    "Reduce food waste by planning meals and composting"
                ];
                break;
            default:
                recommendations = [
                    "Track your daily activities to identify areas for emission reduction",
                    "Educate yourself about climate change and its impacts",
                    "Encourage friends and family to also reduce their carbon footprint"
                ];
        }

        res.status(200).json({ recommendations });
    } catch (error) {
        res.status(400).json({ error: 'Failed to get emission recommendations' });
    }
};

export const getEmissionAnomalies = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        // Fetch the user's last 30 emissions
        const { data: emissions, error } = await supabase
            .from('emissions')
            .select('amount, date, category')
            .eq('userId', userId)
            .order('date', { ascending: false })
            .limit(30);

        if (error) throw error;

        if (emissions.length < 7) {
            return res.status(200).json({ anomalies: [], message: "Not enough data for anomaly detection" });
        }

        // Calculate mean and standard deviation
        const amounts = emissions.map(e => e.amount);
        const mean = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length;
        const stdDev = Math.sqrt(amounts.reduce((sq, amount) => sq + Math.pow(amount - mean, 2), 0) / amounts.length);

        // Define anomaly as any emission more than 2 standard deviations from the mean
        const anomalies = emissions.filter(emission => 
            Math.abs(emission.amount - mean) > 2 * stdDev
        ).map(anomaly => ({
            date: anomaly.date,
            amount: anomaly.amount,
            category: anomaly.category,
            deviation: Number(((anomaly.amount - mean) / stdDev).toFixed(2))
        }));

        res.status(200).json({ anomalies, mean: Number(mean.toFixed(2)), stdDev: Number(stdDev.toFixed(2)) });
    } catch (error) {
        res.status(400).json({ error: 'Failed to get emission anomalies' });
    }
};