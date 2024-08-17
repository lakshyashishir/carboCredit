"use client"

import { motion } from 'framer-motion';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingUp, Award, DollarSign } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart";
import NavSideBar from '@/components/sidebar';

const UserDashboard = () => {
  const verticalVariant = VerticalCommonVariants(30, 0.5);

  const emissionData = [
    { month: "January", emissions: 100 },
    { month: "February", emissions: 95 },
    { month: "March", emissions: 88 },
    { month: "April", emissions: 82 },
    { month: "May", emissions: 75 },
    { month: "June", emissions: 70 },
  ];

  const chartConfig = {
    emissions: {
      label: "Emissions",
      color: "hsl(var(--chart-1))",
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
        User Dashboard
      </motion.h1>

        <motion.div variants={verticalVariant} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-xl text-hedera-green flex items-center">
                <Leaf className="mr-2" /> Verified Reductions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">30 tons CO2</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-xl text-hedera-green flex items-center">
                <DollarSign className="mr-2" /> CCT Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">150 CCT</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-xl text-hedera-green flex items-center">
                <Award className="mr-2" /> Current Tier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Silver</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-xl text-hedera-green flex items-center">
                <TrendingUp className="mr-2" /> Reduction Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={65} className="w-full" />
              <p className="text-sm mt-2">65% towards Gold tier</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={verticalVariant} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Emission Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={emissionData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="emissions" fill="var(--color-emissions)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>Submitted emission report</span>
                  <span className="text-sm text-gray-400">2 days ago</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Earned 10 CCT</span>
                  <span className="text-sm text-gray-400">1 week ago</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Reached Silver tier</span>
                  <span className="text-sm text-gray-400">2 weeks ago</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-hedera-green">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Submit Report', icon: <Leaf className="h-6 w-6 text-hedera-green" /> },
              { title: 'Buy Credits', icon: <DollarSign className="h-6 w-6 text-hedera-green" /> },
              { title: 'View Analytics', icon: <TrendingUp className="h-6 w-6 text-hedera-green" /> },
              { title: 'Marketplace', icon: <Award className="h-6 w-6 text-hedera-green" /> },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={verticalVariant}
                className="bg-white/10 p-6 rounded-lg text-center flex flex-col items-center space-y-2 cursor-pointer hover:bg-white/20 transition-colors"
              >
                {item.icon}
                <span>{item.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.footer
        variants={verticalVariant}
        className="text-center py-6 bg-gray-900 mt-20"
      >
        <p className="text-sm text-gray-400">
          Empowering individuals to make a positive impact on the environment
        </p>
      </motion.footer>
    </motion.div>
    </div>
  );
};

export default UserDashboard;