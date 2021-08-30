import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import HorizontalLine from "../components/HorizonLine";
import FindId from "./FindId";
import FindPw from "./FindPw";
import axios from "axios";

let email = '';
let password = '';
const onClickLogin = (e) => {
  axios.post('/auth/login', {email, password}).then((res) => {
    console.log('asdf');
    // 쿠키 받기(로그인) 성공
    // 로그인 창 닫고 화면 갱신하는 코드
  }).catch((error) => {
    console.error(error);
  })
}
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
              <Form.Control type="email" placeholder="Enter email" onChange={e => email=e.target.value}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => password=e.target.value}/>
            </Form.Group>

            <Button block variant="info" type="button" className="my-3" onClick={onClickLogin}>
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
