import React,  { useState } from "react"

import Button from 'react-bootstrap/Container';
import firebase from '../firebase'

import Web3 from 'web3';
import EthCrypto from 'eth-crypto';

const web3 = new Web3();

function UserSign() {
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

    const [contractAddressCheck, setContractAddressCheck] = useInput({type: "string"});
    const [amountCheck, setAmountCheck] = useInput({type: "number"});

    function useInput({ type /*...*/ }) {
        const [value, setValue] = useState("");
        const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
        return [value, input];
    }

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

        toFirebase(alice.address, signature, x)
        
        // 
    }

    function toFirebase(toAddress, fromSignature, encryptedMessage) {

        firebase
        .firestore()
        .collection('checks')
        // .doc(toAddress)
        .add({
            toAddress,
            fromSignature,
            encryptedMessage
        })
        // .then(() => {
        //     setToAddress('')
        //     setFromSignature('')
        //     setEncryptedMessage('')
        // })
    }

    return (
        <div className="section">
            <h2>Sign encrypt and send check</h2>
            <p>Payment address:</p>
            <p> {setContractAddressCheck}</p>
            {/* <p> {setContractAddressCheck} -> {contractAddressCheck}</p> */}
            <p>Payment amount: </p>
            <p>{setAmountCheck}</p>
            {/* <p>{setAmountCheck} -> {amountCheck}</p> */}
            <button onClick={() => {signing(contractAddressCheck, amountCheck)}}>sign</button>
        </div>
    )
}

export default UserSign