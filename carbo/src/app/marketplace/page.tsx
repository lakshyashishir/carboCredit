
"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useState, useEffect } from 'react';
import {
  Client,
  AccountId,
  PrivateKey,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  ContractId,
  Hbar
} from "@hashgraph/sdk";
import { motion } from 'framer-motion';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, TrendingUp, History, DollarSign } from 'lucide-react';
import NavSideBar from '@/components/sidebar';
import Header from '@/components/header';
import Footer from '@/components/footer';

const MARKETPLACE_CONTRACT_ID = "0.0.1234567";
const TOKEN_CONTRACT_ID = "0.0.7654321";

interface Listing {
  tokenId: string;
  seller: string;
  price: string;
}

const MarketplacePage: React.FC = () => {
  const verticalVariant = VerticalCommonVariants(30, 0.5);
  const [client, setClient] = useState<Client | null>(null);
  const [accountId, setAccountId] = useState<string>('');
  const [tokenId, setTokenId] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    initializeHederaClient();
  }, []);

  const initializeHederaClient = async () => {
    const myAccountId = AccountId.fromString(process.env.NEXT_PUBLIC_MY_ACCOUNT_ID!);
    const myPrivateKey = PrivateKey.fromString(process.env.NEXT_PUBLIC_MY_PRIVATE_KEY!);

    if (myAccountId == null || myPrivateKey == null) {
      throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
    }

    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    setClient(client);
    setAccountId(myAccountId.toString());
  };

  const listCredit = async () => {
    if (!client) {
      alert('Hedera client not initialized');
      return;
    }

    try {
      // First, approve the marketplace contract to transfer the token
      const approveTx = new ContractExecuteTransaction()
        .setContractId(ContractId.fromString(TOKEN_CONTRACT_ID))
        .setGas(100000)
        .setFunction("approve", new ContractFunctionParameters()
          .addAddress(MARKETPLACE_CONTRACT_ID)
          .addUint256(parseInt(tokenId)));

      const approveSubmit = await approveTx.execute(client);
      const approveReceipt = await approveSubmit.getReceipt(client);

      if (approveReceipt.status.toString() !== "SUCCESS") {
        throw new Error("Failed to approve token transfer");
      }

      // Now, list the credit
      const listTx = new ContractExecuteTransaction()
        .setContractId(ContractId.fromString(MARKETPLACE_CONTRACT_ID))
        .setGas(100000)
        .setFunction("listCredit", new ContractFunctionParameters()
          .addUint256(parseInt(tokenId))
          .addUint256(Hbar.from(parseFloat(price), Hbar.Unit.Hbar).toTinybars().toNumber()));

      const listSubmit = await listTx.execute(client);
      const listReceipt = await listSubmit.getReceipt(client);

      if (listReceipt.status.toString() === "SUCCESS") {
        alert('Credit listed successfully!');
        fetchListings();
      } else {
        alert('Failed to list credit');
      }
    } catch (error) {
      console.error('Error listing credit:', error);
      alert('Failed to list credit. See console for details.');
    }
  };

  const buyCredit = async (tokenId: string, price: string) => {
    if (!client) {
      alert('Hedera client not initialized');
      return;
    }

    try {
      const buyTx = new ContractExecuteTransaction()
        .setContractId(ContractId.fromString(MARKETPLACE_CONTRACT_ID))
        .setGas(100000)
        .setPayableAmount(Hbar.from(parseFloat(price), Hbar.Unit.Hbar))
        .setFunction("buyCredit", new ContractFunctionParameters()
          .addUint256(parseInt(tokenId)));

      const buySubmit = await buyTx.execute(client);
      const buyReceipt = await buySubmit.getReceipt(client);

      if (buyReceipt.status.toString() === "SUCCESS") {
        alert('Credit purchased successfully!');
        fetchListings();
      } else {
        alert('Failed to purchase credit');
      }
    } catch (error) {
      console.error('Error buying credit:', error);
      alert('Failed to buy credit. See console for details.');
    }
  };

  const cancelListing = async (tokenId: string) => {
    if (!client) {
      alert('Hedera client not initialized');
      return;
    }

    try {
      const cancelTx = new ContractExecuteTransaction()
        .setContractId(ContractId.fromString(MARKETPLACE_CONTRACT_ID))
        .setGas(100000)
        .setFunction("cancelListing", new ContractFunctionParameters()
          .addUint256(parseInt(tokenId)));

      const cancelSubmit = await cancelTx.execute(client);
      const cancelReceipt = await cancelSubmit.getReceipt(client);

      if (cancelReceipt.status.toString() === "SUCCESS") {
        alert('Listing cancelled successfully!');
        fetchListings();
      } else {
        alert('Failed to cancel listing');
      }
    } catch (error) {
      console.error('Error cancelling listing:', error);
      alert('Failed to cancel listing. See console for details.');
    }
  };

  const fetchListings = async () => {
    // In a real application, you would call a contract function or backend API to get this data
    // For this example, we'll use mock data
    const mockListings: Listing[] = [
      { tokenId: '1', seller: '0.0.1111', price: '1.5' },
      { tokenId: '2', seller: '0.0.2222', price: '2.0' },
    ];
    setListings(mockListings);
  };

  useEffect(() => {
    if (client) {
      fetchListings();
    }
  }, [client]);
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
  };

  const handleSell = () => {
    console.log('Selling credits:', sellAmount);
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

          {!accountId && (
            <p>Initializing Hedera client...</p>
          )}

          {accountId && (
            <>
              <p className="mb-4">Connected Account: {accountId}</p>

              <Card className="bg-white border-[#4CBB17] border mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#4CBB17]">List Carbon Credit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Token ID"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                    className="bg-white text-black border border-black" 
                  />
                  <Input
                    type="number"
                    placeholder="Price in HBAR"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-white text-black border border-black" 
                  />
                  <Button onClick={listCredit} className="w-full bg-green-600 hover:bg-green-700 text-white">
                    List Credit
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#4CBB17] border">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#4CBB17]">Available Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Token ID</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Price (HBAR)</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {listings.map((listing) => (
                        <TableRow key={listing.tokenId}>
                          <TableCell>{listing.tokenId}</TableCell>
                          <TableCell>{listing.seller}</TableCell>
                          <TableCell>{listing.price}</TableCell>
                          <TableCell>
                            <Button onClick={() => buyCredit(listing.tokenId, listing.price)} className="mr-2">Buy</Button>
                            {listing.seller === accountId && (
                              <Button onClick={() => cancelListing(listing.tokenId)}>Cancel</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}

          {/* <motion.div variants={verticalVariant} className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          </motion.div> */}

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