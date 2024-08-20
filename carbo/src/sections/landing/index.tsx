'use client';
import React, { useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { storeAccountInfoInCookies } from '@/api/cookies';
import { chainIdToNetwork, isCorrectHederaNetwork } from '@/utils/common/helpers';
import { requestAccount, getWalletProvider, getCurrentChainId } from '@/api/wallet';
import { HEDERA_COMMON_WALLET_REVERT_REASONS, OFFCIAL_NETWORK_NAME } from '@/utils/common/constants';
import { NoWalletToast, CommonErrorToast, NetworkMismatchToast } from '@/components/toast/CommonToast';
import { Leaf, TrendingUp, ShoppingBag, Award, BarChart2, Layout } from 'lucide-react';
import Header from '@/components/header';
import { World, globeConfig } from '@/components/ui/globe';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const router = useRouter();
  const toaster = useToast();
  const [accounts, setAccounts] = useState<string[]>([]);
  const { walletProvider, err: walletProviderErr } = getWalletProvider();

  const handleConnectWallet = async () => {
    if (walletProviderErr === `!${OFFCIAL_NETWORK_NAME}` || !walletProvider) {
      NoWalletToast({ toaster });
      return;
    }

    if (!(await isCorrectHederaNetwork(walletProvider))) {
      NetworkMismatchToast({ toaster });
      return;
    }

    const { accounts, err: getAccountErr } = await requestAccount(walletProvider!);

    if (getAccountErr || !accounts || accounts.length === 0) {
      let errorMessage = 'Unknown error appeared...';
      if (JSON.stringify(getAccountErr).indexOf(HEDERA_COMMON_WALLET_REVERT_REASONS.REJECT.code) !== -1) {
        errorMessage = HEDERA_COMMON_WALLET_REVERT_REASONS.REJECT.description;
      } else if (
        JSON.stringify(getAccountErr).indexOf(HEDERA_COMMON_WALLET_REVERT_REASONS.NETWORK_SWITCH.code) !== -1
      ) {
        errorMessage = HEDERA_COMMON_WALLET_REVERT_REASONS.NETWORK_SWITCH.description;
      }

      CommonErrorToast({
        toaster,
        title: 'Cannot connect account',
        description: errorMessage,
      });
      return;
    }

    setAccounts(accounts as string[]);
  };

  useEffect(() => {
    (async () => {
      if (accounts.length > 0) {
        const currentChainId = (await getCurrentChainId(walletProvider as BrowserProvider))
          .currentChainId as string;

        const network = chainIdToNetwork(currentChainId);

        const err = storeAccountInfoInCookies(accounts, network);
        if (err) {
          CommonErrorToast({
            toaster,
            title: 'Error logging in',
            description: HEDERA_COMMON_WALLET_REVERT_REASONS.DEFAULT.description,
          });
          return;
        }

        router.push('/hedera/overview');
      }
    })();
  }, [accounts, router, toaster, walletProvider]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />

      {/* Hero */}
      <section className="bg-white flex items-center min-h-screen justify-center px-4 md:px-12 lg:px-24">
        <div className="flex flex-col items-center justify-center h-screen w-screen p-0 overflow-hidden relative">
          <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mt-32 max-[768px]:mt-20"
            >
              <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-hedera-green mb-6">
                Tokenize Your Carbon Impact
              </p>
              <p className="text-2xl mb-8 text-gray-600 pr-10 pl-10 w-full pl-40 pr-40">
                CarboCredit transforms verified carbon emission reductions into tradable tokens on the{' '}
                <span className="text-hedera-green font-medium">Hedera blockchain</span>, powered by AI
                insights for maximum environmental impact.
              </p>
              
            </motion.div>
            <div className="flex items-center justify-center z-10 overflow-hidden w-full h-3/4 max-[768px]:h-1/2 max-[768px]:mt-8">
              <div className="w-full h-full">
                <World data={[]} globeConfig={globeConfig} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-left text-hedera-green">Our Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Verified Tokenization',
                icon: <Leaf className="h-12 w-12 text-hedera-green" />,
                description: 'Turn your carbon reductions into valuable digital assets',
              },
              {
                title: 'AI-Powered Insights',
                icon: <TrendingUp className="h-12 w-12 text-hedera-green" />,
                description: 'Get personalized strategies to reduce your carbon footprint',
              },
              {
                title: 'Carbon Credit Marketplace',
                icon: <ShoppingBag className="h-12 w-12 text-hedera-green" />,
                description: 'Trade your carbon credits in a transparent, liquid market',
              },
              {
                title: 'Emission Reduction Challenge',
                icon: <Award className="h-12 w-12 text-hedera-green" />,
                description: 'Participate in challenges to boost your reduction efforts',
              },
              {
                title: 'Advanced Analytics',
                icon: <BarChart2 className="h-12 w-12 text-hedera-green" />,
                description: 'Gain deep insights into your emission patterns and reduction impact',
              },
              {
                title: 'User-Friendly Dashboard',
                icon: <Layout className="h-12 w-12 text-hedera-green" />,
                description: 'Monitor and manage your carbon credits with ease',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-green-50 border border-green-200 p-6 rounded-lg shadow-sm text-center flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-green-100"
              >
                {item.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center bg-green-50">
        <p className="text-sm text-gray-600">
          Empowering a sustainable future through blockchain technology and AI
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
