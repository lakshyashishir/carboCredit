"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { PlusCircle, MinusCircle, Leaf } from 'lucide-react';

const TokenPage = () => {
  const toaster = useToast();
  const verticalVariant = VerticalCommonVariants(30, 0.5);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState(1000000);
  const [decimals, setDecimals] = useState(18);

  const handleCreateToken = () => {
    // Implement token creation logic here
    console.log('Creating token:', { tokenName, tokenSymbol, initialSupply, decimals });
    toaster({
      title: "Token Created",
      description: `${tokenName} (${tokenSymbol}) has been successfully created!`,
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
          Create Carbon Credit Token
        </motion.h1>

        <motion.div variants={verticalVariant} className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Token Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Token Name</label>
                <Input 
                  placeholder="e.g., CarboCredit Token" 
                  value={tokenName} 
                  onChange={(e) => setTokenName(e.target.value)}
                  className="bg-white/5 border-hedera-green/30 text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Token Symbol</label>
                <Input 
                  placeholder="e.g., CCT" 
                  value={tokenSymbol} 
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  className="bg-white/5 border-hedera-green/30 text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Initial Supply</label>
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={() => setInitialSupply(prev => Math.max(0, prev - 100000))}
                    className="bg-hedera-green/20 hover:bg-hedera-green/30"
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <Input 
                    type="number" 
                    value={initialSupply} 
                    onChange={(e) => setInitialSupply(Number(e.target.value))}
                    className="bg-white/5 border-hedera-green/30 text-white text-center" 
                  />
                  <Button 
                    onClick={() => setInitialSupply(prev => prev + 100000)}
                    className="bg-hedera-green/20 hover:bg-hedera-green/30"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Decimals</label>
                <Slider
                  min={0}
                  max={18}
                  step={1}
                  value={[decimals]}
                  onValueChange={([value]) => setDecimals(value)}
                  className="bg-hedera-green/20"
                />
                <div className="text-center text-sm text-gray-300">{decimals}</div>
              </div>
              <Button 
                onClick={handleCreateToken}
                className="w-full bg-gradient-to-r from-hedera-gradient-1-blue to-hedera-gradient-1-purple hover:opacity-90 transition-opacity"
              >
                Create Token
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-hedera-green">Token Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Carbon Verified', icon: <Leaf className="h-6 w-6 text-hedera-green" /> },
              { title: 'Blockchain Secured', icon: <Leaf className="h-6 w-6 text-hedera-green" /> },
              { title: 'Instant Transfers', icon: <Leaf className="h-6 w-6 text-hedera-green" /> },
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
          Empowering a sustainable future through blockchain technology
        </p>
      </motion.footer>
    </motion.div>
  );
};

export default TokenPage;