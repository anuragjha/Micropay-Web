pragma solidity >=0.5.17 <0.6.0;

contract TransferEther {
    // function fallback () external payable {}

    // receive() external payable {}
    function () external payable {}

    function getBalance() public view returns (uint) {
        return msg.sender.balance;
    }

    // function sendEther(address payable  _to) public payable {
    //     (bool sent,) = _to.call.value(msg.value)("");
    //     require(sent, "Failed to send Ether");
    // }
    
    function sendEther(address payable  _to, uint _amount) public payable {
        (bool sent,) = _to.call.value(_amount)("");
        require(sent, "Failed to send Ether");
    }

    function getSender() view public returns (address) {
        return address(msg.sender);
    }
}