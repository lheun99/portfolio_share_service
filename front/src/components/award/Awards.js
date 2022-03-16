// 수상이력 목록으로, 여러 개의 Award 컴포넌트 + (추가하기 버튼 클릭 시) AwardAddForm 컴포넌트로 구성됩니다.

import React, { useEffect, useState } from "react";
import { Container, Col, Button } from "react-bootstrap";

import * as Api from "../../api";
import Award from "./Award";
// import AwardAddForm from "./AwardAddForm";

function Awards({portfolioOwnerId, isEditable}) {
  // useState 훅을 통해 awards 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);
  const [awards, setAwards] = useState([
    {
        "user_id":"af4ff0af-2a5f-4eea-99f2-d18b42aba419",
        "title": "개근상",
        "description":"개근상을 받았습니다."
    },
    {
        "user_id":"af4ff0af-2a5f-4eea-99f2-d18b135415454",
        "title": "대상",
        "description":"대상을 받았습니다."
    },
    {
        "user_id":"af4ff0af-2a5f-4eea-99f2-dskdjjf2aba419",
        "title": "장려상",
        "description":"장려상을 받았습니다."
    }]);

//   useEffect(() => {
//     // "awardlist" 엔드포인트로 GET 요청을 하고, awards response의 data로 세팅함.
//     Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data));
//   }, [portfolioOwnerId]);

  return (
    <Container fluid>
      <Col xs="auto" className="jusify-content-center">
        {awards.map((award) => (
          <Award key={award.user_id} portfolioOwnerId={portfolioOwnerId} award={award} isEditable={isEditable} />
        ))}
      </Col>
      <Col  xs="auto" className="jusify-content-center">
        <Button variant="primary" onClick={() => setIsAdding(true)}>+</Button>
      </Col>
      {isAdding && <Col>AwardAddForm 컴포넌트</Col>}
    </Container>
  );
}

export default Awards;
