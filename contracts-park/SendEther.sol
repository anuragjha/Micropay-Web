pragma solidity >0.6.1 <0.7.0;


contract SendEther {
    event StorageSet(string _message);

    function sendEther(address payable  _to) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent,) = _to.call.value(msg.value)("");
        require(sent, "Failed to send Ether");
        emit StorageSet("Ether send!");
    }
}