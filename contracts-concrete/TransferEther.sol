pragma solidity > 0.6.0 < 0.7.0;

contract TransferEther {
fallback () external payable {}

receive() external payable {}

function getBalance() virtual public view returns (uint) {
return msg.sender.balance;
}

function sendEther(address payable  _to) virtual public payable {
(bool sent,) = _to.call.value(msg.value)("");
require(sent, "Failed to send Ether");
}

function getSender() view public returns (address) {
return address(msg.sender);
}
}