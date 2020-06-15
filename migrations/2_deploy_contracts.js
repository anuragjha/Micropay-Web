const Storage = artifacts.require("Storage");
const TransferEther = artifacts.require("TransferEther");

module.exports = function(deployer) {
  deployer.deploy(Storage);
  deployer.deploy(TransferEther);
};
