import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import SignInModal from "../SignModels/SignInModal";
import SignUpModal from "../SignModels/SignUpModal";
import { Link } from "react-router-dom";
import { Route } from "react-router";

const Header = () => {
  const [signUpModalOn, setSignUpModalOn] = useState(false);
  const [signInModalOn, setSignInModalOn] = useState(false);
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


      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>Body Check</Navbar.Brand>
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
                    variant="secondary"
                    onClick={() => setSignUpModalOn(true)}
                  >
                    Sign Up
                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </header>
    </>
  );
};

export default Header;
