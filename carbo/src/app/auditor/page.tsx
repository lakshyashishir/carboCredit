"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';
import NavSideBar from '@/components/sidebar';
import Header from '@/components/header';
import Footer from '@/components/footer';

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

const AuditorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const verticalVariant = VerticalCommonVariants(30, 0.5);

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
    // TODO: Implement approval logic here
  };

  const handleReject = (id: number) => {
    console.log(`Rejected request ${id}`);
    // TODO: Implement rejection logic here
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
            <Button variant="link" className="text-[#4CBB17] p-0">
              <FileText className="h-4 w-4 mr-2" />
              View Evidence
            </Button>
          </TableCell>
          <TableCell>
            <Button onClick={() => handleApprove(request.id)} className="mr-2 bg-[#4CBB17] hover:bg-[#3da814] text-white">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button onClick={() => handleReject(request.id)} className="bg-red-600 hover:bg-red-700 text-white">
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
            <Button variant="link" className="text-[#4CBB17] p-0">
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
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex flex-row pt-4"> 
        <NavSideBar />
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={verticalVariant}
          className="flex-1 ml-64 p-8 bg-white min-h-screen"
        >
          <motion.h1
            variants={verticalVariant}
            className="text-3xl font-semibold text-[#4CBB17] mb-6"
          >
            Auditor Dashboard
          </motion.h1>
          
          <div className="flex mb-6">
            <Button
              onClick={() => setActiveTab('pending')}
              className={`mr-4 ${activeTab === 'pending' ? 'bg-[#4CBB17] text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Pending Requests
            </Button>
            <Button
              onClick={() => setActiveTab('approved')}
              className={activeTab === 'approved' ? 'bg-[#4CBB17] text-white' : 'bg-gray-200 text-gray-800'}
            >
              Approved Requests
            </Button>
          </div>

          <Card className="bg-white border-[#4CBB17] border">
            <CardHeader>
              <CardTitle className="text-xl text-[#4CBB17]">
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
          
          <motion.div variants={verticalVariant} className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-[#4CBB17]">Auditor Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Verification Review', icon: <CheckCircle className="h-6 w-6 text-[#4CBB17]" /> },
                { title: 'Evidence Examination', icon: <FileText className="h-6 w-6 text-[#4CBB17]" /> },
                { title: 'Fraud Detection', icon: <AlertTriangle className="h-6 w-6 text-[#4CBB17]" /> },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#eafaf1] p-6 rounded-lg border-2 border-[#4CBB17] text-center flex flex-col items-center space-y-2"
                >
                  {item.icon}
                  <span className="text-gray-800">{item.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default AuditorPage;