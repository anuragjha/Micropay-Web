pragma solidity >=0.6.0 <0.7.0;

contract ApiUse {

    constructor() public {}

    function requestApi(address cellerAddr, string memory _name) public view returns(string memory) {
        ApiCeller ac = ApiCeller(cellerAddr);
        return ac.requestApi(msg.sender, _name);
    }

}

contract ApiCeller {
    function addApiData(address payable _owner, string memory _name, string memory _uri, uint _cost) public payable returns(string memory) {}

    function requestApi(address payable _user, string memory _name) public view returns (string memory){}

    
}