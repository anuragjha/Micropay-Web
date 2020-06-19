pragma solidity >=0.5.17 <0.6.0;

import "./TransferEther.sol";
// import "./ApiInfo.sol";
import "./Platform.sol";
import "./UniDirectionalPayment.sol";

contract ContributorApiInfo is TransferEther {
    event LogConstructorInitiated(string nextStep); //todo: add events
    event print(string);

    address public contractAddress;
    address public contributor;
    mapping(string => address) public contibutorApiStore; // map of "Api name" to "ApiInfo address"

    constructor(address _contributor) public {
        contractAddress = address(this);
        contributor = _contributor;
        emit LogConstructorInitiated("Constructor was initiated for ContributorApiInfo. ");
    }

    modifier onlyUser()
    {
        require(
            msg.sender == contributor,
            "Contributor not authorized."
        );
        _;
    }

    // returns ApiInfo contract
    function getApiInfo(string memory _name) private view returns(ApiInfo){
        return ApiInfo(address(uint160(address(contibutorApiStore[_name]))));

    }

    function getBalance() public view onlyUser() returns (uint) {
        // require(user != address(msg.sender), "User NOT authorized");
        return address(this).balance;
    }

    function get(address _contributor, string memory _name)
    public
    view
    returns(address Contract, uint Balance, string memory Name, string memory Param1, string memory Param2,
        uint Cost, address Owner, address OAR) {
        require(contributor==_contributor, "User Not Authorized");
        if (contibutorApiStore[_name] != address(0)) {
            ApiInfo ai = ApiInfo(address(uint160(address(contibutorApiStore[_name]))));
            return ai.get(_contributor);
        }
    }

    function close(address _payment, uint _payeeBalance, bytes memory _signature) public payable onlyUser() {
        // require(contributor == address(msg.sender), "Not a user");
        UniDirectionalPayment udp = UniDirectionalPayment(address(uint160(address(_payment))));
        udp.close(contributor, _payeeBalance, _signature);
    }
    
    function withdraw(address _payment, uint _payeeBalance, bytes memory _signature) public payable onlyUser() {
        // require(contributor == address(msg.sender), "Not a user");
        UniDirectionalPayment udp = UniDirectionalPayment(address(uint160(address(_payment))));
        udp.withdraw(contributor, _payeeBalance, _signature);
    }

    // function addToContributorApiStore(string memory _name, address _apiInfoAddress) private onlyUser() {
    //     contibutorApiStore[_name] = _apiInfoAddress;
    // }

    // register API with the Platform
    function registerApi(address _platform, string memory _name, string memory _param1, string memory _param2, uint _cost)
    public returns(address) {
        Platform p = Platform(_platform);
        address _address = p.createApiInfo(_name, _param1, _param2, _cost, contributor);
        contibutorApiStore[_name] = _address;
        return address(_address);
    }


}


