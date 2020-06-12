//pragma solidity > 0.6.0 < 0.7.0;
//
//import "github.com/provable-things/ethereum-api/provableAPI_0.6.sol";
//
//
//contract ApiInfo is usingProvable {
//
//  string public ETHUSD;
//  event LogConstructorInitiated(string nextStep);
//  event LogPriceUpdated(string price);
//  event LogNewProvableQuery(string description);
//
//  constructor() public {
//      emit LogConstructorInitiated("Constructor was initiated. Call 'updatePrice()' to send the Provable Query.");
//  }
//
//  function __callback(bytes32 myid, string memory result)
//  public override{
//      if (msg.sender != provable_cbAddress()) revert();
//      ETHUSD = result;
//      emit LogPriceUpdated(result);
//  }
//
//  function updatePrice() payable public returns (string memory){
//      if (provable_getPrice("URL") > address(this).balance) {
//          emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
//      } else {
//          emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
//        //   provable_query("URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price");
//        // provable_query("WolframAlpha", "random number between 0 and 100");
//        provable_query("URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price");
//      }
//  }
//}