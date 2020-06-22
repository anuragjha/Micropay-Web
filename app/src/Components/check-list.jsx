import React, {useState, useEffect} from 'react'
import { newContextComponents } from "@drizzle/react-components";

import firebase from '../firebase'
import Button from 'react-bootstrap/Button'
import EthCrypto from 'eth-crypto';

const { AccountData, ContractData, ContractForm } = newContextComponents;


let alice = {};
alice.address = '0x12b94d2015c0A563150905eeb0828e91cd40eD9E'
alice.privateKey = '1a4a7328a67ff70b3e74c624d3f19afe5fc2452973bf86c641173cd7fc170efc'
alice.publicKey = EthCrypto.publicKeyByPrivateKey(alice.privateKey)

let decryptedPayload;
let decryptedMessage;

function useChecks() {
    const EthCrypto = require('eth-crypto')
    const [checks, setChecks] = useState([])

    useEffect(() => {
        const unsubscribe = firebase
        .firestore()
        .collection('checks')
        .onSnapshot((snapshot) => {
            const newChecks = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setChecks(newChecks)
        })

        return () => unsubscribe()
    }, [])

    return checks
}

    


    const CheckList = ({drizzle, drizzleState}) => {
        const checks = useChecks()
        const[contractAddress, setContractAddress] = useState('')
        const[amount, setAmount] = useState([])

        

    return (
        <div className="section">
            <h2>Off-chain messages: Check List</h2> 
            <br />
            <div>
                {/* <label> Sort By:</label>{' '}
                <select>
                    <option>Time (fastest first)</option>
                    <option>Time (slowest first)</option>
                </select> */}
            
                <ol>
                    {checks.map((check) =>
                    <li key={check.id}>
                        <div className="time-entry">
                            {/* {check.toAddress} ->  */}
                            <p className="noMargin">From -> <code className="time"> {check.fromAddress}</code></p>
                            <p className="noMargin">Signature  -> <code className="time"> {check.fromSignature}</code></p>
                            <p className="noMargin">Encrypted Message -> <code className="time"> {check.encryptedMessage}</code></p>
                            <p></p>
                            {/* <p>withdraw:
                                <ContractForm
                                    drizzle={drizzle}
                                    contract="ContributorApiInfo"
                                    method="withdraw"
                                />
                            </p> */}
                        </div>
                    </li>
                    )}

                </ol>
            </div>
        </div>
    )

}

export default CheckList