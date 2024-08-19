
"use client";

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

const UserDashboard = () => {
  const verticalVariant = VerticalCommonVariants(30, 0.5);

  const emissionData = [
    { month: "Jan", emissions: 100 },
    { month: "Feb", emissions: 95 },
    { month: "Mar", emissions: 88 },
    { month: "Apr", emissions: 82 },
    { month: "May", emissions: 75 },
    { month: "Jun", emissions: 70 },
  ];

  const chartConfig = {
    emissions: {
      label: "Emissions",
      color: "#3366cc",
    },
  } satisfies ChartConfig;

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
              User Dashboard
            </motion.h1>

            <motion.div variants={verticalVariant} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-[#4CBB17] flex items-center">
                    <Leaf className="mr-2" /> Verified Reductions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">30 tons CO2</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-[#4CBB17] flex items-center">
                    <DollarSign className="mr-2" /> CCT Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">150 CCT</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-[#4CBB17] flex items-center">
                    <Award className="mr-2" /> Current Tier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">Silver</p>
                </CardContent>
              </Card>

              
            <Card className="bg-white border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-[#4CBB17] flex items-center">
                    <TrendingUp className="mr-2" /> Reduction Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  
                  <div className="w-full h-4 bg-[#4CBB17]/20 rounded-full border border-[#4CBB17] overflow-hidden">
                    <div
                      className="h-full bg-[#4CBB17] rounded-full"
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                  <p className="text-sm mt-2">65% towards Gold tier</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={verticalVariant} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white border-gray-300 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-[#4CBB17]">Emission Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={emissionData}>
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
                    <li className="flex justify-between items-center border-b pb-2">
                      <span>Submitted emission report</span>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </li>
                    <li className="flex justify-between items-center border-b pb-2">
                      <span>Earned 10 CCT</span>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Reached Silver tier</span>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </li>
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
                    className="bg-[#f0f8f0] p-4 rounded-lg text-center flex flex-col items-center space-y-2 cursor-pointer hover:bg-[#4CBB17] hover:text-white transition-colors shadow-sm"
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
