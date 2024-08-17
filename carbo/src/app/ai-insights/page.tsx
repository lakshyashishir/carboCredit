"use client"

import { motion } from 'framer-motion';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Brain, TrendingDown, AlertTriangle, Lightbulb } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart";
import NavSideBar from '@/components/sidebar';

const AIInsightsPage = () => {
  const verticalVariant = VerticalCommonVariants(30, 0.5);

  const emissionData = [
    { month: 'Jan', actual: 100, predicted: 98 },
    { month: 'Feb', actual: 95, predicted: 93 },
    { month: 'Mar', actual: 88, predicted: 89 },
    { month: 'Apr', actual: 82, predicted: 85 },
    { month: 'May', actual: 75, predicted: 81 },
    { month: 'Jun', actual: 70, predicted: 77 },
  ];

  const chartConfig = {
    actual: {
      label: "Actual Emissions",
      color: "hsl(var(--chart-1))",
    },
    predicted: {
      label: "Predicted Emissions",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-row h-full">
      <NavSideBar />
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={verticalVariant}
      className="relative text-white 2xl:max-w-[100rem] 2xl:mx-auto h-full flex-1 w-full bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen"
    >
      <motion.div variants={verticalVariant} className="p-8">
        <motion.h1
          variants={verticalVariant}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-hedera-green via-hedera-green to-hedera-green/50 mb-12"
        >
          AI Insights
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green flex items-center">
                <Brain className="mr-2" /> Emission Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={emissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} />
                  <Line type="monotone" dataKey="predicted" stroke="var(--color-predicted)" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green flex items-center">
                <Lightbulb className="mr-2" /> Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Switch to LED bulbs to reduce energy consumption</li>
                <li>Consider carpooling to decrease transportation emissions</li>
                <li>Reduce meat consumption for lower dietary carbon footprint</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green flex items-center">
                <AlertTriangle className="mr-2" /> Anomaly Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>No significant anomalies detected in your recent emission patterns.</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
    </div>
  );
};

export default AIInsightsPage;