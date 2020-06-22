import React from "react";

import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;


function Storage({ drizzle, drizzleState }) {

    return (
          <div className="section">
            <h2>Storage</h2>
            <p>
              Just Storage Contract
            </p>
            <p>
              <strong>Stored Value: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="Storage"
                method="stringData"
              />
            </p>
            <ContractForm drizzle={drizzle} contract="Storage" method="setStringData" />
          </div>
    )


}


export default Storage