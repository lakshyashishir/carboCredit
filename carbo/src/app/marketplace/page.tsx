
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
import Header from '@/components/header';
import Footer from '@/components/footer';

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
    <div className="flex flex-col min-h-screen bg-white">
     
      <Header />

      <div className="flex flex-row pt-16"> 
        {/* Sidebar */}
        <NavSideBar />

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={verticalVariant}
          className="flex-1 ml-72 p-8 bg-white min-h-screen"
        >
          <motion.h1
            variants={verticalVariant}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-left text-[#4CBB17] mb-8"
          >
            Carbon Credit Marketplace
          </motion.h1>

          <motion.div variants={verticalVariant} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-[#4CBB17] border lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4CBB17]">Market Trends</CardTitle>
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

            <Card className="bg-white border-[#4CBB17] border">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4CBB17]">Market Summary</CardTitle>
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
            <Card className="bg-white border-[#4CBB17] border">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4CBB17]">Buy Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Amount to buy"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    className="bg-white text-black border border-black" 
                  />
                  <Button onClick={handleBuy} className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Buy Credits
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#4CBB17] border">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4CBB17]">Sell Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Amount to sell"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    className="bg-white text-black border border-black" 
                  />
                  <Button onClick={handleSell} className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Sell Credits
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={verticalVariant} className="mt-8">
            <Card className="bg-white border-[#4CBB17] border">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4CBB17]">Recent Transactions</CardTitle>
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
            <h2 className="text-2xl font-semibold mb-4 text-[#4CBB17]">Marketplace Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'Real-time Trading', icon: <ShoppingCart className="h-6 w-6 text-[#4CBB17]" /> },
                { title: 'Market Trends', icon: <TrendingUp className="h-6 w-6 text-[#4CBB17]" /> },
                { title: 'Transaction History', icon: <History className="h-6 w-6 text-[#4CBB17]" /> },
                { title: 'Secure Payments', icon: <DollarSign className="h-6 w-6 text-[#4CBB17]" /> },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={verticalVariant}
                  className="border border-[#4CBB17] bg-[#e9f5e9] p-6 rounded-lg text-center text-black flex flex-col items-center space-y-2"
                >
                  {item.icon}
                  <span>{item.title}</span>
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

export default MarketplacePage;