pragma solidity > 0.6.0 < 0.7.0;

import "github.com/provable-things/ethereum-api/provableAPI_0.6.sol";
import "./TransferEther.sol";


contract ProvableInfo is usingProvable, TransferEther {
    event LogConstructorInitiated(string nextStep);
    event LogPriceUpdated(string price);
    event LogNewProvableQuery(string description);

    string name; // api name
    string provable_query_param1; // = "URL";
    string provable_query_param2; // = "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price";
    // provable_query("WolframAlpha", "random number between 0 and 100");
    uint cost; // in wei - 1e17

    uint runCount;
    uint totalOwed;
    string RESULT; // stores the result of the query

    address oar; // OAR = 0xFEB946A333bA34a94dE99e6a91521F7CC689be43
    address owner; // 0x12b94d2015c0A563150905eeb0828e91cd40eD9E
    address user; // 0x45F4Cc5C539d29c9fcC9415F5437156d27f7fcad

    constructor(string memory _name, string memory _param1, string memory _param2, uint _cost, address _OAR, address _owner, address _user) public {
        name = _name;
        provable_query_param1 = _param1;
        provable_query_param2 = _param2;
        cost = _cost;

        runCount = 0;
        totalOwed = 0;
        RESULT = "";

        OAR = OracleAddrResolverI(_OAR);
        oar = _OAR;
        owner = _owner;
        user = _user;

        emit LogConstructorInitiated("Constructor was initiated for ProvableInfo");
    }

    function get() public view
    returns (address Contract, uint Balance, string memory Name, uint Cost, uint RunCount, uint TotalOwed, string memory LastRESULT,
        address OAR, address Owner, address User) {
        return (address(this), address(this).balance, name, cost, runCount, totalOwed, RESULT,
        oar, owner, user);
    }

    function getBalance() override public view returns (uint) {
        return address(this).balance;
    }

    function Result() view public returns (string memory) {
        require(user == address(msg.sender), "Not a user");
        return RESULT;
    }

    function close() public {
        require(user == address(msg.sender), "Not a user");
        selfdestruct(payable(user));
    }

    function __callback(bytes32 myid, string memory result)
    public override{
        //   if (msg.sender != provable_cbAddress()) revert();
        RESULT = result;
        emit LogPriceUpdated(result);
    }

    function runApi() payable public {
        require(user==address(msg.sender), "User Not Authorized");
        if (provable_getPrice("URL") > address(this).balance) {
            emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
            runCount++; // Incrementing run count
            totalOwed += cost;
            provable_query(provable_query_param1, provable_query_param2);
        }
    }

    function run() public {
        require(user==address(msg.sender), "User Not Authorized");
        runApi();
    }
}