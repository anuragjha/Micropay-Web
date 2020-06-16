import Web3 from "web3";

import Storage from "./contracts/Storage.json";
import TransferEther from "./contracts/TransferEther.json";

import Platform from "./contracts/Platform.json";

import ContributorApiInfo from "./contracts/ContributorApiInfo.json";
import UserApiInfo from "./contracts/UserApiInfo.json";

import ApiInfo from "./contracts/ApiInfo.json";
import ProvableInfo from "./contracts/ProvableInfo.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://127.0.0.1:8545"),
  },
  contracts: [Storage, TransferEther, Platform, ContributorApiInfo, UserApiInfo, ApiInfo, ProvableInfo],
  events: {
    SimpleStorage: ["StorageSet"],

    Platform: ["print"],
    ContributorApiInfo: ["LogConstructorInitiated"],
    UserApiInfo: ["LogConstructorInitiated"],
    ApiInfo: ["LogConstructorInitiated", "LogProvableInfoCreated"],
    ProvableInfo: ["LogConstructorInitiated", "LogPriceUpdated", "LogNewProvableQuery"],
  },
};

export default options;
