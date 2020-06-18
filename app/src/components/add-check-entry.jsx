import React, { useState } from 'react'

import firebase from '../firebase'

const AddCheckEntryForm = () => {

    // const [title, setTitle] = useState('')
    // const [time, setTime] = useState('')
    const [toAddress, setToAddress] = useState('')
    const [encryptedMessage, setEncryptedMessage] = useState('')

    function onSubmit(e) {
        e.preventDefault();

        firebase
        .firestore()
        .collection('checks')
        .add({
            toAddress,
            encryptedMessage
        })
        .then(() => {
            setToAddress('')
            setEncryptedMessage('')
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <h4>Add Check Entry</h4>
            <div>
                <label>To Address</label>
                <input type='text' value={toAddress} onChange={e => setToAddress(e.currentTarget.value)}/>
            </div>
            <div>
                <label>Encrypted Message</label>
                <input type='text' value={encryptedMessage} onChange={e => setEncryptedMessage(e.currentTarget.value)} />
            </div>
            <button>Add Check Entry</button>
        </form>
    )
}

export default AddCheckEntryForm