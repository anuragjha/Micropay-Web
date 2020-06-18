pragma solidity >=0.5.17 <0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
// import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/math/SafeMath.sol";
// import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/cryptography/ECDSA.sol";
// import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/utils/ReentrancyGuard.sol";

import "./TransferEther.sol";


contract UniDirectionalPayment is ReentrancyGuard, TransferEther {
    event print(string);
    event printAddress(address);
    
    using SafeMath for uint;
    using ECDSA for bytes32;

    address payable public payer;
    address payable public payee;

    uint public expiresAt;

    constructor(address payable _payer, address payable _payee, uint _expiresAt) public payable {
        require(_expiresAt > block.timestamp, "Expiration must be > now");

        payer = _payer;//msg.sender;
        payee = _payee;

        expiresAt = _expiresAt;
    }

    function verify(
        bytes memory _signature,
        address _payer,
        address _contract,
        uint _payeeBalance
    ) public pure returns (bool) {
        return
            keccak256(abi.encodePacked(_contract, _payeeBalance))
                .toEthSignedMessageHash()
                .recover(_signature) == _payer;
    }

    modifier checkSignature(bytes memory _signature, uint _payeeBalance) {
        require(
            verify(_signature, payer, address(this), _payeeBalance),
            "Invalid signature"
        );
        _;
    }

    function close(address _contributor, uint _payeeBalance, bytes memory _signature)
        public
        nonReentrant
        // checkSignature(_signature, _payeeBalance)
        payable
    {
        require(_contributor == payee, "Not payee");

        (bool sent, ) = payee.call.value(_payeeBalance)("");
        require(sent, "Failed to send Ether");

        selfdestruct(payer);
    }

    function kill(address _user) public {
        require(_user == payer, "Not payer");
        require(block.timestamp >= expiresAt, "channel not expired");
        selfdestruct(payer);
    }
    
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
}