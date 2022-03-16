import { Row, Button, Col, Container } from "react-bootstrap";

// Award 컴포넌트에서 award를 입력받아서 award의 title과 description을 나타냄.
// isEditable이 true일 경우, 편집 버튼을 생성함.
function AwardCard({ award, setIsEditing, isEditable }) {
  return (
    <Container fluid>
      <Row md="9">
        <Col className>
          {award?.title}<br/>
          {award?.description}
        </Col>
        <Col md="3">
          {isEditable && (
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                편집
              </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AwardCard;
