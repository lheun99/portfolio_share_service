import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";

import * as Api from "../../api";

function PasswordResetForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");


  //useState로 modal창의 상태를 생성함(회원가입 성공했을 시)
  const [successShow, setSuccessShow] = useState(false);
  //useState로 modal창의 상태를 생성함(회원가입 실패했을 시)
  const [failShow, setFailShow] = useState(false);

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
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;
  // 위 2개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isEmailValid && isNameValid

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      console.log("여기 작동");
      await Api.postPW("password-reset", {
        email,
        name,
      });

      setSuccessShow(true);
    } catch (err) {
      setFailShow(true);
      console.log("이메일 전송에 실패하였습니다.", err);
    }
  };

  const successHandleClose = (e) => {
    e.preventDefault();
    setSuccessShow(false);
    navigate("/login");
  };

  const failHandleClose = (e) => {
    e.preventDefault();
    setFailShow(false);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form>
            <Form.Group controlId="registerEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerName" className="mt-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {!isNameValid && (
                <Form.Text className="text-success">
                  이름은 2글자 이상 입력해 주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" onClick={handleSubmit}>
                  임시 비밀번호 발급
                </Button>
              </Col>
            </Form.Group>
          </Form>

          <Modal show={successShow}>
            <Modal.Header closeButton>
              <Modal.Title>이메일이 발송되었습니다🎉</Modal.Title>
            </Modal.Header>
            <Modal.Body>로그인 페이지로 이동합니다.</Modal.Body>
            <Modal.Footer>
              <Button variant="outline-info" onClick={successHandleClose}>
                확인
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={failShow}>
            <Modal.Header closeButton>
              <Modal.Title> 이메일 전송에 실패하였습니다.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              해당 이메일 주소로 가입된 유저가 없습니다.
              <br />
              다시 입력해주세요.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-info" onClick={failHandleClose}>
                확인
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default PasswordResetForm;
