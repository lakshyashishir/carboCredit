"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart, TrendingUp, History, DollarSign } from 'lucide-react';
import NavSideBar from '@/components/sidebar';

const MarketplacePage = () => {
  const verticalVariant = VerticalCommonVariants(30, 0.5);
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');

  const mockMarketData = [
    { date: '2023-01', price: 25 },
    { date: '2023-02', price: 28 },
    { date: '2023-03', price: 26 },
    { date: '2023-04', price: 30 },
    { date: '2023-05', price: 32 },
    { date: '2023-06', price: 35 },
  ];

  const mockTransactions = [
    { id: 1, type: 'Buy', amount: 100, price: 30, total: 3000 },
    { id: 2, type: 'Sell', amount: 50, price: 32, total: 1600 },
    { id: 3, type: 'Buy', amount: 200, price: 28, total: 5600 },
  ];

  const handleBuy = () => {
    console.log('Buying credits:', buyAmount);
    // Implement buy logic here
  };

  const handleSell = () => {
    console.log('Selling credits:', sellAmount);
    // Implement sell logic here
  };

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
          Carbon Credit Marketplace
        </motion.h1>

        <motion.div variants={verticalVariant} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Market Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockMarketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                  <Line type="monotone" dataKey="price" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Market Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Current Price:</span>
                  <span className="font-bold">$35.00</span>
                </div>
                <div className="flex justify-between">
                  <span>24h Change:</span>
                  <span className="text-green-400">+2.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Volume:</span>
                  <span>10,000 credits</span>
                </div>
                <div className="flex justify-between">
                  <span>Market Cap:</span>
                  <span>$3,500,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={verticalVariant} className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Buy Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Amount to buy"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="bg-white/5 border-hedera-green/30 text-white"
                />
                <Button onClick={handleBuy} className="w-full bg-green-600 hover:bg-green-700">
                  Buy Credits
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Sell Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Amount to sell"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  className="bg-white/5 border-hedera-green/30 text-white"
                />
                <Button onClick={handleSell} className="w-full bg-red-600 hover:bg-red-700">
                  Sell Credits
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={verticalVariant} className="mt-8">
          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.amount} credits</TableCell>
                      <TableCell>${transaction.price.toFixed(2)}</TableCell>
                      <TableCell>${transaction.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-hedera-green">Marketplace Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Real-time Trading', icon: <ShoppingCart className="h-6 w-6 text-hedera-green" /> },
              { title: 'Market Trends', icon: <TrendingUp className="h-6 w-6 text-hedera-green" /> },
              { title: 'Transaction History', icon: <History className="h-6 w-6 text-hedera-green" /> },
              { title: 'Secure Payments', icon: <DollarSign className="h-6 w-6 text-hedera-green" /> },
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
          Facilitating a sustainable future through transparent and efficient carbon credit trading
        </p>
      </motion.footer>
    </motion.div>
    </div>
  );
};

export default MarketplacePage;