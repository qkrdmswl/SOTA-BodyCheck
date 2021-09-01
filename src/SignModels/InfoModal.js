import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import HorizontalLine from "../components/HorizonLine";
import MyInfo from "./MyInfo";


const InfoModal = ({ show, onHide }) => {
  const [MyInfoModalOn, setMyInfoModalOn] = useState(false);

  const[InfoInfo, setInfoInfo] = useState ({
    id:'',
    pw:''
  });

  const {id, pw} = setInfoInfo; 

  const handleSignInInfo = e => {
    const {name, value} = e.target;
    setInfoInfo({
      ...InfoInfo,
      [name]: value  
    })
  }

  const onClickInfoBtn = () => {
    console.log('로그인 버튼 클릭됨 id:' + id + ' pw: ' + pw);
  }

  return (
    <>
     <MyInfo
        show={MyInfoModalOn}
        onHide={() => setMyInfoModalOn(false)}
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
          <Modal.Title id="contained-modal-title-vcenter">MyInfo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={id} name='id' onChange={handleSignInInfo}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value ={pw} name='pw' onChange={handleSignInInfo}/>
            </Form.Group>

            <Button block variant="info" type="button" className="my-3" onClick={onClickInfoBtn}>
              Confirm
            </Button>

            {/* <Button block variant="info" type="button" className="my-3">
             아이디 찾기
            </Button>

            <Button block variant="info" type="button" className="my-3">
             비밀번호 찾기
            </Button> */}



          </Form>
        </Modal.Body>
      </Container>
    </Modal>
       </>
   
  );
};

export default InfoModal;