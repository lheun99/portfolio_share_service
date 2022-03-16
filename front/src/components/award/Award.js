// 각 Award 컴포넌트는 isEditing 상태에 따라, false면 AwardCard, true면 AwardEditForm이 됩니다.

import React, { useState, useEffect } from "react";
import AwardEditForm from "./AwardEditForm";
import AwardCard from "./AwardCard";
import * as Api from "../../api";

function Award({ portfolioOwnerId, award, user_id, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 award 상태를 생성함. (현재는 서버와 데이터 통신이 불가능하므로 award를 직접 입력받음.)
//   const [award, setAward] = useState({});

// "awards/유저id" 엔드포인트로 GET 요청을 하고, award를 response의 data로 세팅함.
//   useEffect(() => {
//     Api.get("awards", portfolioOwnerId).then((res) => setAward(res.data));
//   }, [portfolioOwnerId]);

// isEditing이 true이면 AwardEditForm을 생성하고, false이면 AwardCard를 생성함.
  return (
    <>
        {isEditing ? (
            <AwardEditForm
            award={award}
            setIsEditing={setIsEditing}
            // setAward={setAward}
            />
        ) : (
            <AwardCard
            award={award}
            setIsEditing={setIsEditing}
            isEditable={isEditable}
            />
        )}
    </>
  );
}

export default Award;
