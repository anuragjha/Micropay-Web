pragma solidity >0.6.1 <0.7.0;

contract ReceiveEther {
    // This is a special function called the fallback.
    // The fallback function declared payable enables other contracts to
    // send Ether by send, transfer, or call.
    fallback () external payable {}

    receive() external payable {}

    function getBalance() public view returns (uint) {
        return msg.sender.balance;
    }
}