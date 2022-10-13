require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

require("tsconfig-paths/register");
require("dotenv").config();

const { ALCHEMY_API_KEY, TEST_ACCOUNT1_PRIVATE_KEY } = process.env;

const config = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [TEST_ACCOUNT1_PRIVATE_KEY],
    },
  },
};

module.exports = config;
