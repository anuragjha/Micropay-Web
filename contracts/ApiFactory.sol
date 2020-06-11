pragma solidity > 0.6.0 < 0.7.0;

import "github.com/provable-things/ethereum-api/provableAPI_0.6.sol";


contract ApiFactory {
    event print(string _message);

    mapping(string => ApiInfo) ApiStore;
    uint apiStoreCount;
    
    // to store usage of apis by the  users (user address to ApiInfo address to Usage/)
    // mapping(address => mapping(address => Usage)) UsageStore;

    function create(address _owner, string memory _name, string memory _uri, uint _cost) public {
        // if (ApiStore[_name].owner() ==  address(0x0)) { //todo: find a good way to check for key
            ApiInfo api = new ApiInfo(_owner, _name, _uri, _cost);
            api.setContractAddress(address(api));
            api.setProvableAddress(address(new ProvableInfo()));
            ApiStore[_name] = api;
            apiStoreCount++;
            emit print("API added");
        // } else {
        //     emit print("Name not available : API NOT added");
        // }
    }

    function createAndSendEther(address _owner, string memory _name, string memory _uri, uint _cost)
        public
        payable
    {
        // if (keccak256(abi.encodePacked((ApiStore[_name].name))) == keccak256(abi.encodePacked(("")))) {
            ApiInfo api = (new ApiInfo).value(msg.value)(_owner, _name, _uri, _cost);
            api.setContractAddress(address(api));
            api.setProvableAddress(address(new ProvableInfo()));
            ApiStore[_name] = api;
            apiStoreCount++;
            emit print("API added");
        // } else {
        //     emit print("Name not available : API NOT added");
            
        // }
        
    }
    
    function getApiInfo(string memory _name) public view returns (address, address, address, string memory, uint, uint)
    {
        ApiInfo api = ApiStore[_name];

        return (api.contractAddress(), api.provableAddress(), api.owner(), api.name(), api.cost(), address(api).balance);
    }
    
    function getApiStoreCount() public view returns(uint) {
        return apiStoreCount;
    }
    
    
    function runAddress(address _contractAddress) public pure  returns(string memory) {
        ApiInfo ac = ApiInfo(_contractAddress);
        return ac.run();
        //return ApiArrayStore[_index].run();
    }
    
    function runName(string memory _name) public view returns(string memory) {
        return ApiStore[_name].run();
    }
    
    
    function run(address _user, string memory _name) public view returns(string memory) {
        ApiInfo ai = ApiStore[_name];
        address pa = ai.provableAddress();
        ProvableInfo pi = ProvableInfo(pa);
        return pi.run();
    }
}

contract ApiInfo {
    address public contractAddress;
    address public provableAddress;
    
    address public owner;
    string public name;
    string uri;
    uint public cost;

    constructor(address _owner, string memory _name, string memory _uri, uint _cost) public payable {
        owner = _owner;
        name = _name;
        uri = _uri;
        cost = _cost;
    }
    
    function setContractAddress(address _address) public {
        contractAddress = _address;
    }
    
    function setProvableAddress(address _address) public {
        provableAddress = _address;
    }
    
    function run() public pure returns(string memory) {
        return ("running uri ...");
    }
}

contract ProvableInfo is usingProvable {
    event LogPriceUpdated(string _message);
    
    string public ETHUSD;
    
    constructor() public {}
    
    // function __callback(bytes32 myid, string memory result) 
    // public 
    // override {
    //     // if (msg.sender != provable_cbAddress()) revert();
    //     // ETHUSD = result;
    //     // emit LogPriceUpdated(result);
    // }
    
    function run() pure public returns(string memory) {
        return ("running ProvableApi uri ...");
    }
}

// contract Usage {
//     // constructor() public {}
    
//     address userAddr;
//     address apiInfoAddr;
    
//     uint useCount;
//     uint useCost;
    
// }

