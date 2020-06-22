pragma solidity >=0.5.16 <0.6.0;

import "./ProvableInfo.sol";
import "./TransferEther.sol";

// one for each registered API
contract ApiInfo is TransferEther {
    event LogConstructorInitiated(string nextStep);
    event LogProvableInfoCreated(address provableInfoAddress);
    
    string name; // api name
    string provable_query_param1; // = "URL";
    string provable_query_param2; // = "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price";
                                  // provable_query("WolframAlpha", "random number between 0 and 100");
    uint cost; // in wei - 1e17
    
    address oar; // OAR = 0xFEB946A333bA34a94dE99e6a91521F7CC689be43
    address public owner; // 0x12b94d2015c0A563150905eeb0828e91cd40eD9E // 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c
    
    mapping (address => address) userMap;  // "user address" to "provable info address"
    
    
    constructor(string memory _name, string memory _param1, string memory _param2, uint _cost, address _OAR, address _owner) 
    public {
      name = _name;
      provable_query_param1 = _param1;
      provable_query_param2 = _param2;
      cost = _cost;
      
      oar = _OAR;
      owner = _owner;

      emit LogConstructorInitiated("Constructor was initiated for ApiInfo.");
    }
    
    function get(address _owner) 
    public 
    view 
    returns(address Contract, uint Balance, string memory Name, string memory Param1, string memory Param2, 
    uint Cost, address Owner, address OAR) {
        require(owner==_owner, "Owner Not Authorized");
        return (address(this), address(this).balance, name, provable_query_param1, provable_query_param2, cost, owner, oar);
    }
    
    function addToUserMap(address _user, address _provableApi) private {
        userMap[_user] = _provableApi;
    }
    
    function createNewProvableInfo(address _userApiInfo, address _user, address _payContractAddress) public returns (address){
        // string memory _name, string memory _param1, string memory _param2, uint _cost, address _OAR, address _owner, address _user
        ProvableInfo provableApi = (new ProvableInfo)(name, provable_query_param1, provable_query_param2, cost, oar, owner, _userApiInfo, _user, _payContractAddress);
        
        addToUserMap(_user, address(provableApi));
         
        emit LogProvableInfoCreated(address(provableApi));
        return address(provableApi);
    }
    
    
}


