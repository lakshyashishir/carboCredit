const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

const DEPLOYMENT_FILE = 'deployment_addresses.json';

async function readDeploymentAddresses() {
  if (fs.existsSync(DEPLOYMENT_FILE)) {
    const data = fs.readFileSync(DEPLOYMENT_FILE, 'utf8');
    return JSON.parse(data);
  }
  return {};
}

async function writeDeploymentAddresses(addresses) {
  fs.writeFileSync(DEPLOYMENT_FILE, JSON.stringify(addresses, null, 2));
}

async function deployWithCheck(name, factory, ...args) {
  const addresses = await readDeploymentAddresses();
  
  if (addresses[name]) {
    console.log(`${name} already deployed at ${addresses[name]}`);
    return await hre.ethers.getContractAt(name, addresses[name]);
  }

  console.log(`Deploying ${name}...`);
  const contract = await factory.deploy(...args);
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log(`${name} deployed to:`, address);

  addresses[name] = address;
  await writeDeploymentAddresses(addresses);

  return contract;
}

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy CarbonCreditToken
  const CarbonCreditToken = await hre.ethers.getContractFactory("CarbonCreditToken");
  const carbonCreditToken = await deployWithCheck("CarbonCreditToken", CarbonCreditToken, deployer.address);

  // Deploy CarbonCreditMarketplace
  const CarbonCreditMarketplace = await hre.ethers.getContractFactory("CarbonCreditMarketplace");
  const carbonCreditMarketplace = await deployWithCheck("CarbonCreditMarketplace", CarbonCreditMarketplace, deployer.address, await carbonCreditToken.getAddress());

  // Deploy EmissionVerification
  const EmissionVerification = await hre.ethers.getContractFactory("EmissionVerification");
  const emissionVerification = await deployWithCheck("EmissionVerification", EmissionVerification);

  // Deploy UserRewards
  const UserRewards = await hre.ethers.getContractFactory("UserRewards");
  const userRewards = await deployWithCheck("UserRewards", UserRewards, deployer.address);

  console.log("All contracts deployed successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});