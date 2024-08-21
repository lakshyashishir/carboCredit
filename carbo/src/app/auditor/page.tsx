"use client";

import React, { useState, useEffect } from 'react';
import { 
  Client, 
  ContractExecuteTransaction, 
  ContractFunctionParameters,
  AccountId,
  PrivateKey,
  ContractId
} from "@hashgraph/sdk";
import { motion } from 'framer-motion';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';
import NavSideBar from '@/components/sidebar';
import Header from '@/components/header';
import Footer from '@/components/footer';

const EMISSION_VERIFICATION_CONTRACT_ID = "0.0.4709640";

interface VerificationRequest {
  id: number;
  company: string;
  emissionAmountTons: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}

const AuditorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const verticalVariant = VerticalCommonVariants(30, 0.5);
  const [client, setClient] = useState<Client | null>(null);
  const [accountId, setAccountId] = useState<string>('');
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>([]);

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

  const fetchVerificationRequests = async () => {
    const mockRequests: VerificationRequest[] = [
      { id: 1, company: '0.0.1111', emissionAmountTons: 100, status: 'Pending', date: '2023-08-15' },
      { id: 2, company: '0.0.2222', emissionAmountTons: 75, status: 'Pending', date: '2023-08-16' },
      { id: 3, company: '0.0.3333', emissionAmountTons: 150, status: 'Approved', date: '2023-08-14' },
    ];
    setVerificationRequests(mockRequests);
  };

  useEffect(() => {
    if (client) {
      fetchVerificationRequests();
    }
  }, [client]);

  const handleVerify = async (id: number, verified: boolean) => {
    if (!client) {
      alert('Hedera client not initialized');
      return;
    }

    try {
      const contractExecuteTx = new ContractExecuteTransaction()
        .setContractId(ContractId.fromString(EMISSION_VERIFICATION_CONTRACT_ID))
        .setGas(100000)
        .setFunction("verifyEmission", new ContractFunctionParameters()
          .addUint256(id)
          .addBool(verified));

      const submitTx = await contractExecuteTx.execute(client);
      const receipt = await submitTx.getReceipt(client);

      if (receipt.status.toString() === "SUCCESS") {
        alert(`Verification ${verified ? 'approved' : 'rejected'} successfully!`);
        fetchVerificationRequests();
      } else {
        alert('Transaction failed');
      }
    } catch (error) {
      console.error('Error verifying emission:', error);
      alert('Failed to verify emission. See console for details.');
    }
  };

  const renderTableRows = () => {
    return verificationRequests
      .filter(request => activeTab === 'pending' ? request.status === 'Pending' : request.status === 'Approved')
      .map((request) => (
        <TableRow key={request.id}>
          <TableCell>{request.company}</TableCell>
          <TableCell>{request.emissionAmountTons} tons</TableCell>
          <TableCell>{request.date}</TableCell>
          <TableCell>{request.status}</TableCell>
          {activeTab === 'pending' && (
            <TableCell>
              <Button onClick={() => handleVerify(request.id, true)} className="mr-2 bg-[#4CBB17] hover:bg-[#3da814] text-white">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button onClick={() => handleVerify(request.id, false)} className="bg-red-600 hover:bg-red-700 text-white">
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </TableCell>
          )}
        </TableRow>
      ));
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
          
          {!accountId && (
            <p>Initializing Hedera client...</p>
          )}

          {accountId && (
            <>
              <p className="mb-4">Connected Account: {accountId}</p>
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
                        <TableHead>Company</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        {activeTab === 'pending' && <TableHead>Actions</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renderTableRows()}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
          
          
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