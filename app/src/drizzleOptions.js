import Web3 from "web3";
import Storage from "./contracts/Storage.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://127.0.0.1:8545"),
  },
  contracts: [Storage],
  events: {
    SimpleStorage: ["StorageSet"]
  },
};

export default options;
