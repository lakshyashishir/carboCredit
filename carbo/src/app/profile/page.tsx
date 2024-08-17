"use client"

import { motion } from 'framer-motion';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, Award, Leaf, TrendingUp } from 'lucide-react';
import NavSideBar from '@/components/sidebar';

const UserProfilePage = () => {
  const verticalVariant = VerticalCommonVariants(30, 0.5);

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
          User Profile
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green flex items-center">
                <User className="mr-2" /> Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p><span className="font-bold">Name:</span> John Doe</p>
                <p><span className="font-bold">Email:</span> john@example.com</p>
                <p><span className="font-bold">Joined:</span> January 1, 2023</p>
                <Badge className="bg-hedera-green">Silver Tier</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green flex items-center">
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
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Credits Earned</span>
                    <span>150 CCT</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Leaf className="mr-2 text-hedera-green" />
                    <span>30 tons CO2 reduced</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="mr-2 text-hedera-green" />
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
  );
};

export default UserProfilePage;