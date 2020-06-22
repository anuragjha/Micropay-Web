pragma solidity >=0.5.16 <0.6.0;

contract Storage {
    event StorageSet(string _message);

    uint256 public uintData;
    string public stringData;

    function getUintData() public view returns(uint) {
        return uintData;
    }

    function getStringData() public view returns(string memory) {
        return stringData;
    }

    function setUintData(uint256 x) public {
        uintData = x;

        emit StorageSet("Data stored successfully!");
    }

    function setStringData(string memory x) public {
        stringData = x;

        emit StorageSet("Data stored successfully!");
    }
}
