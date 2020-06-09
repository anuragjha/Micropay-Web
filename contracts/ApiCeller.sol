pragma solidity >=0.4.21 <0.7.0;

contract ApiCeller {
    event addedApiData(string _message, string _name, string _uri, address _owner);
    event notAddedApiData(string _message);

    struct ApiData {
        string name;
        string uri;
        address owner;
        uint cost;
    }

    mapping (string => ApiData) ApiStore;
    uint apiStoreCount;

    constructor() public {}

    function addApiData(address _owner, string memory _name, string memory _uri) public payable returns(string memory) {
        // Add Api data to ApiStore if the key (name) is empty else do not add
        if (keccak256(abi.encodePacked((ApiStore[_name].name))) == keccak256(abi.encodePacked(("")))) {
            ApiStore[_name] = ApiData(_name, _uri, _owner, 0);
            apiStoreCount++;
            emit addedApiData("API added to store", ApiStore[_name].name, ApiStore[_name].uri, ApiStore[_name].owner);
            return "true";
        } else {
            emit notAddedApiData("API not added to store, key already present");
            return "false";
        }
    }

    function requestApi(address _requester, string memory _name) public returns (string memory){
        // provable api
        if (keccak256(abi.encodePacked((ApiStore[_name].name))) == keccak256(abi.encodePacked(("")))) {
            return ("NOT PRESENT from requestApi function");

        } else {
            return ("PRESENT from requestApi function");
        }
    }
}