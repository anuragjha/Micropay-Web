import Web3 from "web3";
import Storage from "./contracts/Storage.json";
import TransferEther from "./contracts/TransferEther.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://127.0.0.1:8545"),
  },
  contracts: [Storage, TransferEther],
  events: {
    SimpleStorage: ["StorageSet"]
  },
};

export default options;
