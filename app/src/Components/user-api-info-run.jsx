import React,  { useState } from "react"

import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

function UserApiInfoRun({ drizzle, drizzleState }) {

    const [userApiStoreInput, setUserApiStoreInput] = useInput({ type: "string" });

    function useInput({ type /*...*/ }) {
        const [value, setValue] = useState("");
        const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
        return [value, input];
    }

    return (
        
        <div className="section">
            <h2>Use API</h2>
            <div>
                <strong>Run: </strong>
                <ContractForm
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="UserApiInfo"
                method="run"
                methodArgs={[userApiStoreInput]}
                />
            </div>
            <div>
                <h3><strong>Result => </strong></h3>
                <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="UserApiInfo"
                method="getResult"
                methodArgs={[drizzleState.accounts[2], userApiStoreInput]}
                />
            </div>

            <div>
                <strong>Deposit: </strong>
                <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="UserApiInfo"
                method="getContractBalance"
                methodArgs={[drizzleState.accounts[2], userApiStoreInput]}
                />
            </div>

            <div>
                <strong>Total Owed: </strong>
                <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="UserApiInfo"
                method="getPaymentBalance"
                methodArgs={[drizzleState.accounts[2], userApiStoreInput]}
                />
            </div>

        </div>
    )

}

export default UserApiInfoRun