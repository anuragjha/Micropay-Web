import React, {useState} from "react"
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

function UserProfile({ drizzle, drizzleState }) {

    return (
        <div className="section">
            <h2>User -> Bob</h2>
            <AccountData
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  accountIndex={2}
                  units="ether"
                  precision={3}
            />
        </div>
    )

}

export default UserProfile