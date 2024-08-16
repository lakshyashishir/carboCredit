"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Leaf, Trophy, Target } from 'lucide-react';

const EmissionPage = () => {
  const toast = useToast();
  const verticalVariant = VerticalCommonVariants(30, 0.5);
  const [newEmissionData, setNewEmissionData] = useState('');

  const mockCompanies = [
    { name: 'EcoTech Solutions', progress: 75, target: 100, badge: 'Gold' },
    { name: 'GreenLeaf Industries', progress: 60, target: 90, badge: 'Silver' },
    { name: 'SustainaCorp', progress: 45, target: 80, badge: 'Bronze' },
  ];

  const handleSubmitEmission = () => {
    // Mock submission logic
    toast({
      title: "Emission Data Submitted",
      description: "Your latest emission data has been recorded successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setNewEmissionData('');
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Gold': return 'bg-yellow-500';
      case 'Silver': return 'bg-gray-400';
      case 'Bronze': return 'bg-amber-600';
      default: return 'bg-green-500';
    }
  };

  return (
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
          Emission Reduction Challenge
        </motion.h1>

        <motion.div variants={verticalVariant} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Submit New Emission Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Latest Emission Reading (tons CO2)</label>
                <Input 
                  type="number"
                  placeholder="Enter your latest emission data" 
                  value={newEmissionData} 
                  onChange={(e) => setNewEmissionData(e.target.value)}
                  className="bg-white/5 border-hedera-green/30 text-white" 
                />
              </div>
              <Button 
                onClick={handleSubmitEmission}
                className="w-full bg-gradient-to-r from-hedera-gradient-1-blue to-hedera-gradient-1-purple hover:opacity-90 transition-opacity"
              >
                Submit Data
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Current Reduction</span>
                  <span className="text-lg font-bold text-hedera-green">65%</span>
                </div>
                <Progress value={65} className="w-full" />
              </div>
              <div className="text-center">
                <Badge className={`${getBadgeColor('Silver')} text-white px-3 py-1`}>
                  Silver Achiever
                </Badge>
                <p className="mt-2 text-sm text-gray-300">Keep going to reach Gold!</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={verticalVariant} className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockCompanies.map((company, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{company.name}</span>
                      <Badge className={`${getBadgeColor(company.badge)} text-white`}>
                        {company.badge}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={(company.progress / company.target) * 100} className="flex-grow" />
                      <span className="text-sm text-gray-300">{company.progress}/{company.target} tons</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-hedera-green">Challenge Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Real-time Updates', icon: <Leaf className="h-6 w-6 text-hedera-green" /> },
              { title: 'Competitive Rankings', icon: <Trophy className="h-6 w-6 text-hedera-green" /> },
              { title: 'Personalized Goals', icon: <Target className="h-6 w-6 text-hedera-green" /> },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={verticalVariant}
                className="bg-white/10 p-6 rounded-lg text-center flex flex-col items-center space-y-2"
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
          Driving sustainability through gamification and blockchain technology
        </p>
      </motion.footer>
    </motion.div>
  );
};

export default EmissionPage;