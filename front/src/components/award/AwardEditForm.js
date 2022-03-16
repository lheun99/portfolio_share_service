import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ award, setIsEditing, setAward }) {
  //useState로 title 상태와 description 상태를 지정하며, 기본 상태는 award의 title과 description임.
  const [title, setTitle] = useState(award.title);
  const [description, setDescription] = useState(award.description);

  // submit(확인) 버튼을 클릭하면 실행하는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // "awards/유저id" 엔드포인트로 title과 description 정보를 담아 PUT 요청함.
    const res = await Api.put(`awards/${award.user_id}`, {
      title,
      description,
    });
    // 업데이트된 award 정보는 response의 data임.
    const updatedAward = res.data;
    // 해당 데이터로 award를 세팅함.
    setAward(updatedAward);

    // isEditing을 false로 세팅함. (편집이 끝난 상태)
    setIsEditing(false);
  };

  // bootstrap Form을 이용하여 award의 title과 description을 입력받아 세팅함.
  // 확인 버튼은 submit, 취소 버튼은 setIsEditing을 false로 변경하여 편집을 끝냄.
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="awardEditTitle" className="mb-3">
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="awardEditDescription">
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardEditForm;
