import React from 'react'
import { Drizzle } from "@drizzle/store";

// Import contracts
import SimpleStorage from './contracts/SimpleStorage.json'
import TutorialToken from './contracts/TutorialToken.json'

const options = {
  contracts: [
    SimpleStorage
  ]
}

const drizzle = new Drizzle(options)


function App() {
    return(

        <h2>Micro Payment</h2>



    );
}

export default App;