"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Leaf, TrendingUp, Award, DollarSign } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart";
import NavSideBar from '@/components/sidebar';
import Header from '@/components/header';
import Footer from '@/components/footer';

// Define interfaces for our data structures
interface User {
  username: string;
  carbonCredits: number;
}

interface Credit {
  amount: number;
  transactionType: 'minted' | 'bought' | 'sold';
  createdAt: string;
}

interface Listing {
  amount: number;
  price: number;
}

interface EmissionTrend {
  month: string;
  emissions: number;
}

interface DashboardData {
  user: User;
  totalEmissions: number;
  emissionTrend: EmissionTrend[];
  recentCredits: Credit[];
  recentListings: Listing[];
}

const UserDashboard: React.FC = () => {
  const verticalVariant = VerticalCommonVariants(30, 0.5);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data: DashboardData = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Using mock data.');
        setDashboardData(getMockDashboardData());
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getMockDashboardData = (): DashboardData => ({
    user: { username: 'John Doe', carbonCredits: 1000 },
    totalEmissions: 5000,
    emissionTrend: [
      { month: 'Jan', emissions: 1000 },
      { month: 'Feb', emissions: 900 },
      { month: 'Mar', emissions: 800 },
      { month: 'Apr', emissions: 700 },
      { month: 'May', emissions: 600 },
      { month: 'Jun', emissions: 500 },
    ],
    recentCredits: [
      { amount: 100, transactionType: 'minted', createdAt: '2023-08-01' },
      { amount: 50, transactionType: 'bought', createdAt: '2023-07-15' },
    ],
    recentListings: [
      { amount: 200, price: 10 },
      { amount: 150, price: 9 },
    ],
  });

  const chartConfig: ChartConfig = {
    emissions: {
      label: "Emissions",
      color: "#3366cc",
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.warn(error);
  }

  if (!dashboardData) {
    return <div>Error loading dashboard data</div>;
  }

  const { user, totalEmissions, emissionTrend, recentCredits, recentListings } = dashboardData;

  const dashboardItems = [
    { icon: <Leaf className="h-6 w-6 text-[#4CBB17]" />, title: 'Total Emissions', value: `${totalEmissions.toFixed(2)} tons CO2` },
    { icon: <DollarSign className="h-6 w-6 text-[#4CBB17]" />, title: 'Carbon Credits', value: `${user.carbonCredits} CCT` },
    { icon: <Award className="h-6 w-6 text-[#4CBB17]" />, title: 'Recent Credit', value: recentCredits[0] ? `${recentCredits[0].amount} CCT` : 'N/A' },
    { icon: <TrendingUp className="h-6 w-6 text-[#4CBB17]" />, title: 'Latest Listing', value: recentListings[0] ? `${recentListings[0].amount} CCT at $${recentListings[0].price}` : 'N/A' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex flex-row"> 
        <NavSideBar />

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={verticalVariant}
          className="flex-1 ml-72 p-4 bg-white min-h-screen"
        >
          <motion.div variants={verticalVariant} className="p-8">
            <motion.h1
              variants={verticalVariant}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-left text-[#4CBB17] mb-8"
            >
              Welcome, {user.username}
            </motion.h1>

            <motion.div variants={verticalVariant} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dashboardItems.map((item, index) => (
                <Card key={index} className="bg-white border border-gray-200 shadow-sm rounded-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      {item.icon}
                      <h3 className="ml-2 text-sm font-medium text-gray-500">{item.title}</h3>
                    </div>
                    <p className="text-2xl font-semibold text-gray-700">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            <motion.div variants={verticalVariant} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white border-gray-300 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-[#4CBB17]">Emission Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={emissionTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="emissions" fill="#3366cc" radius={4} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-300 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-[#4CBB17]">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recentCredits.slice(0, 3).map((credit, index) => (
                      <li key={index} className="flex justify-between items-center border-b pb-2">
                        <span>{credit.transactionType === 'minted' ? 'Minted' : credit.transactionType === 'bought' ? 'Bought' : 'Sold'} {credit.amount} CCT</span>
                        <span className="text-sm text-gray-500">{new Date(credit.createdAt).toLocaleDateString()}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={verticalVariant} className="mt-12 w-full">
              <h2 className="text-xl font-semibold mb-4 text-[#4CBB17]">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: 'Submit Report', icon: <Leaf className="h-6 w-6" /> },
                  { title: 'Buy Credits', icon: <DollarSign className="h-6 w-6" /> },
                  { title: 'View Analytics', icon: <TrendingUp className="h-6 w-6" /> },
                  { title: 'Marketplace', icon: <Award className="h-6 w-6" /> },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={verticalVariant}
                    className="bg-[#f0f8f0] border border-[#4CBB17] p-4 rounded-lg text-center flex flex-col items-center space-y-2 cursor-pointer"
                  >
                    <div className="bg-white p-2 rounded-full">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <Footer/>
    </div>
  );
};

export default UserDashboard;