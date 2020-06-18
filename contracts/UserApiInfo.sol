pragma solidity >=0.5.17 <0.6.0;

import "./TransferEther.sol";
import "./ProvableInfo.sol";
import "./Platform.sol";
import "./UniDirectionalPayment.sol";

contract UserApiInfo is TransferEther {
    event LogConstructorInitiated(string nextStep); //todo: add events
    // event LogPriceUpdated(string price);
    // event LogNewProvableQuery(string description);

    address public contractAddress;
    address public user;
    mapping(string => address) public userApiStore; // map of "Api name" to "ProvableInfo address"

    constructor(address _user) public {
        contractAddress = address(this);
        user = _user;
        emit LogConstructorInitiated("Constructor was initiated for UserApiInfo. ");
    }

    modifier onlyUser()
    {
        require(
            msg.sender == user,
            "User not authorized."
        );
        _;
    }

    function searchUserApiStore(address _user, string memory _name) public view returns (address) {
        require(user==_user, "User Not Authorized");
        return  userApiStore[_name];
    }

    function getBalance() public view onlyUser() returns (uint) {
        // require(user != address(msg.sender), "User NOT authorized");
        return address(this).balance;
    }

    function createProvableInfoFor(address _platform, address _user, string memory _name, uint _expiresAt) public payable returns (address) {
        require(user==_user, "User Not Authorized");
        Platform p = Platform(_platform);
        address _provableInfoAddress = p.createProvableInfo(user, _name, _expiresAt);
        
        ProvableInfo pi = ProvableInfo(address(uint160(address(_provableInfoAddress))));
        address payable pay = address(uint160(address(pi.getPaymentAddress(_user))));
        // // UniDirectionalPayment udp = UniDirectionalPayment(pay);
        (bool success,) = pay.call.value(msg.value)("");
        require(success, "Failed to send Ether");

        userApiStore[_name] = _provableInfoAddress;

        return _provableInfoAddress;
    }

    function get(address _user, string memory _name) public view
    returns (address Contract, uint Balance, string memory Name, uint Cost, uint RunCount, uint TotalOwed, string memory LastRESULT,
        address OAR, address Owner, address User, address Payment) {
        require(user==_user, "User Not Authorized");
        if (userApiStore[_name] != address(0)) {
            ProvableInfo pi = ProvableInfo(address(uint160(address(userApiStore[_name]))));
            return pi.get(user);


        }
    }

    function getContractBalance(address _user, string memory _name) public view  returns (uint) {
        require(user==_user, "User Not Authorized");
        if (userApiStore[_name] != address(0)) {
            ProvableInfo pi = ProvableInfo(address(uint160(address(userApiStore[_name]))));
            return pi.getContractBalance(user);
        }
    }
    
    function getPaymentBalance(address _user, string memory _name) public view  returns (uint) {
        require(user==_user, "User Not Authorized");
        if (userApiStore[_name] != address(0)) {
            ProvableInfo pi = ProvableInfo(address(uint160(address(userApiStore[_name]))));
            UniDirectionalPayment pay = UniDirectionalPayment(address(uint160(address(pi.getPaymentAddress(_user)))));
            return pay.getContractBalance();
        }
    }
    
    // function addPaymentBalance(address _user, string memory _name) public view  returns (uint) {
    //     require(user==_user, "User Not Authorized");
    //     if (userApiStore[_name] != address(0)) {
    //         ProvableInfo pi = ProvableInfo(address(uint160(address(userApiStore[_name]))));
    //         UniDirectionalPayment pay = UniDirectionalPayment(address(uint160(address(pi.getPaymentAddress(_user)))));
    //         return pay.getContractBalance();
    //     }
    // }

    function getResult(address _user, string memory _name) view public  returns (string memory) {
        require(user==_user, "User Not Authorized");
        if (userApiStore[_name] != address(0)) {
            ProvableInfo pi = ProvableInfo(address(uint160(address(userApiStore[_name]))));
            return pi.getResult(user);
        }
        return "";
    }

    function close(address _user, string memory _name) public  { // close provableInfo for (user, name)
        require(user==_user, "User Not Authorized");
        if (userApiStore[_name] != address(0)) {
            // ProvableInfo pi = ProvableInfo(address(uint160(address(userApiStore[_name]))));
            ProvableInfo pi = ProvableInfo(address(uint160(address(userApiStore[_name]))));
            address payable pay = address(uint160(address(pi.getPaymentAddress(_user))));
            UniDirectionalPayment udp = UniDirectionalPayment(pay);
            udp.kill(user);
            
            delete userApiStore[_name];
        }
    }

    function run( string memory _name) public onlyUser() {
        // require(user != address(msg.sender), "User NOT authorized");
        if (userApiStore[_name] != address(0)) {
            ProvableInfo pi = ProvableInfo(address(uint160(address(userApiStore[_name]))));
            pi.run(address(uint160(user)));
        }
    }

}


