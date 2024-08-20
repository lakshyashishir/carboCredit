
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Trophy, Target } from 'lucide-react';
import NavSideBar from '@/components/sidebar';
import Header from '@/components/header';
import Footer from '@/components/footer';

// Custom progress bar component
const CustomProgress = ({ value, className }) => (
  <div className={`w-full h-2 bg-gray-200 rounded-full border border-gray-300 overflow-hidden ${className}`}>
    <div
      className="h-full bg-black rounded-full"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

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
      title: 'Emission Data Submitted',
      description: 'Your latest emission data has been recorded successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setNewEmissionData('');
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Gold':
        return 'bg-yellow-500';
      case 'Silver':
        return 'bg-gray-400';
      case 'Bronze':
        return 'bg-amber-600';
      default:
        return 'bg-green-500';
    }
  };

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
  className="relative flex-1 ml-72 p-4 bg-white"
>
  <motion.h1
    variants={verticalVariant}
    className="text-2xl sm:text-3xl md:text-4xl font-bold text-left text-[#4CBB17] mb-8 max-w-4xl mx-auto"
  >
    Emission Reduction Challenge
  </motion.h1>

  <motion.div
    variants={verticalVariant}
    className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
  >
    <Card className="bg-white border-[#4CBB17] border">
      <CardHeader>
        <CardTitle className="text-2xl text-[#4CBB17]">Submit New Emission Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-700">Latest Emission Reading (tons CO2)</label>
          <Input
            type="number"
            placeholder="Enter your latest emission data"
            value={newEmissionData}
            onChange={(e) => setNewEmissionData(e.target.value)}
            className="bg-white text-gray-700 border-0 shadow-none" 
          />
        </div>
        <Button
          onClick={handleSubmitEmission}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          Submit Data
        </Button>
      </CardContent>
    </Card>

    <Card className="bg-white border-[#4CBB17] border">
      <CardHeader>
        <CardTitle className="text-[#4CBB17]">Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Current Reduction</span>
            <span className="text-lg font-bold text-[#4CBB17]">65%</span>
          </div>
          <CustomProgress value={65} />
        </div>
        <div className="text-center">
          <Badge className={`${getBadgeColor('Silver')} text-white px-3 py-1`}>Silver Achiever</Badge>
          <p className="mt-2 text-sm text-gray-700">Keep going to reach Gold!</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>


          <motion.div variants={verticalVariant} className="mt-12 max-w-4xl mx-auto">
            <Card className="bg-white border-[#4CBB17] border">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4CBB17]">Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockCompanies.map((company, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{company.name}</span>
                        <Badge className={`${getBadgeColor(company.badge)} text-white`}>
                          {company.badge}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CustomProgress value={(company.progress / company.target) * 100} />
                        <span className="text-sm text-gray-700">
                          {company.progress}/{company.target} tons
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-[#4CBB17]">Challenge Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Real-time Updates', icon: <Leaf className="h-6 w-6 text-[#4CBB17]" /> },
                { title: 'Competitive Rankings', icon: <Trophy className="h-6 w-6 text-[#4CBB17]" /> },
                { title: 'Personalized Goals', icon: <Target className="h-6 w-6 text-[#4CBB17]" /> },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={verticalVariant}
                  className="bg-[#4CBB17]/10 p-6 rounded-lg text-center flex flex-col items-center space-y-2 border border-[#4CBB17]"
                >
                  {item.icon}
                  <span className="text-gray-700">{item.title}</span>
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

export default EmissionPage;