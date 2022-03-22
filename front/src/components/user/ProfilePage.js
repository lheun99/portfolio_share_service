import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState({});

  const portfolioOwnerId = params.userId;

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  const withdrawal = async () => {
    // 회원탈퇴 확인창
    alert(`${user.name}님, 회원탈퇴가 완료되었습니다.`);

    // 해당 유저의 학력, 수상이력, 프로젝트, 자격증 삭제
    await Api.delete(`educationlist/${user.id}`);
    await Api.delete(`awardlist/${user.id}`);
    await Api.delete(`projectlist/${user.id}`);
    await Api.delete(`certificatelist/${user.id}`);

    // 해당 유저 DELETE 요청 처리
    await Api.delete(`users/${user.id}`);
    // 로그인 페이지로 돌아감
    navigate("/login");
  };

  return (
    <Card 
      onClick={() => navigate(`/users/${user.id}`)} 
      className="mb-2 ms-3 mr-5" 
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src="http://placekitten.com/200/200"
            alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        <Col>
        <Row className="mt-3 text-center text-info">
            <Col sm={{ span: 20 }}>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={withdrawal}
            >
                회원탈퇴
            </Button>
            </Col>
        </Row>
        </Col>
      </Card.Body>
    </Card>
  );
}

export default ProfilePage;
