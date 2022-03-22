import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Card } from "react-bootstrap";

import * as Api from "../api";
import SearchProjectCard from "./SearchProjectCard";

import { UserStateContext } from "../App";
import { useLocation } from "react-router";

function Search() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [projects, setProjects] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("projectslist").then((res) => setProjects(res.data));
  }, [userState, navigate]);
  const searchedProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().indexOf(state.toLowerCase()) !== -1 ||
      project.description.toLowerCase().indexOf(state.toLowerCase()) !== -1
  );

  return (
    <Container fluid>
      <Card.Body>총 {searchedProjects.length}개가 검색되었습니다.</Card.Body>

      <Row xs="auto" className="jusify-content-center">
        {searchedProjects.map((project) => (
          <SearchProjectCard key={project.id} project={project} isNetwork />
        ))}
      </Row>
    </Container>
  );
}

export default Search;
