import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button, Modal,} from "react-bootstrap";
import "./LoginForm.css"
import * as Api from "../../api";
import { DispatchContext } from "../../App";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("user/login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      setShow(true)
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

  const handleClose = () => {
    setShow(false)
  }

  return (
    <div id="loginform">
      <Container>
        <Row>
          <Col lg={8}>
            <Form style={{margin:110,padding:30, backgroundColor:"rgba(255, 255, 255, 0.6)",borderRadius:20,}} onSubmit={handleSubmit}>
              <Form.Group controlId="loginEmail">
                <Form.Label>
                  이메일 주소
                </Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="on"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailValid && (
                  <Form.Text className="text-success">
                    이메일 형식이 올바르지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="loginPassword" className="mt-3">
                <Form.Label>
                  비밀번호
                </Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="on"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isPasswordValid && (
                  <Form.Text className="text-success">
                    비밀번호는 4글자 이상입니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="primary" type="submit" disabled={!isFormValid}>
                    로그인
                  </Button>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button style={{backgroundColor:"rgba(255, 255, 255, 0)",border:"none",color:"black"}} onClick={() => navigate("/register")}>
                    회원가입하기
                  </Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <button style={{ 
                      border: "none",
                      backgroundColor: "transparent",
                    }} 
                    onClick={() => navigate("/password-reset")}
                    >
                    비밀번호를 잊으셨나요?
                  </button>
                </Col>
              </Form.Group>
            </Form>
            <Modal show={show}>
            <Modal.Header>
            <Modal.Title>
              로그인에 실패했습니다.
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              이메일 주소 또는 비밀번호를 다시 확인해주세요.
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={handleClose}>
                확인
            </Button>
            </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginForm;
