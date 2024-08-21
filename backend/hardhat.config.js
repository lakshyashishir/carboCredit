const { time } = require("console");

require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
    solidity: {
        compilers: [
          {
            version: "0.8.20",
          },
        ],
      },
  networks: {
    hedera: {
      url: `https://testnet.hashio.io/api`,
      accounts: [process.env.MY_PRIVATE_KEY],
      chainId: 296,
      timeout: 120000,
      gas: 8500000,
      gasPrice: 2000000000000,
    },
  },
};
