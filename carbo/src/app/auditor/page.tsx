'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';
import NavSideBar from '@/components/sidebar';
import Header from '@/components/header';


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
            <Button variant="link" className="text-[#2ecc71] p-0">
              <FileText className="h-4 w-4 mr-2" />
              View Evidence
            </Button>
          </TableCell>
          <TableCell>
            <Button onClick={() => handleApprove(request.id)} className="mr-2 bg-[#2ecc71] hover:bg-[#27ae60]">
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
            <Button variant="link" className="text-[#2ecc71] p-0">
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
    <div className="flex h-screen bg-white">
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r">
        <NavSideBar />
      </div>
      <div className="flex-1 flex flex-col ml-64"> {/* Added margin-left to account for sidebar width */}
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6">
          <h1 className="text-3xl font-semibold text-[#2ecc71] mb-6">Auditor Dashboard</h1>
          
          <div className="flex mb-6">
            <Button
              onClick={() => setActiveTab('pending')}
              className={`mr-4 ${activeTab === 'pending' ? 'bg-[#2ecc71]' : 'bg-gray-200 text-gray-800'}`}
            >
              Pending Requests
            </Button>
            <Button
              onClick={() => setActiveTab('approved')}
              className={activeTab === 'approved' ? 'bg-[#2ecc71]' : 'bg-gray-200 text-gray-800'}
            >
              Approved Requests
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">
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
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Auditor Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Verification Review', icon: <CheckCircle className="h-6 w-6 text-[#2ecc71]" /> },
                { title: 'Evidence Examination', icon: <FileText className="h-6 w-6 text-[#2ecc71]" /> },
                { title: 'Fraud Detection', icon: <AlertTriangle className="h-6 w-6 text-[#2ecc71]" /> },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#eafaf1] p-6 rounded-lg border-2 border-[#2ecc71] text-center flex flex-col items-center space-y-2"
                >
                  {item.icon}
                  <span className="text-gray-800">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
        <footer className="bg-[#eafaf1] border-t border-[#2ecc71] p-4">
          <p className="text-center text-sm text-gray-600">
            Ensuring transparency and integrity in carbon credit verification
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AuditorPage;