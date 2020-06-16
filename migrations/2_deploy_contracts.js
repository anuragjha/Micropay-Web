const Storage = artifacts.require("Storage");
const TransferEther = artifacts.require("TransferEther");

const Platform = artifacts.require("Platform");

const ContributorApiInfo = artifacts.require("ContributorApiInfo");
const UserApiInfo = artifacts.require("UserApiInfo");

const ApiInfo = artifacts.require("ApiInfo");
const ProvableInfo = artifacts.require("ProvableInfo");

module.exports = function(deployer) {

  deployer.deploy(Storage);
  deployer.deploy(TransferEther);

  deployer.deploy(Platform, "0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475");
  
  deployer.deploy(ContributorApiInfo, "0x12b94d2015c0A563150905eeb0828e91cd40eD9E");
  deployer.deploy(UserApiInfo, "0x12b94d2015c0A563150905eeb0828e91cd40eD9E");


  deployer.deploy(ApiInfo, "ok", "URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price",
  123456789, "0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475", "0x12b94d2015c0A563150905eeb0828e91cd40eD9E");
  deployer.deploy(ProvableInfo, "ok", "URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price",
    123456789, "0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475", "0x12b94d2015c0A563150905eeb0828e91cd40eD9E",
    "0x12b94d2015c0A563150905eeb0828e91cd40eD9E");

};
