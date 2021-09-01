import React from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import HorizontalLine from "../components/HorizonLine";
import axios from "axios";

let email = '';
let password = '';
const onClickLogin = (e) => {
  console.log(email, password);
  axios.post('/auth/join', {email, password}).then((res) => {
    console.log(res.data); //res.data.id -> 이메일이 아닌 데이터베이스에 저장된 pk 아이디 확인 
    // 쿠키 받기(로그인) 성공
    // 로그인 창 닫고 화면 갱신하는 코드
  }).catch((error) => {
    console.error(error);
  })
}

const SignUpModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Enter your name" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={e => email=e.target.value}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => password=e.target.value}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Button block variant="info" type="button" className="my-3"onClick={onClickLogin}>
              Sign Up
            </Button>

          </Form>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default SignUpModal;