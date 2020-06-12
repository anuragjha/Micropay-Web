pragma solidity > 0.6.0 < 0.7.0;

import "github.com/provable-things/ethereum-api/provableAPI_0.6.sol";


contract ApiFactory {
    event print(string _message);

    mapping(string => ApiInfo) ApiStore;
    uint apiStoreCount;

    // function create(address _owner, string memory _name, string memory _uri, uint _cost) public {
    //     // if (ApiStore[_name].owner() ==  address(0x0)) { //todo: find a good way to check for key
    //         ApiInfo api = new ApiInfo(_owner, _name, _uri, _cost);
    //         api.setContractAddress(address(api));
    //         api.setProvableAddress(address(new ProvableInfo()));
    //         ApiStore[_name] = api;
    //         apiStoreCount++;
    //         emit print("API added");
    //     // } else {
    //     //     emit print("Name not available : API NOT added");
    //     // }
    // }

    function createAndSendEther(address _owner, string memory _name, string memory _uri, uint _cost)
        public
        payable
    {
        // if (keccak256(abi.encodePacked((ApiStore[_name].name))) == keccak256(abi.encodePacked(("")))) {
            ApiInfo api = (new ApiInfo).value(msg.value)(_owner, _name, _uri, _cost);
            api.setContractAddress(address(api));
            // api.setProvableAddress(address(new ProvableInfo()));
            ApiStore[_name] = api;
            apiStoreCount++;
            emit print("API added");
        // } else {
        //     emit print("Name not available : API NOT added");
            
        // }
        
    }
    
    function getApiInfo(address _user, string memory _name) public view returns (address contractAddress, address provableAddress, address owner, 
    string memory name, uint cost, uint api_balance, uint provable_balance) {
        ApiInfo api = ApiStore[_name];
        // address paddr = api.userStore[_user];
        // return (api.contractAddress(), api.userStore(_user), api.owner(), api.name(), api.cost(), 
        //     address(api.contractAddress()).balance, address(api.userStore(_user)).balance);
        return api.getApiInfo(_user);
    }
    
    function getApiStoreCount() public view returns(uint) {
        return apiStoreCount;
    }
    
    
    // function runAddress(address _contractAddress, address payable _user) public  returns(string memory) {
    //     ApiInfo ac = ApiInfo(_contractAddress);
    //     return ac.run(_user);
    // }
    
    // function runName(string memory _name, address payable _user) public returns(string memory) {
    //     return ApiStore[_name].run(_user);
    // }
    
    function sendEther(address payable _to) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent, bytes memory data) = _to.call.value(msg.value)("");
        require(sent, "Failed to send Ether");
    }
    
    function run(address payable _user, string memory _name) public payable returns(string memory) {
        ApiInfo ai = ApiStore[_name];
        // address payable  pa = ai.provableAddress();
        // ProvableInfo pi = ProvableInfo(pa);
        // return pi.run(_user);
        return ai.run(_user);
    }
}

contract ApiInfo {
    address payable public contractAddress;
    // address payable public provableAddress;
    mapping( address => address payable) public  userStore; // user address => provable address
    
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
    
    receive() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function setContractAddress(address payable _address) public {
        contractAddress = _address;
    }
    
    function setProvableAddress(address payable _user) public {
        if (userStore[_user] == address(0x0)) {
            userStore[_user] = address(new ProvableInfo()); // todo: if user address exist , use existing Provable Info
        }
    }
    
    function getApiInfo(address _user) public view returns (address _contractAddress, address _provableAddress, address _owner, 
    string memory _name, uint _cost, uint _api_balance, uint _provable_balance) {
        address paddr = userStore[_user];
        return (contractAddress, paddr, owner, name, cost, contractAddress.balance, paddr.balance);
    }
    
    function run(address payable _user) public returns(string memory) {
        setProvableAddress(_user);
        ProvableInfo pi = ProvableInfo(userStore[_user]);
        return pi.run(_user);
        // return ("running uri ...");
    }
}

contract ProvableInfo is usingProvable {
    string public ETHUSD;
    event LogConstructorInitiated(string nextStep);
    event LogPriceUpdated(string price);
    event LogNewProvableQuery(string description);
    
    constructor() public {
      OAR = OracleAddrResolverI(0x228fb152F3E674ccC3CFD22eBA0aC029125BD512);
      emit LogConstructorInitiated("Constructor was initiated. Call 'updatePrice()' to send the Provable Query.");
    }
    
    receive() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function __callback(bytes32 myid, string memory result)
    public override{
    //   if (msg.sender != provable_cbAddress()) revert();
      ETHUSD = result;
      emit LogPriceUpdated(result);
    }
    
    function updatePrice(address _user) payable public returns (string memory){
      if (provable_getPrice("URL") > address(this).balance) {
            emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
            //   provable_query("URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price");
            // provable_query("WolframAlpha", "random number between 0 and 100");
            provable_query("URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price");
        }
    }
    
    function run(address _user) public returns (string memory) {
        // return ("running ProvableApi uri ...");
        updatePrice(_user);
        emit LogPriceUpdated(ETHUSD);
        return ETHUSD;
    }
}

// contract Usage {
//     // constructor() public {}
    
//     address userAddr;
//     address apiInfoAddr;
    
//     uint useCount;
//     uint useCost;
    
// }

