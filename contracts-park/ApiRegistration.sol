pragma solidity >=0.6.0 <0.7.0;

contract ApiRegistration {
    constructor() public {}

    function registerApi(address factoryAddr, string memory _name, string memory _uri, uint _cost) public {
        ApiFactory af = ApiFactory(factoryAddr);
        af.createAndSendEther(msg.sender, _name, _uri, _cost);
    }
}

contract ApiFactory {
    function createAndSendEther(address _owner, string memory _name, string memory _uri, uint _cost) public payable {}
}