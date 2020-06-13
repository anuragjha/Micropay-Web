pragma solidity > 0.6.0 < 0.7.0;

contract TransferEther {
fallback () external payable {}

receive() external payable {}

function getBalance() public view returns (uint) {
return msg.sender.balance;
}

function sendEther(address payable  _to) public payable {
(bool sent,) = _to.call.value(msg.value)("");
require(sent, "Failed to send Ether");
}
}

contract ApiUse {
constructor() public {}

function useApi(address factoryAddr, string memory _name) public payable returns(string memory) {
ApiFactory af = ApiFactory(factoryAddr);
return af.run(msg.sender, _name);
}

function getApiInfo(address factoryAddr, string memory _name) public view returns
(address contractAddress, address provableAddress, address owner, string memory name, uint cost, uint api_balance, uint provable_balance) {
ApiFactory af = ApiFactory(factoryAddr);
return af.getApiInfo(msg.sender, _name);
}

function closeApiAccount(address factoryAddr, string memory _name) public payable {
ApiFactory af = ApiFactory(factoryAddr);
af.destruct(msg.sender, _name);
}
}

contract ApiRegistration {
constructor() public {}

function registerApi(address factoryAddr, string memory _name, string memory _uri, uint _cost) public {
ApiFactory af = ApiFactory(factoryAddr);
af.createAndSendEther(msg.sender, _name, _uri, _cost);
}
}

contract Profile is TransferEther, ApiRegistration, ApiUse {
address platform;
mapping(address => mapping(string => address)) userApiStore; // mapping of Api name => provableInfo address

constructor() public {}

function setProfile(address _platform) public {
platform = _platform;
}

function getProfile() public view returns(address _profile, address _platform, uint _balance) {
_profile = address(msg.sender);
_platform = platform;
_balance = msg.sender.balance;
}

function userApiAdd(string memory _name, address _provableInfoAddress) public {
userApiStore[msg.sender][_name] = _provableInfoAddress;
}

function userApiGet(string memory _name) public view returns(address) {
return userApiStore[msg.sender][_name];
}

function userApiRun(string memory _name) public returns (string memory) {
return ProvableInfo(userApiStore[msg.sender][_name]).run(msg.sender);
}

}


contract ApiFactory {
function createAndSendEther(address _owner, string memory _name, string memory _uri, uint _cost) public payable {}
function run(address payable _user, string memory _name) public payable returns(string memory) {}
function getApiInfo(address _user, string memory _name) public view returns (address contractAddress, address provableAddress, address owner, string memory name, uint cost, uint api_balance, uint provable_balance) {}
function destruct(address payable _user, string memory _name) public payable {}
}


contract ProvableInfo {
function run(address _user) public returns (string memory) {}
}








