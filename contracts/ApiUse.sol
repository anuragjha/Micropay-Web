pragma solidity >=0.6.0 <0.7.0;

contract ApiUse {

    constructor() public {}

    function useApi(address factoryAddr, string memory _name) public view returns(string memory) {
        ApiFactory af = ApiFactory(factoryAddr);
        return af.run(msg.sender, _name);
    }
    
    function getApiInfo(address factoryAddr, string memory _name) public view returns (address, address, address, string memory, uint, uint) {
        ApiFactory af = ApiFactory(factoryAddr);
        return af.getApiInfo(msg.sender, _name);
    }
    

    

}

contract ApiFactory {
    function run(address _user, string memory _name) public view returns(string memory) {}
    function getApiInfo(address _user, string memory _name) public view returns (address, address, address, string memory, uint, uint) {}
}