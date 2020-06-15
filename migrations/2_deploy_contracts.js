const SimpleStorage = artifacts.require("SimpleStorage");
// const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");

//const ApiCeller = artifacts.require("ApiCeller");
//const ApiRegistration = artifacts.require("ApiRegistration");
//const ApiUse = artifacts.require("ApiUse");

//const PaymentChannel = artifacts.require("PaymentChannel");
//const ReceiveEther = artifacts.require("ReceiveEther");
//const SendEther = artifacts.require("SendEther");
const TransferEther = artifacts.require("TransferEther");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  // deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);

//    deployer.deploy(ApiCeller);
//    deployer.deploy(ApiRegistration);
//    deployer.deploy(ApiUse);

//  deployer.deploy(PaymentChannel);
//    deployer.deploy(ReceiveEther);
//    deployer.deploy(SendEther);
    deployer.deploy(TransferEther);
};
