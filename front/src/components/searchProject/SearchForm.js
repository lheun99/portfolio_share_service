import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const navigate = useNavigate();
  const [searchedProject, setSearchedProject] = useState(null);
  const [isWrong, setIsWrong] = useState(false);
  const handleClose = () => setIsWrong(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchedProject) {
      setIsWrong(true);
    } else {
      navigate(`/search`, { state: searchedProject });
    }
  };
  return (
    <>
      <Form className="d-flex" onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="프로젝트 검색"
          className="me-2"
          aria-label="Search"
          onChange={(e) => setSearchedProject(e.target.value)}
        />
        <Button variant="outline-info" onClick={handleSearch}>
          Search
        </Button>
      </Form>
      <Modal show={isWrong}>
        <Modal.Body>검색어를 입력하세요.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchForm;
