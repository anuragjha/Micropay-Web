import React, {useState} from "react"

import Button from 'react-bootstrap/Button'

import EthCrypto from 'eth-crypto';

function ContributorVerify() {
    let alice = {};
    alice.address = '0x12b94d2015c0A563150905eeb0828e91cd40eD9E';
    alice.privateKey = '1a4a7328a67ff70b3e74c624d3f19afe5fc2452973bf86c641173cd7fc170efc';
    alice.publicKey = EthCrypto.publicKeyByPrivateKey(alice.privateKey)
    let payload;
    let decryptedPayload;

    const [encryptedCheck, setEncryptedCheck] = useInput({ type: "string" });
    const [decryptedFrom, setDecryptedFrom] = useState("")
    const [decryptedAddress, setDecryptedAddress] = useState("")
    const [decryptedAmount, setDecryptedAmount] = useState("")

    function useInput({ type /*...*/ }) {
        const [value, setValue] = useState("");
        const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
        return [value, input];
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
        // > 'Got message from 0x19C24B2d99FB91C5...: "My name is Anurag Jha"
        setDecryptedFrom(senderAddress)
        let params = decryptedPayload.message.split("_")
        setDecryptedAddress(params[0])
        setDecryptedAmount(params[1])

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

    return (
        <div className="section">
            <h2>Decrypt Encrypted check</h2>
            <p>
                {setEncryptedCheck} -> {encryptedCheck}
            </p>
            <p>
                <button onClick={() => {recovering(encryptedCheck)}}>Recover</button>
                {/* <Button onClick={() => {answering()}}>answering</Button> */}
            </p>
            <p>
                From: {decryptedFrom}
            </p>
            <p>
                Payment Address: {decryptedAddress}
            </p>
            <p>
                Payment Amount: {decryptedAmount}
            </p>
        </div>
    )
}

export default ContributorVerify