import { Client, AccountId, PrivateKey } from "@hashgraph/sdk";
import dotenv from 'dotenv';

dotenv.config();

const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;

if (!myAccountId || !myPrivateKey) {
    throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
}

export const hederaClient = Client.forTestnet();
hederaClient.setOperator(AccountId.fromString(myAccountId), PrivateKey.fromString(myPrivateKey));