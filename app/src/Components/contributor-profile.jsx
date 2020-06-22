import React, {useState} from "react"
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

function ContributorProfile({ drizzle, drizzleState }) {

    return (
        <div className="section">
            <h2>Contributor -> Alice</h2>
            <AccountData
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  accountIndex={0}
                  units="ether"
                  precision={3}
            />
        </div>
    )

}

export default ContributorProfile