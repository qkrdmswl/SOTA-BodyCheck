import Axios from 'axios';
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

  // useState state라는 리액트에서 쓰는 변수
  // 아래처럼 선언하면 signInInfo라는 변수를 쓰는데 setSignInInfo라는 함수로 값을 변경
  //{id:'',pw:'' } 라는 값을 초기 값으로 쓴다고 선언
  // 로그인 페이지 첨에 떴을때 다 빈칸이여야 하니까 ''으로 빈 문자열 할당
  const[signInInfo, setSignInInfo] = useState ({
    id:'',
    pw:''
  });

  const {id, pw} = signInInfo;  //비구조 할당화라 id에 접근할때 signInInfo.id 이런식으로 해야하는데
  //이렇게 하면 id 라는 이름으로 접근 가능

  const handleSignInInfo = e => {
    const {name, value} = e.target;
    setSignInInfo({
      ...signInInfo,
      [name]: value   // value={id} name='id'로 예를 들면 name이 id인 변수에 id을 할당하는 것

    })
  }



  const onClickSignInBtn = async () => {
    console.log('로그인 버튼 클릭됨 id:' + id + ' pw: ' + pw);
    Axios.post('/auth/login', {email: id, password: pw}).then((res) => {
      console.log('login');
      // 쿠키 받기(로그인) 성공
      // 로그인 창 닫고 화면 갱신하는 코드
    }).catch((error) => {
      console.error(error);
    })
  }


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