pragma solidity >=0.4.21 <0.7.0;

contract ApiUse {

    constructor() public {}

    function requestApi(address addr, string memory _name) public returns(string memory) {
        address owner = msg.sender;
        ApiCeller ac = ApiCeller(addr);
        return ac.requestApi(owner, _name);
    }

}

contract ApiCeller {
    function addApiData(address _owner, string memory _name, string memory _uri) public payable returns(string memory) {}
    function requestApi(address _requester, string memory _name) public payable returns (string memory) {}
}