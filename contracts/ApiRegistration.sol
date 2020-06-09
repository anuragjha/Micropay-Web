pragma solidity >=0.4.21 <0.7.0;

contract ApiRegistration {
    // event addedApiData(string _message, string _name, string _uri, address _owner);
    // event notAddedApiData(string _message);

    constructor() public {}

    function addApiData(address addr, string memory _name, string memory _uri) public returns(string memory) {
        // Add Api data to ApiStore in ApiCeller contract
        address owner = msg.sender;
        ApiCeller ac = ApiCeller(addr);
        return ac.addApiData(owner, _name, _uri);
    }
}

contract ApiCeller {
    function addApiData(address _owner, string memory _name, string memory _uri) public payable returns(string memory) {}
    function requestApi(address _requester, string memory _name) public payable returns (string memory){}
}