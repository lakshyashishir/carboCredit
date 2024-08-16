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
      className="relative text-white 2xl:max-w-[100rem] 2xl:mx-auto h-full flex-1 w-full"
    >
      {/* Header */}
      <motion.div variants={verticalVariant} className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-hedera-green">CarboCredit</h1>
        <div>
          <motion.div
            variants={verticalVariant}
            onClick={handleConnectWallet}
            className="bg-gradient-to-r from-hedera-gradient-1-blue to-hedera-gradient-1-purple text-lg font-medium px-4 py-2 rounded-xl cursor-pointer mr-2 inline-block"
          >
            Wallet
          </motion.div>
          <motion.div
            variants={verticalVariant}
            className="bg-hedera-green text-white text-lg font-medium px-4 py-2 rounded-xl cursor-pointer inline-block"
          >
            Docs
          </motion.div>
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
          Tokenizing Carbon
        </motion.h1>

        <motion.p
          variants={verticalVariant}
          className="text-landing-text-hero font-normal text-center mt-6 sm:w-[38rem] md:w-[47rem] lg:w-[57rem]"
        >
          CarboCredit is a platform built on the <span className="text-hedera-green font-medium">Hedera blockchain</span> that uses AI and IoT devices to measure and verify carbon emission reductions, tokenizing these reductions as tradable carbon credits.
        </motion.p>
      </motion.div>

      {/* What We Offer */}
      <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-hedera-green">What We Offer?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Verified Credits', 'Blockchain Security', 'AI-Powered', 'Real-time Tracking'].map((item, index) => (
            <motion.div
              key={index}
              variants={verticalVariant}
              className="bg-white/10 p-4 rounded-lg text-center"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-hedera-green">Quick Actions</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.div className="bg-red-500 text-white px-6 py-3 rounded-xl cursor-pointer">
            Buy Credits
          </motion.div>
          <motion.div className="bg-yellow-500 text-white px-6 py-3 rounded-xl cursor-pointer">
            Sell Credits
          </motion.div>
          <motion.div className="bg-blue-500 text-white px-6 py-3 rounded-xl cursor-pointer">
            View Market
          </motion.div>
        </div>
      </motion.div>

      {/* Our Achievements */}
      <motion.div variants={verticalVariant} className="mt-16 w-[90%] mx-auto mb-20">
        <h2 className="text-2xl font-semibold mb-4 text-hedera-green">Our Achievements</h2>
        <div className="bg-green-200 p-4 rounded-lg">
          <p className="text-green-800 text-center">1,000,000 tons of CO2 reduced</p>
        </div>
      </motion.div>

      {/* Footer */}
      {/* <motion.p
        variants={verticalVariant}
        className="fixed bottom-0 w-full text-center text-xl px-6 sm:text-2xl md:w-fit lg:text-3xl"
      >
        Empowering a sustainable future through blockchain technology
      </motion.p> */}
    </motion.div>
  );
};

export default LandingPage;