import React from 'react';
import { newContextComponents } from "@drizzle/react-components";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import logo from "./logo.png";
import SimpleStorage from "./Components/simple-storage.jsx"
import Storage from "./Components/storage.jsx"
import Logo from "./Components/logo.jsx"
import Platform from "./Components/platform.jsx"
import ContributorApiInfo from "./Components/contributor-api-info.jsx"
import UserApiInfo from "./Components/user-api-info.jsx"
import UserApiInfoRun from "./Components/user-api-info-run.jsx"
import UserSign from "./Components/user-sign.jsx"
import ContributorVerify from "./Components/contributor-verify.jsx"
import CheckList from './Components/check-list';
import ContributorApiInfoClose from "./Components/contributor-api-info-close.jsx"
import ContributorProfile from "./Components/contributor-profile.jsx"
import UserProfile from "./Components/user-profile.jsx"
import CheckEntryAdd from "./Components/check-entry-add.jsx"

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  return (
    <div className="App">
      <Container>
        
        {/* row 1 */}
        <Row>
          
          {/* logo */}
          <Col md="auto">
            <Logo />
          </Col>
          {/* Platform solidity */}
          <Col>
            <Platform drizzle={drizzle} drizzleState={drizzleState}/>
          </Col>
        </Row>

        {/* row 2 */}
        <Row>
          {/* Contributor content -  Contributor API Info solidity */}
          <Col>
            <ContributorProfile drizzle={drizzle} drizzleState={drizzleState}/>
            <ContributorApiInfo drizzle={drizzle} drizzleState={drizzleState}/>
          </Col>
          {/* User content  - User API Info solidity */}
          <Col>
          <UserProfile drizzle={drizzle} drizzleState={drizzleState}/>
          <UserApiInfo drizzle={drizzle} drizzleState={drizzleState}/>
          </Col>
        </Row>

        {/* row 3 */}
        <Row>
          {/* Contributor Payment section - Contributor API Info solidity */}
          <Col>
            <ContributorProfile drizzle={drizzle} drizzleState={drizzleState}/>
            <ContributorApiInfoClose drizzle={drizzle} drizzleState={drizzleState}/>
            <ContributorVerify/>
          </Col>

          {/* User Run and Payment section - User API Info solidity */}
          <Col>
            <UserProfile drizzle={drizzle} drizzleState={drizzleState}/>
            <UserApiInfoRun drizzle={drizzle} drizzleState={drizzleState} />
            <UserSign />
          </Col>
        </Row>

        {/* row 4 */}
        <Row>
          <Col>
            <CheckList drizzle={drizzle} drizzleState={drizzleState} />
          </Col>
        </Row>

      </Container>



      
      


    </div>
  );
};
