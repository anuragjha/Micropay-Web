pragma solidity >=0.6.0 <0.7.0;

contract ApiRegistration {
    // event addedApiData(string _message, string _name, string _uri, address _owner);
    // event notAddedApiData(string _message);
    constructor() public {}

//    function addApiData(address addr, string memory _name, string memory _uri) public returns(string memory) {
    function addApiData(address cellerAddr, string memory _name, string memory _uri, uint _cost) public {
        // Add Api data to ApiStore in ApiCeller contract

        ApiCeller ac = ApiCeller(cellerAddr);
//        return ac.addApiData(owner, _name, _uri);
        ac.addApiData(msg.sender, _name, _uri, _cost);
    }
}

contract ApiCeller {
    function addApiData(address payable _owner, string memory _name, string memory _uri, uint _cost) public payable returns(string memory) {}

    function requestApi(address payable _user, string memory _name) public view returns (string memory){}
}