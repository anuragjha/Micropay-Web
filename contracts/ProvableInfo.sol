pragma solidity >=0.5.16 <0.6.0;

// import "github.com/provable-things/ethereum-api/provableAPI_0.5.sol";
import "./TransferEther.sol";
import "./UniDirectionalPayment.sol";
import "./UserApiInfo.sol";


// contract ProvableInfo is usingProvable, TransferEther {
 contract ProvableInfo is TransferEther {   
    event LogConstructorInitiated(string nextStep);
    event LogPriceUpdated(string price);
    event LogNewProvableQuery(string description);
    event printNumber(uint);

    string name; // api name
    string provable_query_param1; // = "URL";
    string provable_query_param2; // = "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price";
    // provable_query("WolframAlpha", "random number between 0 and 100");
    uint cost; // in wei - 1e17

    uint runCount;
    uint totalOwed;
    string RESULT; // stores the result of the query

    address oar; // OAR = 0x64F4bdf6A4Fc5B58078cb5860B2539E65FE5f169
    address owner; // 0x12b94d2015c0A563150905eeb0828e91cd40eD9E // 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c
    
    address userApiInfo;
    address user;  // 0x45F4Cc5C539d29c9fcC9415F5437156d27f7fcad // 0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C
    
    address payment;

    constructor(string memory _name, string memory _param1, string memory _param2, uint _cost, address _OAR, address _owner, address _userApiInfo, address _user, address _payment)
    public {
        name = _name;
        provable_query_param1 = _param1;
        provable_query_param2 = _param2;
        cost = _cost;

        runCount = 0;
        totalOwed = 0;
        RESULT = "";

        // OAR = OracleAddrResolverI(_OAR);
        oar = _OAR;
        owner = _owner;
        
        userApiInfo = _userApiInfo;
        user = _user;
        
        payment = _payment;

        emit LogConstructorInitiated("Constructor was initiated for ProvableInfo. Keep enough balance to run(<your address>)");
    }

    // modifier onlyBy(address _user)
    // {
    //     require(
    //         user == _user,
    //         "Sender not authorized."
    //     );
    //     _;
    // }

    function get(address _user) public view
    returns (address Contract, address Payment, string memory Name, string memory LastResult, uint TotalOwed,  uint Cost, uint RunCount, address Owner, address User) {
        require(user==_user, "User Not Authorized");
        return (address(this), payment, name, RESULT, totalOwed, cost, runCount, owner, user );
    }
    
    function getTotalOwed() public view  returns (uint) {
        // require(user==_user, "User Not Authorized");
        return totalOwed;
    }

    function getContractBalance(address _user) public view  returns (uint) {
        require(user==_user, "User Not Authorized");
        return address(this).balance;
    }
    
    function getPaymentAddress(address _user) public view  returns (address) {
        require(user==_user, "User Not Authorized");
        return payment;
    }

    function getResult(address _user) view public  returns (string memory) {
        require(user==_user, "User Not Authorized");
        return RESULT;
    }

    function close(address _payment) public  {
        require(payment==_payment, "Payment Not Authorized");
        address payable addr = address(uint160(address(user)));
        
        UserApiInfo uai = UserApiInfo(address(uint160(address(userApiInfo))));
        uai.deleteFromUserApiStore(name);
        
        selfdestruct(addr);
    }

    // function __callback(bytes32 myid, string memory result)
    // public
    // // override
    // {
    //     //   if (msg.sender != provable_cbAddress()) revert();
    //     RESULT = result;
    //     emit LogPriceUpdated(result);
    // }

    // function runApi(address _user) payable public {
    //     require(user==_user, "User Not Authorized to run Api");
    //     if (provable_getPrice("URL") > address(this).balance) {
    //         emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
    //     } else {
    //         emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
    //         runCount++; // Incrementing run count
    //         totalOwed += cost;
    //         provable_query(provable_query_param1, provable_query_param2);
    //     }
    // }
    function runApi(address _user) payable public {
        require(user==_user, "User Not Authorized to run Api");
        
        emit printNumber(address(payment).balance - totalOwed);
        require((address(payment).balance - totalOwed) > 100000, "Balance NOT enough");
        
        // if (provable_getPrice("URL") > address(this).balance) {
            // emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
        // } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
            runCount++; // Incrementing run count
            totalOwed += cost;
            // provable_query(provable_query_param1, provable_query_param2);
            RESULT = uint2str(now);
        // }
    }

    function run(address _user) public {
        require(user==_user, "User Not Authorized");
        runApi(_user);
    }
        
    // from : https://ethereum.stackexchange.com/questions/6591/conversion-of-uint-to-string    
    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (_i != 0) {
            bstr[k--] = byte(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
    
    
    
    
}