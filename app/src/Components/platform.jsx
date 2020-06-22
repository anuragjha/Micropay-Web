import React,  { useState } from "react";

import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

function Platform({ drizzle, drizzleState }) {
    const [apiNameInput, setApiNameInput] = useInput({ type: "string" });

    function useInput({ type /*...*/ }) {
        const [value, setValue] = useState("");
        const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
        return [value, input];
      }

    return (
        <div className="section">
        <h2>Platform</h2>
        <div>
            <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="Platform"
            method="platform"
            />
        </div>
        <br />
        <h4>ApiStore</h4>
        <div>Count: 
            <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="Platform"
            method="apiStoreCount"
            />
        </div>
        <div>
            {setApiNameInput} -> {apiNameInput}<br/>
            <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="Platform"
            method="searchApiStore"
            methodArgs={[apiNameInput]}
            />
        </div>
        
        {/* <h4>Create API Info</h4>
        <div>
            <ContractForm
                drizzle={drizzle}
                contract="Platform"
                method="createApiInfo"
            />
        </div> */}
        
        </div>
    )
}

export default Platform