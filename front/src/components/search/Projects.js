import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Nav, Form, Button, Modal } from "react-bootstrap";

import * as Api from "../../api";
import { UserStateContext } from "../../App";
import SearchedProjectCard from "./SearchedProjectCard";

function Projects() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [isAll, setIsAll] = useState(true);
  const [isShearched, setIsSearched] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const handleClose = () => setIsShow(false);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("projectslist").then((res) => setProjects(res.data));
  }, [userState, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) {
      setIsShow(true);
    } else {
      setIsAll(false);
      setFilteredProjects(
        projects.filter(
          (project) =>
            project.title.toLowerCase().indexOf(query) !== -1 ||
            project.description.toLowerCase().indexOf(query) !== -1
        )
      );
      setIsSearched(true);
    }
  };

  const handleQuery = (e) => {
    setQuery(e.target.value.trim().toLowerCase());
  };

  return (
    <Container fluid>
      <Nav className="me-auto">
        <Nav.Item>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="프로젝트 검색"
              className="me-2"
              aria-label="Search"
              onChange={handleQuery}
            />
            <Button variant="outline-info" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Nav.Item>
        {isShearched ? (
          <>
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>
                🔍총 {filteredProjects.length}개가 검색되었습니다.
              </Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>
                🔍
              </Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
      {isAll ? (
        <>
          <Row xs="auto" className="jusify-content-center">
            {projects.map((project) => (
              <SearchedProjectCard
                key={project.id}
                project={project}
                isNetwork
              />
            ))}
          </Row>
        </>
      ) : (
        <></>
      )}
      {isShearched ? (
        <>
          <Row xs="auto" className="jusify-content-center">
            {filteredProjects.map((project) => (
              <SearchedProjectCard
                key={project.id}
                project={project}
                isNetwork
              />
            ))}
          </Row>
        </>
      ) : (
        <></>
      )}
      <Modal show={isShow}>
        <Modal.Body>검색어를 입력하세요.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Projects;
