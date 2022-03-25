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
      <div style={{ height: 110 }}></div>
      <Nav className="me-auto" style={{padding:"20px 0", justifyContent:"center",}}>
        {/* <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            관심 프로젝트를 검색
          </Nav.Link>
        </Nav.Item> */}
        <Nav.Item>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Group style={{marginRight:"10px"}}>
              <Form.Control
                type="search"
                placeholder="프로젝트 검색"
                className="me-2"
                aria-label="Search"
                onChange={handleQuery}
              />
              {!query && (<Form.Text className="text-success">
                    관심 있는 프로젝트를 검색합니다.
              </Form.Text>)}
            </Form.Group>
            <Button style={{backgroundColor:'white', border:"none",padding:"5px 0 0 0",height:32,}} onClick={handleSearch}>
                <span className="material-icons" style={{color:"grey",fontSize:32,}}>search</span>
            </Button>
          </Form>
        </Nav.Item>
        {isShearched ? (
          <>
            <Nav.Item style={{width:900,}}>
              <Nav.Link eventKey="disabled" disabled>
                총 {filteredProjects.length}개가 검색되었습니다.
              </Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item style={{width:900,}}>
              <Nav.Link eventKey="disabled" disabled></Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
      {isAll ? (
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center", }}>
          <Row xs="auto" style={{width:1217, justifyContent:"flex-start"}}>
            {projects.map((project) => (
              <SearchedProjectCard
                key={project.id}
                project={project}
                isNetwork
              />
            ))}
          </Row>
        </div>
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
