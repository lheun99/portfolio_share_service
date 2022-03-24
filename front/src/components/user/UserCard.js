import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  const withdrawal = async () => {
    // 회원탈퇴 확인창
    alert(`${user.name}님, 회원탈퇴가 완료되었습니다.`);

    // 해당 유저의 학력, 수상이력, 프로젝트, 자격증 삭제
    await Api.delete(`educationlist/${user.id}`);
    await Api.delete(`awardlist/${user.id}`);
    await Api.delete(`projectlist/${user.id}`);
    await Api.delete(`certificatelist/${user.id}`);
    await Api.delete(`careerlist/${user.id}`);

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
            style={{ width: "9rem", height: "9rem", borderRadius:100, margin:0, padding:0,}}
            className="mb-3"
            src={user?.profile}
            alt="사용자 프로필"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
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
        )}

        {/* {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )} */}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
