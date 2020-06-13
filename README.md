# Micropay Web

### Setup Instructions

#### 1. Make a new directory and move into it.
    % mkdir Micropay-Web
    % cd Micropay-Web

#### 2. Install Truffle globally and run unbox command.
    % npm install -g truffle 
    % truffle unbox drizzle

#### 3. Run the development console.
    % truffle develop

#### 4. Compile and Migrate smart contracts.
From truffle(develop) console:

    > compile
    > migrate

#### 5. Run React app from `app` directory.
    % cd app
    % npm run start

#### 6. Run Truffle tests
From project directory:

    % truffle test
     
#### 7. Run test for React components.
Run the command from inside the `app` directory. Also, compile the contracts before running the tests.
    
    % npm run test
    
#### 8. Finally, build application for production
 Run the build script from inside `app` directory. A production build will be in the `app/build` folder.
 
    % npm run build

#### 9. Integrating Provable
Use Etherum bridge to connect to local instance of blockchain (https://github.com/provable-things/ethereum-bridge)
Install ethereum-bridge:

    % npm install -g ethereum-bridge

Activate Provable:

    % ethereum-bridge -H 127.0.0.1:8545 -a 1

The above command, will allow to deploy contracts using the account 1 found on the 127.0.0.1:8545 node