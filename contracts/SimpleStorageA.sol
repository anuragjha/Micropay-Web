pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorageA {
    event StorageSet(string _message);

    uint public storedData;
    address payable public owner;

    constructor() public payable {
        owner = msg.sender;
    }

    function set(uint x) public {
        storedData = x;

        emit StorageSet("Data stored successfully!");
    }

    function transfer(address payable _payee, uint _amt) public {
        storedData = _amt;
        (bool sent, ) = _payee.call.value(_amt)("");
        require(sent, "Failed to send Ether");
    }

}