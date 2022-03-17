import { Row, Button, Col, Container, Card } from "react-bootstrap";
import * as Api from "../../api";

// Award 컴포넌트에서 award를 입력받아서 award의 title과 description을 나타냄.
// isEditable이 true일 경우, 편집 버튼을 생성함.
const AwardCard = ({ portfolioOwnerId, award, setIsEditing, isEditable, setAwards }) => {

  // award를 delete하는 함수
  const handleDelete = async () => {
      console.log('삭제 시도')
      console.log(`award id는 ${award.id}`)

      await Api.delete(`awards/${award.id}`);

      await Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data));
  }

  // award 상세 목록 및 편집, 삭제 버튼 생성
  return (
    <Container style={{margin:10, padding: 10,}}>
      <Row>
        <Col sm={11}>
          <Card.Subtitle>{award?.title}</Card.Subtitle>
          <Card.Text className="text-muted">{award?.description}</Card.Text>
        </Col>
        <Col sm={1}>
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
        </Col>
      </Row>
    </Container>
  );
}

export default AwardCard;
