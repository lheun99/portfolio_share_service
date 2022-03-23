import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function User({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card 
      className="mb-2 ms-3 mr-5" 
      style={{ width: "18rem" }}
    >
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            onClick={() => isEditable ? navigate(`/users/${user.id}/profilePage`) : undefined} 
            style={{ width: "10rem", height: "8rem", cursor: "pointer" }}
            className="mb-3"
            src="http://placekitten.com/200/200"
            alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>
        <Row>
          <Col>{user?.github && <a href={user?.github} target='__blank' style={{color: "black"}}><i className="fa-brands fa-github"></i></a>}</Col>
          <Col>{user?.gitlab && <a href={user?.gitlab} target='__blank' style={{color: "black"}}><i className="fa-brands fa-gitlab"></i></a>}</Col>
          <Col>{user?.twitter && <a href={user?.twitter} target='__blank' style={{color: "black"}}><i className="fa-brands fa-twitter"></i></a>}</Col>
          <Col>{user?.instagram && <a href={user?.instagram} target='__blank' style={{color: "black"}}><i className="fa-brands fa-instagram"></i></a>}</Col>
          <Col>{user?.youtube && <a href={user?.youtube} target='__blank' style={{color: "black"}}><i className="fa-brands fa-youtube"></i></a>}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default User;
