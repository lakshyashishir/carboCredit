"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Home, Car, Leaf, Factory } from 'lucide-react';

const FootprintPage = () => {
  const verticalVariant = VerticalCommonVariants(30, 0.5);
  const [energyUsage, setEnergyUsage] = useState(50);
  const [transportation, setTransportation] = useState(50);
  const [diet, setDiet] = useState(50);
  const [consumption, setConsumption] = useState(50);
  const [totalFootprint, setTotalFootprint] = useState(0);

  useEffect(() => {
    // Calculate total footprint based on all factors
    const newTotal = (energyUsage + transportation + diet + consumption) / 2;
    setTotalFootprint(newTotal);
  }, [energyUsage, transportation, diet, consumption]);

  const getFootprintColor = (value) => {
    if (value < 33) return 'bg-green-500';
    if (value < 66) return 'bg-yellow-500';
    return 'bg-red-500';
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
          Carbon Footprint Simulator
        </motion.h1>

        <motion.div variants={verticalVariant} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Your Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center">
                  <Home className="mr-2" /> Energy Usage
                </label>
                <Slider
                  value={[energyUsage]}
                  onValueChange={([value]) => setEnergyUsage(value)}
                  max={100}
                  step={1}
                  className="bg-hedera-green/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center">
                  <Car className="mr-2" /> Transportation
                </label>
                <Slider
                  value={[transportation]}
                  onValueChange={([value]) => setTransportation(value)}
                  max={100}
                  step={1}
                  className="bg-hedera-green/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center">
                  <Leaf className="mr-2" /> Diet
                </label>
                <Slider
                  value={[diet]}
                  onValueChange={([value]) => setDiet(value)}
                  max={100}
                  step={1}
                  className="bg-hedera-green/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center">
                  <Factory className="mr-2" /> Consumption
                </label>
                <Slider
                  value={[consumption]}
                  onValueChange={([value]) => setConsumption(value)}
                  max={100}
                  step={1}
                  className="bg-hedera-green/20"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Your Footprint</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-4xl font-bold text-hedera-green">{totalFootprint.toFixed(1)}</p>
                  <p className="text-sm text-gray-300">Tons of CO2 per year</p>
                </div>
                <Progress value={totalFootprint} className={`w-full h-4 ${getFootprintColor(totalFootprint)}`} />
                <p className="text-center text-sm">
                  {totalFootprint < 33 ? "Great job! Your carbon footprint is low." :
                   totalFootprint < 66 ? "Your carbon footprint is average. There's room for improvement!" :
                   "Your carbon footprint is high. Consider making some changes."}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={verticalVariant} className="mt-8">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Footprint Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Home className="mr-2" />
                  <span className="w-24">Energy:</span>
                  <Progress value={energyUsage} className="flex-grow bg-hedera-green/20" />
                  <span className="ml-2">{energyUsage}%</span>
                </div>
                <div className="flex items-center">
                  <Car className="mr-2" />
                  <span className="w-24">Transport:</span>
                  <Progress value={transportation} className="flex-grow bg-hedera-green/20" />
                  <span className="ml-2">{transportation}%</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="mr-2" />
                  <span className="w-24">Diet:</span>
                  <Progress value={diet} className="flex-grow bg-hedera-green/20" />
                  <span className="ml-2">{diet}%</span>
                </div>
                <div className="flex items-center">
                  <Factory className="mr-2" />
                  <span className="w-24">Consumption:</span>
                  <Progress value={consumption} className="flex-grow bg-hedera-green/20" />
                  <span className="ml-2">{consumption}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-hedera-green">Reduction Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Energy Saving</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>Switch to LED bulbs</li>
                  <li>Improve home insulation</li>
                  <li>Use energy-efficient appliances</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Transportation</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>Use public transportation</li>
                  <li>Carpool or bike when possible</li>
                  <li>Consider an electric vehicle</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>

      <motion.footer
        variants={verticalVariant}
        className="text-center py-6 bg-gray-900 mt-20"
      >
        <p className="text-sm text-gray-400">
          Understanding and reducing your carbon footprint for a sustainable future
        </p>
      </motion.footer>
    </motion.div>
  );
};

export default FootprintPage;