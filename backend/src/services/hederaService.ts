const { Client, ContractExecuteTransaction, ContractCallQuery, Hbar } = require("@hashgraph/sdk");
require('dotenv').config();

const accountId = process.env.MY_ACCOUNT_ID;
const privateKey = process.env.MY_PRIVATE_KEY;

const client = Client.forTestnet();
client.setOperator(accountId, privateKey);

const carbonCreditTokenAddress = "0xbef98e94bfe0b7de322ccc1545975dd342a4fbdd";
const carbonCreditMarketplaceAddress = "0x32b5a14674a4935b9b0e6357081e976f146403a3";
const emissionVerificationAddress = "0x7fb4f9808008495647cb2f57540ab36d5fe282cc";
const userRewardsAddress = "0x6afd921bf175a6d66ecc552382f52ba6e702067f";

const hederaService = {
  async mintCredit(recipient, amount, projectId) {
    const transaction = new ContractExecuteTransaction()
      .setContractId(carbonCreditTokenAddress)
      .setGas(100000)
      .setFunction("mintCredit", [recipient, amount, projectId]);

    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    return receipt;
  },

  async listCredit(tokenId, price) {
    const transaction = new ContractExecuteTransaction()
      .setContractId(carbonCreditMarketplaceAddress)
      .setGas(100000)
      .setFunction("listCredit", [tokenId, price]);

    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    return receipt;
  },

  async reportEmission(emissionAmount) {
    const transaction = new ContractExecuteTransaction()
      .setContractId(emissionVerificationAddress)
      .setGas(100000)
      .setFunction("reportEmission", [emissionAmount]);

    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    return receipt;
  },

  async claimReward() {
    const transaction = new ContractExecuteTransaction()
      .setContractId(userRewardsAddress)
      .setGas(100000)
      .setFunction("claimReward", []);

    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    return receipt;
  },

};

module.exports = hederaService;