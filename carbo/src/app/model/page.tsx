"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, RefreshCw } from 'lucide-react';

const ModelsPage = () => {
  const toast = useToast();
  const verticalVariant = VerticalCommonVariants(30, 0.5);
  const [inputData, setInputData] = useState('');
  const [modelType, setModelType] = useState('linear');
  const [predictionResult, setPredictionResult] = useState(null);

  const mockData = [
    { month: 'Jan', actual: 4000, predicted: 4200 },
    { month: 'Feb', actual: 3000, predicted: 3100 },
    { month: 'Mar', actual: 2000, predicted: 2050 },
    { month: 'Apr', actual: 2780, predicted: 2800 },
    { month: 'May', actual: 1890, predicted: 1950 },
    { month: 'Jun', actual: 2390, predicted: 2450 },
  ];

  const handlePredict = () => {
    // Mock prediction logic
    const mockPrediction = Math.floor(Math.random() * 1000) + 500;
    setPredictionResult(mockPrediction);
    toast({
      title: "Prediction Complete",
      description: `Predicted carbon emissions: ${mockPrediction} tons`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
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
          AI Predictive Model
        </motion.h1>

        <motion.div variants={verticalVariant} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Input Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Historical Emissions Data</label>
                <Input 
                  placeholder="Enter comma-separated values" 
                  value={inputData} 
                  onChange={(e) => setInputData(e.target.value)}
                  className="bg-white/5 border-hedera-green/30 text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Model Type</label>
                <Select value={modelType} onValueChange={setModelType}>
                  <SelectTrigger className="bg-white/5 border-hedera-green/30 text-white">
                    <SelectValue placeholder="Select model type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear Regression</SelectItem>
                    <SelectItem value="arima">ARIMA</SelectItem>
                    <SelectItem value="lstm">LSTM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handlePredict}
                className="w-full bg-gradient-to-r from-hedera-gradient-1-blue to-hedera-gradient-1-purple hover:opacity-90 transition-opacity"
              >
                Run Prediction
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Prediction Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {predictionResult ? (
                <div className="text-center">
                  <p className="text-3xl font-bold text-hedera-green">{predictionResult} tons</p>
                  <p className="text-sm text-gray-300 mt-2">Predicted Carbon Emissions</p>
                </div>
              ) : (
                <p className="text-center text-gray-300">Run a prediction to see results</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={verticalVariant} className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Emissions Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual" />
                  <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Predicted" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-hedera-green">Model Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'AI-Powered Predictions', icon: <Brain className="h-6 w-6 text-hedera-green" /> },
              { title: 'Trend Analysis', icon: <TrendingUp className="h-6 w-6 text-hedera-green" /> },
              { title: 'Real-time Updates', icon: <RefreshCw className="h-6 w-6 text-hedera-green" /> },
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
          Empowering a sustainable future through AI and blockchain technology
        </p>
      </motion.footer>
    </motion.div>
  );
};

export default ModelsPage;