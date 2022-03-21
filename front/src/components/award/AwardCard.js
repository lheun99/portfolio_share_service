import { Row, Button, Col, Container, Card, ButtonGroup } from "react-bootstrap";
import * as Api from "../../api";

// Award 컴포넌트에서 award를 입력받아서 award의 title과 description을 나타냄.
// isEditable이 true일 경우, 편집 버튼을 생성함.
const AwardCard = ({ awards, award, setIsEditing, isEditable, setAwards }) => {

  // award를 delete하는 함수
  const handleDelete = async () => {
      // DELETE 요청
      await Api.delete(`awards/${award.id}`);

      // awards에서 delete된 데이터를 제거
      const newAwards = awards.filter((v) => v.id !== award.id);
      setAwards(newAwards);
  }

  // award 상세 목록 및 편집, 삭제 버튼 생성
  return (
    <Container style={{margin:10, padding: 10,}}>
      <Row>
        <Col sm={10}>
          <Card.Subtitle>{award?.title}</Card.Subtitle>
          <Card.Text className="text-muted">{award?.description}</Card.Text>
        </Col>
        <Col sm={2}>
          <ButtonGroup style={{ margin: 10, }} size='sm'>
            {isEditable && (
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
            )}
            {isEditable && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleDelete}
                >
                  삭제
                </Button>
            )}
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default AwardCard;
