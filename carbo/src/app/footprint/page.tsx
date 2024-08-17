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
          Carbon Footprint Calculator
        </motion.h1>

        <motion.div variants={verticalVariant} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Your Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: 'Energy Usage', icon: Home, state: energyUsage, setState: setEnergyUsage },
                { label: 'Transportation', icon: Car, state: transportation, setState: setTransportation },
                { label: 'Diet', icon: Leaf, state: diet, setState: setDiet },
                { label: 'Consumption', icon: Factory, state: consumption, setState: setConsumption },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm text-gray-300 flex items-center">
                    <item.icon className="mr-2" /> {item.label}
                  </label>
                  <Slider
                    value={[item.state]}
                    onValueChange={([value]) => item.setState(value)}
                    max={100}
                    step={1}
                    className="bg-hedera-green/20"
                  />
                </div>
              ))}
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

        {/* Add more sections as needed */}
      </motion.div>

      <motion.footer
        variants={verticalVariant}
        className="text-center py-6 bg-gray-900 mt-20"
      >
        <p className="text-sm text-gray-400">
          Understanding your carbon footprint is the first step towards a sustainable future
        </p>
      </motion.footer>
    </motion.div>
  );
};

export default FootprintPage;