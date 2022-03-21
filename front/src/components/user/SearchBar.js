import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";

function SearchBar() {
  const navigate = useNavigate();
  // useState 훅을 통해 users 상태를 생성함.
  const [searchedProject, setSearchedProject] = useState([]);

  return (
    <Container fluid>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/search`, { state: searchedProject });
        }}
      >
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            autoComplete="on"
            value={searchedProject}
            onChange={(e) => setSearchedProject(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Container>
  );
}

export default SearchBar;
