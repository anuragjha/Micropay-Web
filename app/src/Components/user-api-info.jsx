import React,  { useState } from "react"

import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

function UserApiInfo({ drizzle, drizzleState }) {

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
                <strong>Contract Address: </strong>
                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="UserApiInfo"
                    method="contractAddress"
                />
            </div>
            <div>
                <strong>User Address: </strong>
                <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="UserApiInfo"
                method="user"
                />
            </div>
            <div>
                <strong>Create Provable API: </strong>
                <ContractForm
                drizzle={drizzle}
                contract="UserApiInfo"
                method="createProvableInfoFor"
                />
            </div>
            <div>
                <strong>UserApiStore: </strong>
                {setUserApiStoreInput} -> {userApiStoreInput} <br />
                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="UserApiInfo"
                    method="userApiStore"
                    methodArgs={[userApiStoreInput]}
                />
            </div>
            <div>
                <strong>Provable Info: </strong>
                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="UserApiInfo"
                    method="get"
                    // todo: profile dynamically
                    methodArgs={[drizzleState.accounts[2], userApiStoreInput]}
                />
            </div>
        </div>
    )

}


export default UserApiInfo