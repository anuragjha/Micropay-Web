import React from "react";

import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;


function SimpleStorage({ drizzle, drizzleState }) {

    return (
          <div className="section">
            <h2>SimpleStorage</h2>
            <p>
              This shows a simple ContractData component with no arguments, along
              with a form to set its value.
            </p>
            <p>
              <strong>Stored Value: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="SimpleStorage"
                method="storedData"
              />
            </p>
            <ContractForm drizzle={drizzle} contract="SimpleStorage" method="set" />
          </div>
    )


}


export default SimpleStorage