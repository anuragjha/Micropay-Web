import Web3 from "web3";

import SimpleStorage from "./contracts/SimpleStorage.json";
import Storage from "./contracts/Storage.json";
import Platform from "./contracts/Platform.json";
import ContributorApiInfo from "./contracts/ContributorApiInfo.json"
import UserApiInfo from "./contracts/UserApiInfo.json"


const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://127.0.0.1:8545"),
  },
  contracts: [SimpleStorage, Storage, Platform, ContributorApiInfo, UserApiInfo],
  events: {
    SimpleStorage: ["StorageSet"],
    Storage: ["StorageSet"],
    Platform: ["print", "printUint256"],
    ContributorApiInfo: ["LogConstructorInitiated", "print"],
    UserApiInfo: ["LogConstructorInitiated"],
  },
};

export default options;
