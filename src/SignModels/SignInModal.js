import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import HorizontalLine from "../components/HorizonLine";
import FindId from "./FindId";
import FindPw from "./FindPw";

const SignInModal = ({ show, onHide }) => {
  const [findIdModalOn, setFindIdModalOn] = useState(false);
  const [findPwModalOn, setFindPwModalOn] = useState(false);

  return (
    <>
     <FindId
        show={findIdModalOn}
        onHide={() => setFindIdModalOn(false)}
      />

     <FindPw
        show={findPwModalOn}
        onHide={() => setFindPwModalOn(false)}
      />
      
      <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button block variant="info" type="button" className="my-3" >
              Sign In
            </Button>

            {/* <Button block variant="info" type="button" className="my-3">
             아이디 찾기
            </Button>

            <Button block variant="info" type="button" className="my-3">
             비밀번호 찾기
            </Button> */}

           <div className='search_user_info_div'>
           <div onClick={() => setFindIdModalOn(true)}> <b style={{ 'marginLeft' : '15px' }}> 아이디 찾기 </b> </div>
           <div onClick={() => setFindPwModalOn(true)}> <b> 비밀번호 찾기 </b> </div>
           </div>


          </Form>
        </Modal.Body>
      </Container>
    </Modal>
       </>
   
  );
};

export default SignInModal;
