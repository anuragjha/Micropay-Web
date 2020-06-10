const SimpleStorage = artifacts.require("SimpleStorage");
const SimpleStorageA = artifacts.require("SimpleStorageA");
const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");

const PaymentChannel = artifacts.require("ApiCeller");
const PaymentChannel = artifacts.require("ApiRegistration");
const PaymentChannel = artifacts.require("ApiUse");

const PaymentChannel = artifacts.require("PaymentChannel");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(SimpleStorageA);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);

    deployer.deploy(ApiCeller);
    deployer.deploy(ApiRegistration);
    deployer.deploy(ApiUse);

  deployer.deploy(PaymentChannel);
};
