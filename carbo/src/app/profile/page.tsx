"use client";

import { motion } from 'framer-motion';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Award, Leaf, TrendingUp } from 'lucide-react';
import NavSideBar from '@/components/sidebar';
import Header from '@/components/header';
import Footer from '@/components/footer';

const CustomProgress = ({ value, className }) => (
  <div className={`w-full h-2 bg-gray-200 rounded-full border border-gray-300 overflow-hidden ${className}`}>
    <div
      className="h-full bg-blue-500 rounded-full"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const UserProfilePage = () => {
  const verticalVariant = VerticalCommonVariants(30, 0.5);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      <Header />

      <div className="flex flex-row pt-4"> 
        {/* Sidebar */}
        <NavSideBar />

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={verticalVariant}
          className="relative flex-1 ml-72 p-4 bg-white min-h-screen"
        >
          <motion.div variants={verticalVariant} className="p-8">
            <motion.h1
              variants={verticalVariant}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-left text-[#4CBB17] mb-8"
            >
              User Profile
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-white border-gray-300 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-700 flex items-center">
                    <User className="mr-2" /> Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p><span className="font-bold">Name:</span> John Doe</p>
                    <p><span className="font-bold">Email:</span> john@example.com</p>
                    <p><span className="font-bold">Joined:</span> January 1, 2023</p>
                    <Badge className="bg-[#4CBB17] text-white">Silver Tier</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-300 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-700 flex items-center">
                    <Award className="mr-2" /> Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Carbon Reduction Progress</span>
                        <span>75%</span>
                      </div>
                      
                      <CustomProgress value={75} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Credits Earned</span>
                        <span>150 CCT</span>
                      </div>
                    
                      <CustomProgress value={60} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Leaf className="mr-2 text-[#4CBB17]" />
                        <span>30 tons CO2 reduced</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="mr-2 text-[#4CBB17]" />
                        <span>5 consecutive months of reduction</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;