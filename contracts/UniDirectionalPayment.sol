pragma solidity >=0.5.16 <0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
// import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/math/SafeMath.sol";
// import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/cryptography/ECDSA.sol";
// import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/utils/ReentrancyGuard.sol";

import "./TransferEther.sol";
import "./ProvableInfo.sol";


contract UniDirectionalPayment is ReentrancyGuard, TransferEther {
    event print(string);
    event printAddress(address);
    
    using SafeMath for uint;
    using ECDSA for bytes32;

    address payable public payer;
    address payable public payee;
    
    uint public expiresAt;
    
    address provableInfoAddress;

    constructor(address payable _payer, address payable _payee, uint _expiresAt) public payable {
        require(_expiresAt > block.timestamp, "Expiration must be > now");

        payer = _payer;//msg.sender;
        payee = _payee;

        expiresAt = _expiresAt;
    }
    
    function setProvableAddress(address _provableInfoAddress) public {
        provableInfoAddress = _provableInfoAddress;
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
    
    function withdraw(address _contributor, uint _payeeBalance, bytes memory _signature)
        public
        nonReentrant
        // checkSignature(_signature, _payeeBalance)
        payable
    {
        emit print("in close");
        require(_contributor == payee, "Not payee");
        emit print("_contributor == payee");

        (bool sent, ) = payee.call.value(_payeeBalance)("");
        require(sent, "Failed to send Ether");
        emit print("_contributor == payee");
        
    }

    function close(address _contributor, uint _payeeBalance, bytes memory _signature)
        public
        nonReentrant
        // checkSignature(_signature, _payeeBalance)
        payable
    {
        emit print("in close");
        require(_contributor == payee, "Not payee");
        emit print("_contributor == payee");

        (bool sent, ) = payee.call.value(_payeeBalance)("");
        require(sent, "Failed to send Ether");
        emit print("_contributor == payee");
        
        closeProvable();

        selfdestruct(payer);
    }


    function kill(address _user) public {
        require(_user == payer, "Not payer");
        require(block.timestamp >= expiresAt, "channel not expired");
        
        closeProvable();
        
        selfdestruct(payer);
    }
    
    function closeProvable() private {
        ProvableInfo pi = ProvableInfo(address(uint160(address(provableInfoAddress))));
        pi.close(address(this));
    }
    
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
}