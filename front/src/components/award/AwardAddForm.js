import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm({portfolioOwnerId, setAwards, setIsAdding}) {
  // 입력받을 award의 title과 description을 담을 state를 지정함.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // submit(확인) 버튼을 클릭하면 실행하는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // awardlist로 title과 description의 정보를 담아 POST 요청함.
    const res = await Api.post("awardlist", portfolioOwnerId, {
      title,
      description,
    });
    // 업데이트된 awards 정보는 response의 data임.
    const updatedAwards = res.data;
    // 해당 정보로 awards을 세팅함.
    setAwards(updatedAwards);

    // isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  // bootstrap Form을 이용하여 award의 title과 description을 입력받아 세팅함.
  // 확인 버튼은 submit, 취소 버튼은 setIsAdding을 false로 변경하여 추가를 끝냄.
  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="useEditTitle" className="mb-3">
        <Form.Control
            type="text"
            value={title}
            placeholder="수상내역"
            onChange={(e) => setTitle(e.target.value)}
        />
        </Form.Group>

        <Form.Group controlId="userEditDescription">
        <Form.Control
            type="text"
            value={description}
            placeholder="상세내역"
            onChange={(e) => setDescription(e.target.value)}
        />
        </Form.Group>

        <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
            <Button variant="primary" type="submit" className="me-3">
            확인
            </Button>
            <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
            </Button>
        </Col>
        </Form.Group>
    </Form>
  );
}

export default AwardAddForm;
