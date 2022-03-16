import { Card, Row, Button, Col } from "react-bootstrap";

function AwardCard({ award, setIsEditing, isEditable }) {
  return (
    <Card className="mb-2 ms-3 mr-5">
      <Card.Body>
        <Row className="justify-content-md-center">
        </Row>
        <Card.Title>{award?.title}</Card.Title>
        <Card.Text>{award?.description}</Card.Text>

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
          </Col>
        )}
      </Card.Body>
    </Card>
  );
}

export default AwardCard;
