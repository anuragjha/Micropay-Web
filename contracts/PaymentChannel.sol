pragma solidity >=0.4.24 <0.7.0;

contract PaymentChannel {
    address owner = msg.sender;

    mapping(uint256 => bool) usedNonces;

    constructor() public payable {}

    function claimPayment(uint256 amount, uint256 nonce, bytes memory signature) public {
        require(!usedNonces[nonce]);
        usedNonces[nonce] = true;

        // this recreates the message that was signed on the client
        bytes32 message = prefixed(keccak256(abi.encodePacked(msg.sender, amount, nonce, this)));

        require(recoverSigner(message, signature) == owner);

        msg.sender.transfer(amount);
    }

    /// destroy the contract and reclaim the leftover funds.
    function kill() public {
        require(msg.sender == owner);
        selfdestruct(msg.sender);
    }

    /// signature methods.
    function splitSignature(bytes memory sig)
    internal
    pure
    returns (uint8 v, bytes32 r, bytes32 s)
    {
        require(sig.length == 65);

        assembly {
        // first 32 bytes, after the length prefix.
            r := mload(add(sig, 32))
        // second 32 bytes.
            s := mload(add(sig, 64))
        // final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function recoverSigner(bytes32 message, bytes memory sig)
    internal
    pure
    returns (address)
    {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    /// builds a prefixed hash to mimic the behavior of eth_sign.
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }
}

//import "@openzeppelin/contracts/math/SafeMath.sol";
//import "@openzeppelin/contracts/cryptography/ECDSA.sol";
//
////import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.0.0/contracts/math/SafeMath.sol";
////import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.0.0/contracts/cryptography/ECDSA.sol";
////import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.0.0/contracts/utils/ReentrancyGuard.sol";
//
//contract PaymentChannel {
//    using SafeMath for uint;
//    using ECDSA for bytes32;
//
//    address payable public payer;
//    address payable public payee;
//    uint public expiresAt;
//
//    /// Open payment channel
//    constructor(address payable _payee, uint _duration)
//    public
//    payable {
//        require(_duration > 0, "Duration must be > 0");
//
//        payer = msg.sender;
//        payee = _payee;
//        expiresAt = now + duration;
//    }
//
//    /// Verifies payer signature
//    function verify(bytes memory _signature, address _payer,
//        address _contract, uint _payeeBalance)
//    public
//    pure
//    returns (bool) {
//        // sign with address of this contract to protect against replay attack
//        // on other contracts
//        return keccak256(abi.encodePacked(_contract, _payeeBalance))
//            .toEthSignedMessageHash()
//            .recover(_signature) == _payer;
//    }
//
//    /// Modifier to check signature
//    modifier checkSignature(bytes memory _signature, uint _payeeBalance) {
//        require(
//            verify(_signature, payer, address(this), _payeeBalance),
//            "Invalid signature"
//        );
//        _;
//    }
//
//    function close(uint _payeeBalance, bytes memory _signature)
//    public
//    nonReentrant
//    checkSignature(_signature, _payeeBalance) {
//        require(msg.sender == payee, "Not Payee");
//
//        (bool sent, ) = payee.call.value(_payeeBalance)("");
//        require(sent, "Failed to send Ether");
//
//        selfdestruct(payer);
//    }
//
//    function kill() public {
//        require(msg.sender == payer, "Not payer");
//        require(block.timestamp >= expiresAt, "Channel not expired");
//        selfdistruct(payer);
//    }
//
//}