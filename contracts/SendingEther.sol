//pragma solidity >=0.6.0 <0.7.0;
//
//contract ReceiveEther {
//// This is a special function called the fallback.
//// The fallback function declared payable enables other contracts to
//// send Ether by send, transfer, or call.
//fallback () external payable {}
//
//receive() external payable {}
//
//function getBalance() public view returns (uint) {
//return address(this).balance;
//}
//}
//
//contract SendEther {
//function sendViaTransfer(address payable _to) public payable {
//// This function is no longer recommended for sending Ether.
//_to.transfer(msg.value/20);
//}
//
//function sendViaSend(address payable _to) public payable {
//// Send returns a boolean value indicating success or failure.
//// This function is not recommended for sending Ether.
//bool sent = _to.send(msg.value/20);
//require(sent, "Failed to send Ether");
//}
//
//function sendViaCall(address  _to) public payable {
//// Call returns a boolean value indicating success or failure.
//// This is the current recommended method to use.
//(bool sent,) = _to.call.value(msg.value/20)("");
//require(sent, "Failed to send Ether");
//}
//}