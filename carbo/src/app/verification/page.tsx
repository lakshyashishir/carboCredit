'use client';

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
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
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
            Carbon Reduction Verification
          </motion.h1>

          <motion.div variants={verticalVariant} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
              <CardHeader>
                <CardTitle className="text-2xl text-hedera-green">Submit Verification Request</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Amount (tons CO2)</label>
                  <Input
                    type="number"
                    placeholder="Enter reduction amount"
                    value={verificationData.amount}
                    onChange={(e) => setVerificationData({ ...verificationData, amount: e.target.value })}
                    className="bg-white/5 border-hedera-green/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Category</label>
                  <Input
                    type="text"
                    placeholder="e.g., Reforestation, Solar Energy"
                    value={verificationData.category}
                    onChange={(e) => setVerificationData({ ...verificationData, category: e.target.value })}
                    className="bg-white/5 border-hedera-green/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Evidence (URL)</label>
                  <Input
                    type="text"
                    placeholder="Provide evidence of your reduction"
                    value={verificationData.evidence}
                    onChange={(e) => setVerificationData({ ...verificationData, evidence: e.target.value })}
                    className="bg-white/5 border-hedera-green/30 text-white"
                  />
                </div>
                <Button
                  onClick={handleSubmitVerification}
                  className="w-full bg-gradient-to-r from-hedera-gradient-1-blue to-hedera-gradient-1-purple hover:opacity-90 transition-opacity"
                >
                  Submit for Verification
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
              <CardHeader>
                <CardTitle className="text-2xl text-hedera-green">Verification Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">1. Submit your carbon reduction claim with evidence.</p>
                <p className="text-sm text-gray-300">2. Our auditors will review your submission.</p>
                <p className="text-sm text-gray-300">3. If approved, carbon credits will be minted to your account.</p>
                <p className="text-sm text-gray-300">4. Track your verification status in real-time.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={verticalVariant} className="mt-12 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
              <CardHeader>
                <CardTitle className="text-2xl text-hedera-green">Your Verifications</CardTitle>
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
                          <Badge className={`${getStatusColor(verification.status)} text-white`}>
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

          <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-hedera-green">Verification Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Transparent Process', icon: <FileText className="h-6 w-6 text-hedera-green" /> },
                { title: 'Quick Turnaround', icon: <Clock className="h-6 w-6 text-hedera-green" /> },
                { title: 'Blockchain Verified', icon: <CheckCircle className="h-6 w-6 text-hedera-green" /> },
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

        <motion.footer variants={verticalVariant} className="text-center py-6 bg-gray-900 mt-20">
          <p className="text-sm text-gray-400">
            Ensuring integrity and trust in carbon reduction claims through blockchain verification
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default VerificationPage;