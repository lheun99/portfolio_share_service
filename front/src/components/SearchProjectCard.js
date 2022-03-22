import { useNavigate } from "react-router-dom";
import { Card, Row } from "react-bootstrap";

function SearchProjctCard({ project, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/users/${project.user_id}`)}
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
        <Card.Title>{project?.title}</Card.Title>
        <Card.Text>{project?.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SearchProjctCard;
