pragma solidity ^0.6.0;

contract ApiInfo {
    address public contractAddress;
    
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
    
    function run() pure public returns(string memory) {
        return ("running uri ...");
    }
}

contract ApiFactory {
    ApiInfo[] public ApiArrayStore;
    mapping(string => ApiInfo) ApiStore;

    function create(address _owner, string memory _name, string memory _uri, uint _cost) public {
        ApiInfo api = new ApiInfo(_owner, _name, _uri, _cost);
        api.setContractAddress(address(api));
        ApiArrayStore.push(api);
        ApiStore[_name] = api;
    }

    function createAndSendEther(address _owner, string memory _name, string memory _uri, uint _cost)
        public
        payable
    {
        ApiInfo api = (new ApiInfo).value(msg.value)(_owner, _name, _uri, _cost);
        api.setContractAddress(address(api));
        ApiArrayStore.push(api);
        ApiStore[_name] = api;
    }

    function getApiArrStoreInfo(uint _index)
        public
        view
        returns (address contractAddress, address owner, string memory _name, uint balance)
    {
        ApiInfo api = ApiArrayStore[_index];

        return (api.contractAddress(), api.owner(), api.name(), address(api).balance);
    }
    
        function getApiStoreInfo(string memory _name)
        public
        view
        returns (address, address, string memory, uint)
    {
        ApiInfo api = ApiStore[_name];

        return (api.contractAddress(), api.owner(), api.name(), address(api).balance);
    }
    
    function runIndex(uint _index) public view  returns(string memory) {
    //   ApiInfo ac = ApiInfo(ApiInfoAddress);
    //     return ac.run();
        return ApiArrayStore[_index].run();
    }
    
    function runAddress(address _contractAddress) public pure  returns(string memory) {
        ApiInfo ac = ApiInfo(_contractAddress);
        return ac.run();
        //return ApiArrayStore[_index].run();
    }
    
    function run(string memory _name) public view returns(string memory) {
        return ApiStore[_name].run();
    }
}