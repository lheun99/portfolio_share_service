import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import UserCard from "./UserCard";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import { useLocation } from "react-router";
import SearchBar from "./SearchBar";

function SearchProject() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);
  const { state } = useLocation();
  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  let user_list = [];
  return (
    <Container fluid>
      <SearchBar />
      <Row xs="auto" className="jusify-content-center">
        {users.forEach((user) => {
          if (user.name.indexOf(state) === -1) {
            return;
          }
          console.log(user);
          user_list.push(user);
        })}
        {user_list.map((user) => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
    </Container>
  );
}

export default SearchProject;
