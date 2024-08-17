'use client';

import { motion } from 'framer-motion';
import { BrowserProvider } from 'ethers';
import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storeAccountInfoInCookies } from '@/api/cookies';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { chainIdToNetwork, isCorrectHederaNetwork } from '@/utils/common/helpers';
import { requestAccount, getWalletProvider, getCurrentChainId } from '@/api/wallet';
import { HEDERA_COMMON_WALLET_REVERT_REASONS, OFFCIAL_NETWORK_NAME } from '@/utils/common/constants';
import { NoWalletToast, CommonErrorToast, NetworkMismatchToast } from '@/components/toast/CommonToast';
import { Leaf, TrendingUp, ShoppingBag } from 'lucide-react';

const LandingPage = () => {
  const router = useRouter();
  const toaster = useToast();
  const [accounts, setAccounts] = useState<string[]>([]);
  const verticalVariant = VerticalCommonVariants(30, 0.5);
  const { walletProvider, err: walletProviderErr } = getWalletProvider();

  /** @dev handle connect wallet when a user click `connect wallet` button */
  const handleConnectWallet = async () => {
    // handle walletObject or walletProvider being null by toasting it out on the client
    if (walletProviderErr === `!${OFFCIAL_NETWORK_NAME}` || !walletProvider) {
      NoWalletToast({ toaster });
      return;
    }

    // detect if the current network is expected Hedera Networks
    if (!(await isCorrectHederaNetwork(walletProvider))) {
      NetworkMismatchToast({ toaster });
      return;
    }

    // call requestAccount() API for users to connect their account to the DApp
    const { accounts, err: getAccountErr } = await requestAccount(walletProvider!);

    // handle getAccountError
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

    // update accounts state
    setAccounts(accounts as string[]);
  };

  // listen to the changes of the accounts state to do login logic
  useEffect(() => {
    (async () => {
      if (accounts.length > 0) {
        // get current chainId
        const currentChainId = (await getCurrentChainId(walletProvider as BrowserProvider))
          .currentChainId as string;

        // convert chainIdToNetwork
        const network = chainIdToNetwork(currentChainId);

        // store accounts to Cookies
        const err = storeAccountInfoInCookies(accounts, network);
        if (err) {
          CommonErrorToast({
            toaster,
            title: 'Error logging in',
            description: HEDERA_COMMON_WALLET_REVERT_REASONS.DEFAULT.description,
          });
          return;
        }

        // navigate user to /hedera/overview
        router.push('/hedera/overview');
      }
    })();
  }, [accounts, router, toaster, walletProvider]);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={verticalVariant}
      className="relative text-white 2xl:max-w-[100rem] 2xl:mx-auto min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800"
    >
      {/* Header */}
      <motion.div variants={verticalVariant} className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-hedera-green">CarboCredit</h1>
        <div>
          <motion.button
            variants={verticalVariant}
            onClick={handleConnectWallet}
            className="bg-gradient-to-r from-hedera-gradient-1-blue to-hedera-gradient-1-purple text-lg font-medium px-4 py-2 rounded-xl cursor-pointer mr-2"
          >
            Connect Wallet
          </motion.button>
          <motion.button
            variants={verticalVariant}
            className="bg-hedera-green text-white text-lg font-medium px-4 py-2 rounded-xl cursor-pointer"
          >
            Docs
          </motion.button>
        </div>
      </motion.div>

      {/* Hero */}
      <motion.div
        variants={verticalVariant}
        className="flex flex-col justify-center items-center mx-auto mt-12 w-[90%] sm:w-[70%]"
      >
        <motion.h1
          variants={verticalVariant}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-hedera-green via-hedera-green to-hedera-green/50"
        >
          Tokenize Your Carbon Impact
        </motion.h1>

        <motion.p
          variants={verticalVariant}
          className="text-landing-text-hero font-normal text-center mt-6 sm:w-[38rem] md:w-[47rem] lg:w-[57rem]"
        >
          CarboCredit transforms verified carbon emission reductions into tradable tokens on the <span className="text-hedera-green font-medium">Hedera blockchain</span>, powered by AI insights for maximum environmental impact.
        </motion.p>
      </motion.div>

      {/* Core Features */}
      <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-hedera-green">Our Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Verified Tokenization', icon: <Leaf className="h-6 w-6 text-hedera-green" />, description: 'Turn your carbon reductions into valuable digital assets' },
            { title: 'AI-Powered Insights', icon: <TrendingUp className="h-6 w-6 text-hedera-green" />, description: 'Get personalized strategies to reduce your carbon footprint' },
            { title: 'Carbon Credit Marketplace', icon: <ShoppingBag className="h-6 w-6 text-hedera-green" />, description: 'Trade your carbon credits in a transparent, liquid market' }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={verticalVariant}
              className="bg-white/10 p-6 rounded-lg text-center flex flex-col items-center"
            >
              {item.icon}
              <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
              <p className="mt-2 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4 text-hedera-green">Join the Green Revolution</h2>
        <motion.button
          onClick={handleConnectWallet}
          className="bg-gradient-to-r from-hedera-gradient-1-blue to-hedera-gradient-1-purple text-lg font-medium px-6 py-3 rounded-xl cursor-pointer"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.footer
        variants={verticalVariant}
        className="mt-auto py-6 text-center"
      >
        <p className="text-sm text-gray-400">
          Empowering a sustainable future through blockchain technology and AI
        </p>
      </motion.footer>
    </motion.div>
  );
};

export default LandingPage;