pragma solidity >=0.5.17 <0.6.0;

import "./ApiInfo.sol";
import "./ProvableInfo.sol";
import "./UniDirectionalPayment.sol";

contract Platform {
    event print(string _message);
    event printUint256(uint256 _message);

    address public platform;
    address oar; // OAR = 0x8654f6264E345946A39fDdcCE1d5e8e563ae005d

    mapping(string => address) public ApiStore; //stores Api name => ApiInfo address // keeps track of registered apis
    uint public apiStoreCount;


    constructor(address _oar) public {
        platform = address(this);
        oar = _oar;
    }

    function searchApiStore(string memory _name) public view returns(address) {
        return ApiStore[_name];
    }

    // receive request from ContributerApi and create ApiInfo
    function createApiInfo(string memory _name, string memory _param1, string memory _param2, uint _cost, address _owner)
    public
    payable
    returns (address)
    {
        // if (keccak256(abi.encodePacked((ApiStore[_name].name))) == keccak256(abi.encodePacked(("")))) {
        ApiInfo api = (new ApiInfo)(_name, _param1, _param2, _cost, oar, _owner);
        // api.setProvableAddress(address(new ProvableInfo()));
        ApiStore[_name] = address(api);
        apiStoreCount++;
        emit print("API added");
        return address(api);
        // } else {
        //     emit print("Name not available : API NOT added");

        // }

    }

    // receive request from UserApiInfo and create ProvableInfo
    function createProvableInfo(address _user, string memory _name, uint _expiresAt)
    public
    payable
    returns (address)
    {
        address apiInfoAddress = ApiStore[_name];
        // ApiInfo apiInfo = ApiInfo(payable(apiInfoAddress));
        ApiInfo apiInfo = ApiInfo(address(uint160(address(apiInfoAddress))));
        
        address payable payablePayer = address(uint160(_user));
        address payable payablePayee = address(uint160(apiInfo.owner()));
        address payContractAddress = createNewPaymentChannel(payablePayer, payablePayee, _expiresAt);
        
        address provableInfoAddress = apiInfo.createNewProvableInfo(_user, payContractAddress);
        return provableInfoAddress;
                            
    }
    
    function createNewPaymentChannel(address payable _payer, address payable _payee, uint _expiresAt) public payable returns(address){
        emit print("createNewPaymentChannel");
        UniDirectionalPayment pay = (new UniDirectionalPayment)(_payer, _payee, _expiresAt);
        emit printUint256(address(pay).balance);
        return address(pay);
    }



}
