// 각 Award 컴포넌트는 isEditing 상태에 따라, false면 AwardCard, true면 AwardEditForm이 됩니다.

import React, { useState, useEffect } from "react";
import { Container, Col, Button } from "react-bootstrap";
// import AwardEditForm from "./AwardEditForm";
// import AwardCard from "./AwardCard";
import * as Api from "../../api";
import AwardCard from "./AwardCard";

function Award({ portfolioOwnerId, award, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 award 상태를 생성함.

  return (
    <>
        <Container>
            <Col>
                {isEditing ? (
                    // <AwardEditForm
                    // user={user}
                    // setIsEditing={setIsEditing}
                    // setUser={setUser}
                    // />
                    <h1>AwardEditForm</h1>
                ) : (
                    <AwardCard
                    award={award}
                    setIsEditing={setIsEditing}
                    isEditable={isEditable}
                    />
                )}
            </Col>
        </Container>
    </>
  );
}

export default Award;
