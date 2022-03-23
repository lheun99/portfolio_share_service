import { useNavigate } from "react-router-dom";
import { Card, Row } from "react-bootstrap";

function NetworkUserCard({ user }) {
  const navigate = useNavigate();

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
      </Card.Body>
    </Card>
  );
}

export default NetworkUserCard;