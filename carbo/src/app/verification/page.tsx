"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, Clock } from 'lucide-react';
import NavSideBar from '@/components/sidebar';
import Header from '@/components/header';
import Footer from '@/components/footer';

const VerificationPage = () => {
  const toast = useToast();
  const verticalVariant = VerticalCommonVariants(30, 0.5);
  const [verificationData, setVerificationData] = useState({
    amount: '',
    category: '',
    evidence: '',
  });

  const mockVerifications = [
    { id: 1, amount: 100, category: 'Reforestation', status: 'Pending', date: '2023-06-01' },
    { id: 2, amount: 75, category: 'Solar Energy', status: 'Approved', date: '2023-05-15' },
    { id: 3, amount: 50, category: 'Waste Reduction', status: 'Rejected', date: '2023-05-01' },
  ];

  const handleSubmitVerification = () => {
    toast({
      title: 'Verification Request Submitted',
      description: 'Your carbon reduction verification request has been submitted successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setVerificationData({ amount: '', category: '', evidence: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-[#4CBB17] text-white';
      case 'Rejected':
        return 'bg-red-500 text-white';
      default:
        return 'bg-yellow-500 text-white';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex flex-row pt-4">
        <NavSideBar />
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={verticalVariant}
          className="flex-1 ml-64 p-12 pt-8 bg-white min-h-screen"
        >
          <motion.h1
            variants={verticalVariant}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-left text-[#4CBB17] mb-8"
            >
            Carbon Reduction Verification
          </motion.h1>

          <motion.div variants={verticalVariant} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white border-[#4CBB17] border">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4CBB17]">Submit Verification Request</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Amount (tons CO2)</label>
                  <Input
                    type="number"
                    placeholder="Enter reduction amount"
                    value={verificationData.amount}
                    onChange={(e) => setVerificationData({ ...verificationData, amount: e.target.value })}
                    className="bg-white text-gray-700 border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Category</label>
                  <Input
                    type="text"
                    placeholder="e.g., Reforestation, Solar Energy"
                    value={verificationData.category}
                    onChange={(e) => setVerificationData({ ...verificationData, category: e.target.value })}
                    className="bg-white text-gray-700 border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Evidence (URL)</label>
                  <Input
                    type="text"
                    placeholder="Provide evidence of your reduction"
                    value={verificationData.evidence}
                    onChange={(e) => setVerificationData({ ...verificationData, evidence: e.target.value })}
                    className="bg-white text-gray-700 border-gray-300"
                  />
                </div>
                <Button
                  onClick={handleSubmitVerification}
                  className="w-full bg-[#4CBB17] hover:bg-[#3da814] text-white"
                >
                  Submit for Verification
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#4CBB17] border">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4CBB17]">Verification Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">1. Submit your carbon reduction claim with evidence.</p>
                <p className="text-sm text-gray-700">2. Our auditors will review your submission.</p>
                <p className="text-sm text-gray-700">3. If approved, carbon credits will be minted to your account.</p>
                <p className="text-sm text-gray-700">4. Track your verification status in real-time.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={verticalVariant} className="mt-12">
            <Card className="bg-white border-[#4CBB17] border">
              <CardHeader>
                <CardTitle className="text-2xl text-[#4CBB17]">Your Verifications</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount (tons CO2)</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockVerifications.map((verification) => (
                      <TableRow key={verification.id}>
                        <TableCell>{verification.amount}</TableCell>
                        <TableCell>{verification.category}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(verification.status)}>
                            {verification.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{verification.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={verticalVariant} className="mt-16">
            <h2 className="text-2xl font-semibold mb-4 text-[#4CBB17]">Verification Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Transparent Process', icon: <FileText className="h-6 w-6 text-[#4CBB17]" /> },
                { title: 'Quick Turnaround', icon: <Clock className="h-6 w-6 text-[#4CBB17]" /> },
                { title: 'Blockchain Verified', icon: <CheckCircle className="h-6 w-6 text-[#4CBB17]" /> },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={verticalVariant}
                  className="bg-[#eafaf1] p-6 rounded-lg border-2 border-[#4CBB17] text-center flex flex-col items-center space-y-2"
                >
                  {item.icon}
                  <span className="text-gray-800">{item.title}</span>
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

export default VerificationPage;