import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import SignInModal from "../SignModels/SignInModal";
import SignUpModal from "../SignModels/SignUpModal";
import MyInfo from "../SignModels/MyInfo";
import { Link } from "react-router-dom";
import { Route } from "react-router";
import BodycheckLogo from "BodyCheckLogo";

  const Header = () => {
    const [signUpModalOn, setSignUpModalOn] = useState(false);
    const [signInModalOn, setSignInModalOn] = useState(false);
    const [MyInfoOn, setMyInfoOn] = useState(false);
    return (
      <>
        <SignUpModal
          show={signUpModalOn}
          onHide={() => setSignUpModalOn(false)}
        />
        <SignInModal
          show={signInModalOn}
          onHide={() => setSignInModalOn(false)}
        />
              <MyInfo
        show={MyInfoOn}
        onHide={() => setMyInfoOn(false)}
      />
   <BodycheckLogo/>

  <header style={{"float":"right"}}>
 
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link>
                  <Button
                    variant="primary"
                    onClick={() => setSignInModalOn(true)}
                  >
                    Sign In
                  </Button>
                </Nav.Link>

                <Nav.Link>
                  <Button
                    variant="primary"
                    onClick={() => setSignUpModalOn(true)}
                  >
                    Sign Up
                  </Button>
                </Nav.Link>

                <Nav.Link>
                  <Button
                    variant="secondary"
                    onClick={() => setSignUpModalOn(true)}
                  >
                    MyInfo
                  </Button>
                </Nav.Link>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <hr></hr>
      </header>
      <hr/>
    </>
  );
};

export default Header;