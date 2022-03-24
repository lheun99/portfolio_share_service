import { useNavigate } from "react-router-dom";
import { Card, Row } from "react-bootstrap";

function SearchedProjectCard({ project, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/users/${project.user_id}`)}
      className="mb-2 ms-3 mr-5"
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <Card.Body>
        <Row className="justify-content-md-center"></Row>
        <Card.Title>{project?.title}</Card.Title>
        <Card.Text style={{borderTop:"grey solid 1px", padding:5,}}>{project?.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SearchedProjectCard;
