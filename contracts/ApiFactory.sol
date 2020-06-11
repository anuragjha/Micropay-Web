pragma solidity ^0.6.0;

contract ApiFactory {
    event print(string _message);
    
    
    // ApiInfo[] public ApiArrayStore;
    mapping(string => ApiInfo) ApiStore;
    uint apiStoreCount;

    function create(address _owner, string memory _name, string memory _uri, uint _cost) public {
        if (keccak256(abi.encodePacked((ApiStore[_name].name))) == keccak256(abi.encodePacked(("")))) {
            ApiInfo api = new ApiInfo(_owner, _name, _uri, _cost);
            api.setContractAddress(address(api));
            api.setProvableAddress(address(new ProvableInfo()));
            // ApiArrayStore.push(api);
            ApiStore[_name] = api;
            emit print("API added");
        } else {
            emit print("API NOT added");
        }
    }

    function createAndSendEther(address _owner, string memory _name, string memory _uri, uint _cost)
        public
        payable
    {
        if (keccak256(abi.encodePacked((ApiStore[_name].name))) == keccak256(abi.encodePacked(("")))) {
            ApiInfo api = (new ApiInfo).value(msg.value)(_owner, _name, _uri, _cost);
            api.setContractAddress(address(api));
            api.setProvableAddress(address(new ProvableInfo()));
            // ApiArrayStore.push(api);
            ApiStore[_name] = api;
            emit print("API added");
        } else {
            emit print("API NOT added");
            
        }
        
    }

    // function getApiArrStoreInfo(uint _index)
    //     public
    //     view
    //     returns (address contractAddress, address owner, string memory _name, uint balance)
    // {
    //     ApiInfo api = ApiArrayStore[_index];

    //     return (api.contractAddress(), api.owner(), api.name(), address(api).balance);
    // }
    
        function getApiInfo(string memory _name)
        public
        view
        returns (address, address, string memory, uint)
    {
        ApiInfo api = ApiStore[_name];

        return (api.contractAddress(), api.owner(), api.name(), address(api).balance);
    }
    
    // function runIndex(uint _index) public view  returns(string memory) {
    // //   ApiInfo ac = ApiInfo(ApiInfoAddress);
    // //     return ac.run();
    //     return ApiArrayStore[_index].run();
    // }
    
    // function runAddress(address _contractAddress) public pure  returns(string memory) {
    //     ApiInfo ac = ApiInfo(_contractAddress);
    //     return ac.run();
    //     //return ApiArrayStore[_index].run();
    // }
    
    // function run(string memory _name) public view returns(string memory) {
    //     return ApiStore[_name].run();
    // }
    
    function run(string memory _name) public view returns(string memory) {
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
    
    function run() pure public returns(string memory) {
        return ("running uri ...");
    }
}

contract ProvableInfo {
    
    constructor() public {}
    
    function run() pure public returns(string memory) {
        return ("running ProvableApi uri ...");
    }
}

