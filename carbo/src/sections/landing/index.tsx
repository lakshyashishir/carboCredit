"use client";
import React, { useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { storeAccountInfoInCookies } from '@/api/cookies';
import { chainIdToNetwork, isCorrectHederaNetwork } from '@/utils/common/helpers';
import { requestAccount, getWalletProvider, getCurrentChainId } from '@/api/wallet';
import { HEDERA_COMMON_WALLET_REVERT_REASONS, OFFCIAL_NETWORK_NAME } from '@/utils/common/constants';
import { NoWalletToast, CommonErrorToast, NetworkMismatchToast } from '@/components/toast/CommonToast';
import { Leaf, TrendingUp, ShoppingBag } from 'lucide-react';

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
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-10">
        <h1 className="text-2xl font-bold text-hedera-green">CarboCredit</h1>
        <div>
          <button
            onClick={handleConnectWallet}
            className="bg-gradient-to-r from-hedera-gradient-1-blue to-hedera-gradient-1-purple text-white text-lg font-medium px-4 py-2 rounded-xl cursor-pointer mr-2"
          >
            Connect Wallet
          </button>
          <button
            className="bg-hedera-green text-white text-lg font-medium px-4 py-2 rounded-xl cursor-pointer"
          >
            Docs
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex items-center min-h-screen px-4 md:px-12 lg:px-24">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-left mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-hedera-green mb-6">
              Tokenize Your Carbon Impact
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              CarboCredit transforms verified carbon emission reductions into tradable tokens on the <span className="text-hedera-green font-medium">Hedera blockchain</span>, powered by AI insights for maximum environmental impact.
            </p>
            <button
              onClick={handleConnectWallet}
              className="bg-gradient-to-r from-hedera-gradient-1-blue to-hedera-gradient-1-purple text-white text-lg font-medium px-6 py-3 rounded-xl cursor-pointer"
            >
              Get Started
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="/api/placeholder/600/400" 
              alt="Carbon Credit Tokenization" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center text-hedera-green">Our Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Verified Tokenization', icon: <Leaf className="h-12 w-12 text-hedera-green" />, description: 'Turn your carbon reductions into valuable digital assets' },
              { title: 'AI-Powered Insights', icon: <TrendingUp className="h-12 w-12 text-hedera-green" />, description: 'Get personalized strategies to reduce your carbon footprint' },
              { title: 'Carbon Credit Marketplace', icon: <ShoppingBag className="h-12 w-12 text-hedera-green" />, description: 'Trade your carbon credits in a transparent, liquid market' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                {item.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center bg-gray-200">
        <p className="text-sm text-gray-600">
          Empowering a sustainable future through blockchain technology and AI
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;