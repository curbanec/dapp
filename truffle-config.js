//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
// in order to use this, I installed it locally with the following
// npm install dotenv --save
require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_URL);
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    }
  }
};
