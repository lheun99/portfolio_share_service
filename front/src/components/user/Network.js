import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Row,
  Nav,
  NavDropdown,
  Modal,
} from "react-bootstrap";

import * as Api from "../../api";
import NetworkUserCard from "./NetworkUserCard";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [isFront, setIsFront] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [isData, setIsData] = useState(false);
  const [isAI, setIsAI] = useState(false);

  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
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
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) {
      setIsShow(true);
    } else {
      setFilteredUsers(
        users.filter((user) => user.name.toLowerCase().indexOf(query) !== -1)
      );
      setIsAll(false);
      setIsFront(false);
      setIsBack(false);
      setIsData(false);
      setIsAI(false);
      setIsSearched(true);
    }
  };

  const handleQuery = (e) => {
    setQuery(e.target.value.trim().toLowerCase());
  };

  return (
    <Container fluid>
      <div style={{ height: 100 }}></div>
      <Nav className="me-auto">
        <Nav.Link
          href="#all"
          onClick={(e) => {
            e.preventDefault();
            setIsAll(true);
            setIsFront(false);
            setIsBack(false);
            setIsData(false);
            setIsAI(false);
            setIsSearched(false);
          }}
        >
          전체 보기
        </Nav.Link>

        <NavDropdown title="직무별 보기" id="basic-nav-dropdown">
          <NavDropdown.Item
            href="#front"
            onClick={(e) => {
              e.preventDefault();
              setIsAll(false);
              setIsFront(true);
              setIsBack(false);
              setIsData(false);
              setIsAI(false);
              setIsSearched(false);
            }}
          >
            프론트엔드
          </NavDropdown.Item>
          <NavDropdown.Item
            href="#back"
            onClick={(e) => {
              e.preventDefault();
              setIsAll(false);
              setIsFront(false);
              setIsBack(true);
              setIsData(false);
              setIsAI(false);
              setIsSearched(false);
            }}
          >
            백엔드
          </NavDropdown.Item>
          <NavDropdown.Item
            href="#data"
            onClick={(e) => {
              e.preventDefault();
              setIsAll(false);
              setIsFront(false);
              setIsBack(false);
              setIsData(true);
              setIsAI(false);
              setIsSearched(false);
            }}
          >
            데이터 분석
          </NavDropdown.Item>
          <NavDropdown.Item
            href="#ai"
            onClick={(e) => {
              e.preventDefault();
              setIsAll(false);
              setIsFront(false);
              setIsBack(false);
              setIsData(false);
              setIsAI(true);
              setIsSearched(false);
            }}
          >
            AI
          </NavDropdown.Item>
        </NavDropdown>

        <Nav.Item>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="이름 검색"
              className="me-2"
              aria-label="Search"
              onChange={handleQuery}
            />
            <Button variant="outline-info" onClick={handleSearch}>
              🔍
            </Button>
          </Form>
        </Nav.Item>
        {isShearched ? (
          <>
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>
                총 {filteredUsers.length}개가 검색되었습니다.
              </Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled></Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
      {isShearched ? (
        <>
          <Row xs="auto" className="jusify-content-center">
            {filteredUsers.map((user) => (
              <NetworkUserCard key={user.id} user={user} isNetwork />
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
      {isAll ? (
        <>
          <Row xs="auto" className="jusify-content-center">
            {users.map((user) => (
              <NetworkUserCard key={user.id} user={user} isNetwork />
            ))}
          </Row>
        </>
      ) : (
        <></>
      )}
      {isFront ? (
        <>
          <Row xs="auto" className="jusify-content-center">
            {users
              .filter((user) => user.job === "프론트엔드")
              .map((user) => (
                <NetworkUserCard key={user.id} user={user} isNetwork />
              ))}
          </Row>
        </>
      ) : (
        <></>
      )}
      {isBack ? (
        <>
          <Row xs="auto" className="jusify-content-center">
            {users
              .filter((user) => user.job === "백엔드")
              .map((user) => (
                <NetworkUserCard key={user.id} user={user} isNetwork />
              ))}
          </Row>
        </>
      ) : (
        <></>
      )}
      {isData ? (
        <>
          <Row xs="auto" className="jusify-content-center">
            {users
              .filter((user) => user.job === "데이터 분석")
              .map((user) => (
                <NetworkUserCard key={user.id} user={user} isNetwork />
              ))}
          </Row>
        </>
      ) : (
        <></>
      )}
      {isAI ? (
        <>
          <Row xs="auto" className="jusify-content-center">
            {users
              .filter((user) => user.job === "AI")
              .map((user) => (
                <NetworkUserCard key={user.id} user={user} isNetwork />
              ))}
          </Row>
        </>
      ) : (
        <></>
      )}

      {/* <div style={{height:100,}}></div>
      <Row xs="auto" className="jusify-content-center" style={{justifyContent:"center"}}>
        {users.map((user) => (
          <NetworkUserCard key={user.id} user={user} />
        ))}
      </Row> */}
    </Container>
  );
}

export default Network;
