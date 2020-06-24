# Micropay

Micropayment platform for using APIs.

Micropay is a platform to consume and pay for API's in a simple way.

## Architecture

### 1. API distribution
Contributor submits their API and cost per call to the platform. Platform allows searching and instantiating API for consumer.

When an API is requested by a consumer. Platform creates an API (connected through a Oracle). A contract is created that binds contributor and consumer into a micropayment contract.

![GitHub Logo](/docs/step1.png)

### 2. Micro Payment
This micro payment is a pre payment. Consumers should maintain enough balance to cover cost of using API.

On every run of API, user sends a message `{Payment Address and Amount Owed}` off chain to the API contributor. In this application the messages is sent to google firebase (which acts as a broker for user and contributor). 

Contributor sees the messages in realtime. They can verify the messages and submit the payment address, amount owed and signature of the user to close the payment channel and get the tokens owed to them.

![GitHub Logo](/docs/step2.png)


## Installation

Steps to setup and run project on your machine. Ensure that truffle is installed.

1. Clone the project
   ```
   git clone https://github.com/anuragjha/Micropay-Web.git
   ```

2. Run the development console.
    ```
    truffle develop
    ```

3. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate --reset
    ```

4. In the `app` directory, we run the React app. 
    ```js
    // in another terminal (i.e. not in the truffle develop prompt)
    cd app
    npm run start
    ```

5. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```js
    // inside the development console
    test
    ```

6. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```js
    // ensure you are inside the app directory when running this
    npm run test
    ```

7. To build the application for production, use the build script. A production build will be in the `app/build` folder.
    ```js
    // ensure you are inside the app directory when running this
    npm run build
    ```
