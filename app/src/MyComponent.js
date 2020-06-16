import React, { Component, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  // structure drizzle and drizzleState from props

    const [profileIndex, setProfileIndex] = useInput({ type: "int" });
    const [contibutorApiStoreInput, setContibutorApiStoreInput] = useInput({ type: "string" });
    const [userApiStoreInput, setUserApiStoreInput] = useInput({ type: "string" });
    const [apiNameInput, setApiNameInput] = useInput({ type: "string" });

    function sayHello() {
      alert('Hello!');
    }

     function useInput({ type /*...*/ }) {
       const [value, setValue] = useState("");
       const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
       return [value, input];
     }



  return (
    <div className="App">
        <Container>

          {/* Top Row */}
          <Row>
            <Col md="auto">
               <div>
                 <img src={logo} alt="drizzle-logo" />
                 <h1>Micro Pay</h1>
                 <p>
                   Marketplace for APIs
                 </p>
               </div>
            </Col>

            <Col> 
              <div className="section">
                <h2>Platform</h2>
                <p>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="Platform"
                    method="platform"
                  />
                </p>
                
                <h2>ApiStore</h2>
                <p>Count: 
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="Platform"
                    method="apiStoreCount"
                  />
                </p>
                <p>
                  {setApiNameInput} -> {apiNameInput}<br/>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="Platform"
                    method="searchApiStore"
                    methodArgs={[apiNameInput]}
                  />
                </p>
              
                <h2>Create API Info</h2>
                <ContractForm
                  drizzle={drizzle}
                  contract="Platform"
                  method="createApiInfo"
                />
              
              </div>
            </Col>

            <Col md="auto">
              <div className="section">
                <h2>Choose Account</h2>
                {setProfileIndex} -> {profileIndex} <br />
                <h2>Active Account</h2>
                <AccountData
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  accountIndex={profileIndex}
                  units="ether"
                  precision={3}
                />
              </div>
            </Col>
          </Row>

          {/* 1st Row */}
          <Row>
            <Col>
              <div className="section">
                <h2>Registration</h2>
                <p>
                  <strong>Contract Address: </strong>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="ContributorApiInfo"
                    method="contractAddress"
                  />
                </p>
                <p>
                  <strong>Contributor Address: </strong>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="ContributorApiInfo"
                    method="contributor"
                  />
                </p>
                <p>
                <strong>Register API: </strong>
                  <ContractForm
                  drizzle={drizzle}
                  contract="ContributorApiInfo"
                  method="registerApi"
                  />
                </p>
                <p>
                  <strong>ContibutorApiStore: </strong>
                  {setContibutorApiStoreInput} -> {contibutorApiStoreInput} <br />
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="ContributorApiInfo"
                    method="contibutorApiStore"
                    methodArgs={[contibutorApiStoreInput]}
                  />
                </p>
                <p>
                  <strong>API Info: </strong>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="ContributorApiInfo"
                    method="get"
                    methodArgs={[drizzleState.accounts[0], contibutorApiStoreInput]}
                  />
                </p>
              </div>
            </Col>

            <Col>
                <div className="section">
                  <h2>Use API</h2>
                  <p>
                    <strong>Contract Address: </strong>
                    <ContractData
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                      contract="UserApiInfo"
                      method="contractAddress"
                    />
                  </p>
                <p>
                  <strong>User Address: </strong>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="UserApiInfo"
                    method="user"
                  />
                </p>
                <p>
                <strong>Create Provable API: </strong>
                  <ContractForm
                  drizzle={drizzle}
                  contract="UserApiInfo"
                  method="createProvableInfoFor"
                  />
                </p>
                <p>
                  <strong>UserApiStore: </strong>
                  {setUserApiStoreInput} -> {userApiStoreInput} <br />
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="UserApiInfo"
                    method="userApiStore"
                    methodArgs={[userApiStoreInput]}
                  />
                </p>
                <p>
                <strong>Provable Info: </strong>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="UserApiInfo"
                    method="get"
                    methodArgs={[drizzleState.accounts[0], userApiStoreInput]}
                  />
                </p>
                </div>
            </Col>

          </Row>

          {/* 2nd Row */}
          <Row>
            <Col>
              <div className="section">
                <h2>API Info</h2>
              </div>
            </Col>

            <Col>
                <div className="section">
                  <h2>Use API</h2>
                  <p>
                  <strong>Result: </strong>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="UserApiInfo"
                    method="getResult"
                    methodArgs={[drizzleState.accounts[0], userApiStoreInput]}
                  />
                </p>
                <p>
                  <strong>Run: </strong>
                  <ContractForm
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="UserApiInfo"
                    method="run"
                    methodArgs={[userApiStoreInput]}
                  />
                </p>
                </div>
            </Col>

            <Col>
                <div className="section">
                  <h2>Log</h2>
                </div>
            </Col>
          </Row>

          <Row>
            <Col>
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
                    />
                </p>
              </div>
            </Col>

            <Col>
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
            </Col>

            <Col>
                <div className="section">
                  <h2>ProvableInfo</h2>
                  {/* <p>
                    <strong>getBalance(): </strong>
                    <ContractData
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                      contract="ProvableInfo"
                      method="get"
                      methodArgs={["0x45F4Cc5C539d29c9fcC9415F5437156d27f7fcad"]}
                    />{" "}
                  </p> */}
                  <p>
                    <strong>getBalance(): </strong>
                        <button onClick={sayHello}>
                          Click me!
                        </button>
                  </p>
                  <Button variant="primary" onClick={sayHello}>Primary</Button>{' '}
                </div>
            </Col>
          </Row>
        </Container>

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
