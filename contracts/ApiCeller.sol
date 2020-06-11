pragma solidity >=0.6.0 <0.7.0;

contract ApiCeller {
    event addedApiData(string _message, string _name, string _uri, address _owner);
    event notAddedApiData(string _message);

    struct ApiData {
        address owner;
        string name;
        string uri;
        uint cost;
    }

    mapping (string => ApiData) ApiStore;
    uint apiStoreCount;

    constructor() public {
        apiStoreCount = 0;
    }

    function addApiData(address _owner, string memory _name, string memory _uri, uint _cost) public payable returns(string memory) {
        // Add Api data to ApiStore if the key (name) is empty else do not add
        if (keccak256(abi.encodePacked((ApiStore[_name].name))) == keccak256(abi.encodePacked(("")))) {
            ApiStore[_name] = ApiData(_owner, _name, _uri, _cost);
            apiStoreCount++;
            emit addedApiData("API added to store", ApiStore[_name].name, ApiStore[_name].uri, ApiStore[_name].owner);
            return "true";
        } else {
            emit notAddedApiData("API not added to store, key already present");
            return "false";
        }
    }

    function requestApi(address _user, string memory _name) public view returns (string memory){
        // provable api -- ApiInfo
        if (keccak256(abi.encodePacked((ApiStore[_name].name))) == keccak256(abi.encodePacked(("")))) {
            return ("no such service");

        } else {
            return (ApiStore[_name].uri);
        }
    }
    
    function getApiStoreCount() public view returns(uint) {
        return apiStoreCount;
    }
    
    function getApiInfo(string memory _name) public view returns(uint){
        return ApiStore[_name].cost;
    }
}









