import dotenv from 'dotenv';

dotenv.config();

export const hederaConfig = {
  accountId: process.env.MY_ACCOUNT_ID,
  privateKey: process.env.MY_PRIVATE_KEY,
  network: process.env.HEDERA_NETWORK || 'testnet',
  tokenAddress: process.env.CARBON_CREDIT_TOKEN_ADDRESS,
  marketplaceAddress: process.env.CARBON_CREDIT_MARKETPLACE_ADDRESS,
  verificationAddress: process.env.EMISSION_VERIFICATION_ADDRESS,
  rewardsAddress: process.env.USER_REWARDS_ADDRESS,
};