import Web3 from "web3";
import ComplexStorage from "./contracts/ComplexStorage.json";
import SimpleStorage from "./contracts/SimpleStorage.json";
// import TutorialToken from "./contracts/TutorialToken.json";

//import ApiCeller from "./contracts/ApiCeller.json";
//import ApiRegistration from "./contracts/ApiRegistration.json";
//import ApiUse from "./contracts/ApiUse.json";

//import PaymentChannel from "./contracts/PaymentChannel.json";
//import ReceiveEther from "./contracts/ReceiveEther.json";
//import SendEther from "./contracts/SendEther.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://127.0.0.1:8545"),
  },
  contracts: [SimpleStorage, ComplexStorage],
  events: {
    SimpleStorage: ["StorageSet"]
  },
};

export default options;
