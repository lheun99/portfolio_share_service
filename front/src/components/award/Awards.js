// 수상이력 목록
// 여러 개의 Award 컴포넌트 + (추가하기 버튼 클릭 시) AwardAddForm 컴포넌트로 구성됩니다.

import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

const Awards = ({portfolioOwnerId, isEditable}) => {
  // useState 훅을 통해 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);
  // useState 훅을 통해 awards 상태를 생성함.
  const [awards, setAwards] = useState([])

// "awardlist"로 GET 요청을 하고, awards를 response의 data로 세팅함.
  useEffect(() => {
    const fetch = async () => {
      const res = await Api.get(`awardlist/${portfolioOwnerId}`);
      setAwards(res.data)
    }
    fetch();
  }, [portfolioOwnerId]);

// title은 '수상이력', body는 Award 컴포넌트의 집합으로 이루어진 Card를 생성함.
// 버튼을 클릭하면 isAdding이 true로 바뀌며, AwardAddForm 컴포넌트가 생성됨.
// Award 컴포넌트에 award를 직접 넘겨줌.
  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awards && (awards.map((award) => (
          <Award key={award.id} portfolioOwnerId={portfolioOwnerId} award={award} isEditable={isEditable} setAwards={setAwards} />)
        ))}
        <div style={{ textAlign: "center" }}>
          {isEditable && <Button variant="primary" onClick={() => setIsAdding(true)}>+</Button>}
        </div>
        {isAdding && <AwardAddForm awards={awards} portfolioOwnerId={portfolioOwnerId} setAwards={setAwards} setIsAdding={setIsAdding} />}
      </Card.Body>
    </Card>
  );
}

export default Awards;
