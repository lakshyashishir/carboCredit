'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';
import NavSideBar from '@/components/sidebar';

interface BaseRequest {
  id: number;
  user: string;
  amount: number;
  category: string;
  evidence: string;
  date: string;
}

interface PendingRequest extends BaseRequest {}

interface ApprovedRequest extends BaseRequest {
  approvedDate: string;
}

const AuditorPage = () => {
  const verticalVariant = VerticalCommonVariants(30, 0.5);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');

  const mockPendingRequests: PendingRequest[] = [
    { id: 1, user: 'Alice', amount: 100, category: 'Energy', evidence: 'link_to_evidence_1', date: '2023-08-15' },
    { id: 2, user: 'Bob', amount: 75, category: 'Transport', evidence: 'link_to_evidence_2', date: '2023-08-16' },
    { id: 3, user: 'Charlie', amount: 150, category: 'Industry', evidence: 'link_to_evidence_3', date: '2023-08-17' },
  ];

  const mockApprovedRequests: ApprovedRequest[] = [
    { id: 4, user: 'David', amount: 120, category: 'Energy', evidence: 'link_to_evidence_4', date: '2023-08-14', approvedDate: '2023-08-15' },
    { id: 5, user: 'Eve', amount: 90, category: 'Transport', evidence: 'link_to_evidence_5', date: '2023-08-13', approvedDate: '2023-08-14' },
  ];

  const handleApprove = (id: number) => {
    console.log(`Approved request ${id}`);
    //TODO: Implement approval logic here   
  };

  const handleReject = (id: number) => {
    console.log(`Rejected request ${id}`);
    //TODO: Implement rejection logic here
  };

  const renderTableRows = () => {
    if (activeTab === 'pending') {
      return mockPendingRequests.map((request) => (
        <TableRow key={request.id}>
          <TableCell>{request.user}</TableCell>
          <TableCell>{request.amount} tons</TableCell>
          <TableCell>{request.category}</TableCell>
          <TableCell>{request.date}</TableCell>
          <TableCell>
            <Button variant="link" className="text-hedera-green p-0">
              <FileText className="h-4 w-4 mr-2" />
              View Evidence
            </Button>
          </TableCell>
          <TableCell>
            <Button onClick={() => handleApprove(request.id)} className="mr-2 bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button onClick={() => handleReject(request.id)} className="bg-red-600 hover:bg-red-700">
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </TableCell>
        </TableRow>
      ));
    } else {
      return mockApprovedRequests.map((request) => (
        <TableRow key={request.id}>
          <TableCell>{request.user}</TableCell>
          <TableCell>{request.amount} tons</TableCell>
          <TableCell>{request.category}</TableCell>
          <TableCell>{request.date}</TableCell>
          <TableCell>
            <Button variant="link" className="text-hedera-green p-0">
              <FileText className="h-4 w-4 mr-2" />
              View Evidence
            </Button>
          </TableCell>
          <TableCell>{request.approvedDate}</TableCell>
        </TableRow>
      ));
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
            Auditor Dashboard
          </motion.h1>

          <div className="flex justify-center mb-8">
            <Button
              onClick={() => setActiveTab('pending')}
              className={`mr-4 ${activeTab === 'pending' ? 'bg-hedera-green' : 'bg-gray-600'}`}
            >
              Pending Requests
            </Button>
            <Button
              onClick={() => setActiveTab('approved')}
              className={activeTab === 'approved' ? 'bg-hedera-green' : 'bg-gray-600'}
            >
              Approved Requests
            </Button>
          </div>

          <Card className="bg-white/10 backdrop-blur-md border-hedera-green/30">
            <CardHeader>
              <CardTitle className="text-2xl text-hedera-green">
                {activeTab === 'pending' ? 'Pending Verification Requests' : 'Approved Verification Requests'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Evidence</TableHead>
                    {activeTab === 'approved' && <TableHead>Approved Date</TableHead>}
                    {activeTab === 'pending' && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {renderTableRows()}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-hedera-green">Auditor Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Verification Review', icon: <CheckCircle className="h-6 w-6 text-hedera-green" /> },
                { title: 'Evidence Examination', icon: <FileText className="h-6 w-6 text-hedera-green" /> },
                { title: 'Fraud Detection', icon: <AlertTriangle className="h-6 w-6 text-hedera-green" /> },
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
            Ensuring transparency and integrity in carbon credit verification
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default AuditorPage;