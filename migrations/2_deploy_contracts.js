const Storage = artifacts.require("Storage");
const TransferEther = artifacts.require("TransferEther");

const Platform = artifacts.require("Platform");

const ContributorApiInfo = artifacts.require("ContributorApiInfo");
const UserApiInfo = artifacts.require("UserApiInfo");

const ApiInfo = artifacts.require("ApiInfo");
const ProvableInfo = artifacts.require("ProvableInfo");

const UniDirectionalPayment = artifacts.require("UniDirectionalPayment");

module.exports = function(deployer) {

  deployer.deploy(Storage);
  deployer.deploy(TransferEther);

  deployer.deploy(Platform, "0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475");
  
  deployer.deploy(ContributorApiInfo, "0x9267307394e4bF79E98dDD0f4B2D99Fd724d386C");
  deployer.deploy(UserApiInfo, "0x768dDe13E5FE253Fb5d3D9D14F6C72C9F36C8951");


  // deployer.deploy(ApiInfo, "ok", "URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price",
  // 123456789, "0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475", "0x12b94d2015c0A563150905eeb0828e91cd40eD9E");
  // deployer.deploy(ProvableInfo, "ok", "URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price",
  //   123456789, "0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475", "0x12b94d2015c0A563150905eeb0828e91cd40eD9E",
  //   "0x12b94d2015c0A563150905eeb0828e91cd40eD9E", "0xE74b6Dec96BC2D54896Eb8cd65cDA5a3859F4f8A");

  // deployer.deploy(UniDirectionalPayment, "0x12b94d2015c0A563150905eeb0828e91cd40eD9E", 
  //   "0x1Bc95B7E67E51f0Cf793ECDB54720ff91ac8409f", 12312312312);

};
