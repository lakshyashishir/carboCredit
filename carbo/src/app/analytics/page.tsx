"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart as BarChartIcon, Activity } from 'lucide-react';
import NavSideBar from '@/components/sidebar';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface EmissionTrend {
  name: string;
  actual: number;
  predicted: number;
}

interface EmissionSource {
  name: string;
  value: number;
}

interface GasComposition {
  name: string;
  value: number;
}

interface AnalyticsData {
  emissionTrend: EmissionTrend[];
  emissionSources: EmissionSource[];
  gasComposition: GasComposition[];
  reductionFromLastYear: number;
  totalCreditsEarned: number;
  projectedMonthlyReduction: number;
  currentTier: string;
}

const AnalyticsPage: React.FC = () => {
  const verticalVariant = VerticalCommonVariants(30, 0.5);
  const [timeRange, setTimeRange] = useState<string>('month');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/analytics?timeRange=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch analytics data');
      const data: AnalyticsData = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setError('Failed to load analytics data. Using mock data.');
      setAnalyticsData(getMockAnalyticsData());
    } finally {
      setLoading(false);
    }
  };

  const getMockAnalyticsData = (): AnalyticsData => ({
    emissionTrend: [
      { name: 'Jan', actual: 4000, predicted: 4200 },
      { name: 'Feb', actual: 3000, predicted: 3100 },
      { name: 'Mar', actual: 2000, predicted: 2050 },
      { name: 'Apr', actual: 2780, predicted: 2800 },
      { name: 'May', actual: 1890, predicted: 1950 },
      { name: 'Jun', actual: 2390, predicted: 2450 },
    ],
    emissionSources: [
      { name: 'Transport', value: 400 },
      { name: 'Energy', value: 300 },
      { name: 'Industry', value: 300 },
      { name: 'Agriculture', value: 200 },
    ],
    gasComposition: [
      { name: 'CO2', value: 400 },
      { name: 'CH4', value: 300 },
      { name: 'N2O', value: 300 },
      { name: 'F-gases', value: 200 },
    ],
    reductionFromLastYear: 25,
    totalCreditsEarned: 10000,
    projectedMonthlyReduction: 50,
    currentTier: 'Gold',
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.warn(error);
  }

  if (!analyticsData) {
    return <div>Error loading analytics data</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex flex-row pt-4">
        <NavSideBar />
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={verticalVariant}
          className="flex-1 ml-72 p-4 bg-white min-h-screen"
        >
          <div className="flex flex-row justify-between">
            <motion.h1
              variants={verticalVariant}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-left text-[#4CBB17] mb-2"
            >
              Emissions Analytics
            </motion.h1>

            <div className="mb-8 flex justify-end">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px] bg-white border-[#4CBB17]/30 text-black">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <motion.div variants={verticalVariant} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white border-[#4CBB17]/30">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4CBB17]">Emission Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.emissionTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                    <Legend />
                    <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual" />
                    <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Predicted" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#4CBB17]/30">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4CBB17]">Emission Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.emissionSources}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#4CBB17]/30">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4CBB17]">Greenhouse Gas Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.gasComposition}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.gasComposition.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#4CBB17]/30">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4CBB17]">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#4CBB17]">{analyticsData.reductionFromLastYear}%</p>
                    <p className="text-sm text-gray-500">Reduction from Last Year</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#4CBB17]">{analyticsData.totalCreditsEarned}</p>
                    <p className="text-sm text-gray-500">Total Credits Earned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#4CBB17]">{analyticsData.projectedMonthlyReduction} tons</p>
                    <p className="text-sm text-gray-500">Projected Monthly Reduction</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#4CBB17]">{analyticsData.currentTier}</p>
                    <p className="text-sm text-gray-500">Current Tier</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-left text-[#4CBB17]">Analytics Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: 'Trend Analysis', icon: <TrendingUp className="h-6 w-6 text-[#4CBB17]" /> },
                { title: 'Source Breakdown', icon: <BarChartIcon className="h-6 w-6 text-[#4CBB17]" /> },
                { title: 'Gas Composition', icon: <PieChartIcon className="h-6 w-6 text-[#4CBB17]" /> },
                { title: 'Real-time Metrics', icon: <Activity className="h-6 w-6 text-[#4CBB17]" /> },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={verticalVariant}
                  className="bg-[#f7fcf5] p-6 rounded-lg text-center flex flex-col items-center space-y-2 border border-[#4CBB17]"
                >
                  {item.icon}
                  <span className="text-black font-medium">{item.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default AnalyticsPage;
