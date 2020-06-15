const Storage = artifacts.require("Storage");
const TransferEther = artifacts.require("TransferEther");
const ProvableInfo = artifacts.require("ProvableInfo");

module.exports = function(deployer) {
  deployer.deploy(Storage);
  deployer.deploy(TransferEther);
  deployer.deploy(ProvableInfo, "ok", "URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price",
  123456789, "0xFEB946A333bA34a94dE99e6a91521F7CC689be43", "0x12b94d2015c0A563150905eeb0828e91cd40eD9E",
  "0x45F4Cc5C539d29c9fcC9415F5437156d27f7fcad");
};
