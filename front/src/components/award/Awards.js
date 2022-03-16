// 수상이력 목록
// 여러 개의 Award 컴포넌트 + (추가하기 버튼 클릭 시) AwardAddForm 컴포넌트로 구성됩니다.

import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

function Awards({portfolioOwnerId, isEditable}) {
  // useState 훅을 통해 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);
  // useState 훅을 통해 awards 상태를 생성함. (현재는 임의로 데이터를 넣어준 상태)
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

// "awardlist"로 GET 요청을 하고, awards를 response의 data로 세팅함.
//   useEffect(() => {
//     Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data));
//   }, [portfolioOwnerId]);

// title은 '수상이력', body는 Award 컴포넌트의 집합으로 이루어진 Card를 생성함.
// 버튼을 클릭하면 isAdding이 true로 바뀌며, AwardAddForm 컴포넌트가 생성됨.
// 현재는 Award 컴포넌트에 award를 직접 넘겨주고 있지만, 백엔드가 연결되면 portfolioOwnerId 혹은 user_id를 통해 서버에서 데이터를 GET 처리함.
  return (
    <Card>
      <Card.Title>수상이력</Card.Title>
      <Card.Body>
        {awards.map((award) => (
          <Award key={award.user_id} portfolioOwnerId={portfolioOwnerId} award={award} user_id={award.user_id} isEditable={isEditable} />
        ))}
        <Button variant="primary" onClick={() => setIsAdding(true)}>+</Button>
        {isAdding && <AwardAddForm portfolioOwnerId={portfolioOwnerId} setAwards={setAwards} setIsAdding={setIsAdding} />}
      </Card.Body>
    </Card>
  );
}

export default Awards;
