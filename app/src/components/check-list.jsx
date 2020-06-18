import React, {useState, useEffect} from 'react'

import firebase from '../firebase'
import Button from 'react-bootstrap/Button'

function useChecks() {
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


const CheckList = () => {
    const checks = useChecks()

    return (
        <div>
            <h2>Check List</h2>
            <div>
                <label> Sort By:</label>{' '}
                <select>
                    <option>Time (fastest first)</option>
                    <option>Time (slowest first)</option>
                </select>
            </div>
            <ol>
                {checks.map((check) =>
                <li key={check.id}>
                    <div className="time-entry">
                        {check.toAddress} -> 
                        <code className="time"> {check.encryptedMessage}</code>
                        <Button>Withdraw</Button>
                    </div>
                </li>
                )}

            </ol>
        </div>
    )

}

export default CheckList