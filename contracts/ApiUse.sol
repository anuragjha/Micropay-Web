pragma solidity >=0.6.0 <0.7.0;

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
    
    function sendEther(address payable _to) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent, bytes memory data) = _to.call.value(msg.value)("");
        require(sent, "Failed to send Ether");
    }
    

    

}

contract ApiFactory {
    function run(address payable _user, string memory _name) public payable returns(string memory) {}
    function getApiInfo(address _user, string memory _name) public view returns (address contractAddress, address provableAddress, address owner, string memory name, uint cost, uint api_balance, uint provable_balance) {}
}