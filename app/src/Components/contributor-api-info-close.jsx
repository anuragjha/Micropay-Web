import React,  { useState } from "react";

import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

function ContributorApiInfoClose({ drizzle, drizzleState }) {

    return (
        <div className="section">
            <h2>Withdraw Tokens</h2>
            <div>
            <strong>Close Payment: </strong>
            <ContractForm
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="ContributorApiInfo"
                method="close"
            />
            </div>
        </div>
    )
}


export default ContributorApiInfoClose