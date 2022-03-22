import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const navigate = useNavigate();
  const [searchedProject, setSearchedProject] = useState("");

  return (
    <Form
      className="d-flex"
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/search`, { state: searchedProject });
      }}
    >
      <Form.Control
        type="search"
        placeholder="프로젝트 검색"
        className="me-2"
        aria-label="Search"
        onChange={(e) => setSearchedProject(e.target.value)}
      />
      <Button
        variant="outline-info"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/search`, { state: searchedProject });
        }}
      >
        Search
      </Button>
    </Form>
  );
}

export default SearchForm;
