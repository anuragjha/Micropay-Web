import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  // structure drizzle and drizzleState from props
  return (
    <div className="App">
      <div>
        <img src={logo} alt="drizzle-logo" />
        <h1>Micro Pay</h1>
        <p>
          Marketplace for APIs
        </p>
      </div>

      <div className="section">
        <h2>Active Account</h2>
        <AccountData
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={0}
          units="ether"
          precision={3}
        />
      </div>

      <div className="section">
        <h2>Storage</h2>
        <p>
          <strong>getStringData(): </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="Storage"
            method="getStringData"
          />
        </p>
        <p>
            <strong>setStringData(): </strong>
            <ContractForm
              drizzle={drizzle}
              contract="Storage"
              method="setStringData"
              methodArgs="world"
            />
        </p>
      </div>

    <div className="section">
      <h2>Transfer Ether</h2>
      <p>
        <strong>getBalance(): </strong>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="TransferEther"
          method="getBalance"
        />
      </p>
        <p>
          <strong>getSender(): </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="TransferEther"
            method="getSender"
          />
        </p>
      <p>
          <strong>sendEther(): </strong>
          <ContractForm
            drizzle={drizzle}
            contract="TransferEther"
            method="sendEther"
          />
      </p>
    </div>


        <div className="section">
          <h2>ProvableInfo</h2>
          <p>
            <strong>getBalance(): </strong>
            <ContractData
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="ProvableInfo"
              method="get"
              methodArgs={["0x45F4Cc5C539d29c9fcC9415F5437156d27f7fcad"]}
            />{" "}
          </p>
          <p>
            <strong>getBalance(): </strong>
                <button onClick={sayHello}>
                  Click me!
                </button>
          </p>
          <Button variant="primary" onClick={sayHello}>Primary</Button>{' '}
        </div>

      {/*<div className="section">
        <h2>SimpleStorage</h2>
        <p>
          This shows a simple ContractData component with no arguments, along
          with a form to set its value.
        </p>
        <p>
          <strong>Stored Value: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SimpleStorage"
            method="storedData"
          />
        </p>
        <ContractForm drizzle={drizzle} contract="SimpleStorage" method="set" />
      </div>*/}

      {/* <div className="section">
        <h2>TutorialToken</h2>
        <p>
          Here we have a form with custom, friendly labels. Also note the token
          symbol will not display a loading indicator. We've suppressed it with
          the <code>hideIndicator</code> prop because we know this variable is
          constant.
        </p>
        <p>
          <strong>Total Supply: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="TutorialToken"
            method="totalSupply"
            methodArgs={[{ from: drizzleState.accounts[0] }]}
          />{" "}
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="TutorialToken"
            method="symbol"
            hideIndicator
          />
        </p>
        <p>
          <strong>My Balance: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="TutorialToken"
            method="balanceOf"
            methodArgs={[drizzleState.accounts[0]]}
          />
        </p>
        <h3>Send Tokens</h3>
        <ContractForm
          drizzle={drizzle}
          contract="TutorialToken"
          method="transfer"
          labels={["To Address", "Amount to Send"]}
        />
      </div> */}

      {/*<div className="section">
        <h2>ComplexStorage</h2>
        <p>
          Finally this contract shows data types with additional considerations.
          Note in the code the strings below are converted from bytes to UTF-8
          strings and the device data struct is iterated as a list.
        </p>
        <p>
          <strong>String 1: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ComplexStorage"
            method="string1"
            toUtf8
          />
        </p>
        <p>
          <strong>String 2: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ComplexStorage"
            method="string2"
            toUtf8
          />
        </p>
        <strong>Single Device Data: </strong>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="ComplexStorage"
          method="singleDD"
        />
      </div>*/}

      {/*<div className="section">
        <h2>Sending Ether</h2>
        <p>
          This shows a simple ContractData component with no arguments, along
          with a form to set its value.
        </p>
        <p>
          <strong>Stored Value: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SimpleStorage"
            method="storedData"
          />
        </p>
        <ContractForm drizzle={drizzle} contract="SendEther" method="sendViaCall" />
      </div>*/}




    </div>
  );
};
