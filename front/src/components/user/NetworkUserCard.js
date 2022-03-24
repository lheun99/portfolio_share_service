import { useNavigate } from "react-router-dom";
import { Card, Row, Badge } from "react-bootstrap";

function NetworkUserCard({ user }) {
  const navigate = useNavigate();

  const colorChange = () => {
    if (user?.job === "프론트엔드") {
      return "info";
    } else if (user?.job === "백엔드") {
      return "dark";
    } else if (user?.job === "데이터 분석") {
      return "success";
    } else if (user?.job === "AI") {
      return "warning";
    } else if (user?.job === "기타") {
      return "secondary";
    } else {
      return null;
    }
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
            style={{ width: "9.4rem", height: "8.45rem", borderRadius: 100 }}
            className="mb-3"
            src={user?.profile}
            alt="사용자 프로필"
          />
        </Row>
        <Card.Title
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {user?.name}
          <h6 style={{ margin: "auto 5px" }}>
            <Badge pill bg={colorChange()}>
              {" "}
              {user?.job}
            </Badge>
          </h6>
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>
        <Card.Text>
          <i className="fa-regular fa-file-lines"></i> {user?.projectNum}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default NetworkUserCard;
