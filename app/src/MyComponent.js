import React, { Component, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

  import { connect } from "@connext/client";
  import { Wallet } from "ethers";

  import EthCrypto from 'eth-crypto';
  import Web3 from 'web3';

import CheckList from './components/check-list';
import AddCheckEntryForm from './components/add-check-entry';



/////// firebase
// var database = firebase.database();
// const [words, setWords] = useState([]);
// const [advancedWords, setAdvancedWords] = useState([]);

const web3 = new Web3();

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  // structure drizzle and drizzleState from props

  function useInput({ type /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }

    const [profileIndex, setProfileIndex] = useInput({ type: "int" });
    const [contibutorApiStoreInput, setContibutorApiStoreInput] = useInput({ type: "string" });
    const [userApiStoreInput, setUserApiStoreInput] = useInput({ type: "string" });
    const [apiNameInput, setApiNameInput] = useInput({ type: "string" });

    function sayHello() {
      alert('Hello!');
    }

     //////////
     const [ok, setOk] = useState();
     ///sign///
     const [contractAddressCheck, setContractAddressCheck] = useInput({type: "string"});
     const [amountCheck, setAmountCheck] = useInput({type: "number"});
     const [encryptedCheck, setEncryptedCheck] = useInput({ type: "string" });
     const [apiName, setApiName] = useState('')

    //  const [encryptedCheck, setEncryptedCheck] = useInput({ type: "string" });

     const EthCrypto = require('eth-crypto');
     let x;
     let alice = {};
     alice.address = '0x12b94d2015c0A563150905eeb0828e91cd40eD9E';
     alice.privateKey = '1a4a7328a67ff70b3e74c624d3f19afe5fc2452973bf86c641173cd7fc170efc';
     alice.publicKey = EthCrypto.publicKeyByPrivateKey(alice.privateKey)
     let bob = {};
     bob.address = '0x45F4Cc5C539d29c9fcC9415F5437156d27f7fcad';
     bob.privateKey = 'c4ad902841375e7711b56e8fb47eaa3df82ddda08f51c84e2b26a479e0a10250';
     bob.publicKey = EthCrypto.publicKeyByPrivateKey(bob.privateKey)
     
     let payload;
     let decryptedPayload;


     function constructPaymentMessage(contractAddress, amount) {
      return contractAddress+"_"+amount;
    }

     async function signing(address, amount) {

        const secretMessage = constructPaymentMessage(
          address, amount
          // '0xd82847B95dccA0e6fC2f1684D166A03907C8dA3C', 1600000000000000000
          // 'My name is Satoshi Buterin',1
        )//

        const signature = EthCrypto.sign(
          bob.privateKey,
          EthCrypto.hash.keccak256(secretMessage)
        );
        console.log("signature", signature);
          ////
        let y= web3.utils.hexToBytes(signature);
        // setOk(y);
        
          console.log(y);
          ////
        payload = {
            message: secretMessage,
            signature
        };
        const encrypted = await EthCrypto.encryptWithPublicKey(
            alice.publicKey, // by encryping with bobs publicKey, only bob can decrypt the payload with his privateKey
            JSON.stringify(payload) // we have to stringify the payload before we can encrypt it
        );
        /*  { iv: 'c66fbc24cc7ef520a7...',
          ephemPublicKey: '048e34ce5cca0b69d4e1f5...',
          ciphertext: '27b91fe986e3ab030...',
          mac: 'dd7b78c16e462c42876745c7...'
            }
        */
       console.log("encrpyted payload:")
        console.log(encrypted)
        
        // we convert the object into a smaller string-representation
        const encryptedString = EthCrypto.cipher.stringify(encrypted);
        // > '812ee676cf06ba72316862fd3dabe7e403c7395bda62243b7b0eea5eb..'
        x = encryptedString;
        console.log("converted encrpyted payload:")
        console.log(x)
        
        // 
      }

      async function recovering(encryptedString) {
                // we parse the string into the object again
        const encryptedObject = EthCrypto.cipher.parse(encryptedString);

        const decrypted = await EthCrypto.decryptWithPrivateKey(
            alice.privateKey,
            encryptedObject
        );
        console.log("decrypted:")
        console.log(decrypted)

        decryptedPayload = JSON.parse(decrypted);
        console.log("decryptedPayload:")
        console.log(decryptedPayload)

        // check signature
        const senderAddress = EthCrypto.recover(
            decryptedPayload.signature,
            EthCrypto.hash.keccak256(decryptedPayload.message)
        );

        console.log(
            'Got message from ' +
            senderAddress +
            ': ' +
            decryptedPayload.message
        );
        // > 'Got message from 0x19C24B2d99FB91C5...: "My name is Satoshi Buterin" Buterin'
      }

      async function answering() {
        const answerMessage = 'And I am Bob Kelso';
        const answerSignature = EthCrypto.sign(
            alice.privateKey,
            EthCrypto.hash.keccak256(answerMessage)
        );
        const answerPayload = {
            message: answerMessage,
            signature: answerSignature
        };

        const bobPublicKey = EthCrypto.recoverPublicKey(
            decryptedPayload.signature,
            EthCrypto.hash.keccak256(payload.message)
        );

        const encryptedAnswer = await EthCrypto.encryptWithPublicKey(
            bobPublicKey,
            JSON.stringify(answerPayload)
        );
        // now we send the encryptedAnswer to alice over the internet.. *bieb, bieb, blob*
      }
      ///////
      ///////
    // function addContract() {
    //     var contractConfig = {
    //         contractName: "0x69fb2E7BFE4662b4F9791f24d5f782c3385ce0F6",
    //         web3Contract: new web3.eth.Contract(/* ... */)
    //       }
    //       events = ['print', 'printUint256']
          
    //       // Using an action
    //     //   dispatch({type: 'ADD_CONTRACT', contractConfig, events})
          
    //       // Or using the Drizzle context object
    //       this.context.drizzle.addContract(contractConfig, events)
    // }
    
      // (async () => {
      
      //   const channel = await connect({
      //     ethProviderUrl: "http://127.0.0.1:8545",
      //     signer: Wallet.createRandom().privateKey,
      //     nodeUrl: "http://localhost:8080",
      //   });
      
      //   console.log(`Successfully connected channel with public id: ${channel.publicIdentifier}`);
      
      // })()

      ///////
      ///////

  return (
    <div className="App">
        <Container>

          {/* Top Row */}
          <Row>
            <Col md ="auto">
              <div className="logo">
                 {/* <img src={logo} alt="drizzle-logo" /> */}
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

            <Col>
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
                <CheckList drizzle={drizzle} drizzleState={drizzleState}/>

                <div>
                  <h2>Decrypt Encrypted check</h2>
                  {setEncryptedCheck} -> {encryptedCheck}
                  <Button onClick={() => {recovering(encryptedCheck)}}>recovering</Button>
                  <Button onClick={() => {answering()}}>answering</Button>
                </div>
                
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
                  {/* <strong>Runn</strong>
                  <form onSubmit={runApi}>
                    <div>
                        <label>Api Name</label>
                        <input type='text' value={apiName} onChange={e => setApiName(e.currentTarget.value)}/>
                    </div>
                    <button>Run Api</button>
                </form> */}
                </p>

                <div>
                  <h2>Sign Check</h2>
                  <p>payment address {setContractAddressCheck} -> {contractAddressCheck}</p>
                  <p>amount {setAmountCheck} -> {amountCheck}</p>
                  <Button onClick={() => {signing(contractAddressCheck, amountCheck)}}>sign</Button>
                </div>

                  <AddCheckEntryForm />
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
