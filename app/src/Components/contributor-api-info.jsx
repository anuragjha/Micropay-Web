import React,  { useState } from "react";

import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

function ContributorApiInfo({ drizzle, drizzleState }) {

    const [contibutorApiStoreInput, setContibutorApiStoreInput] = useInput({ type: "string" });

    function useInput({ type /*...*/ }) {
        const [value, setValue] = useState("");
        const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
        return [value, input];
    }

    return (
        <div className="section">
                <h2>Registration</h2>
                <div>
                  <strong>Contract Address: </strong>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="ContributorApiInfo"
                    method="contractAddress"
                  />
                </div>
                <div>
                  <strong>Contributor Address: </strong>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="ContributorApiInfo"
                    method="contributor"
                  />
                </div>
                <div>
                <strong>Register API: </strong>
                  <ContractForm
                  drizzle={drizzle}
                  contract="ContributorApiInfo"
                  method="registerApi"
                  />
                </div>
                <div>
                  <strong>ContibutorApiStore: </strong>
                  {setContibutorApiStoreInput} -> {contibutorApiStoreInput} <br />
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="ContributorApiInfo"
                    method="contibutorApiStore"
                    methodArgs={[contibutorApiStoreInput]}
                  />
                </div>
                <div>
                  <strong>API Info: </strong>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="ContributorApiInfo"
                    method="get"
                    // todo: dynamic state
                    methodArgs={[drizzleState.accounts[0], contibutorApiStoreInput]} 
                  />
                </div>
              </div>
    )
}

export default ContributorApiInfo