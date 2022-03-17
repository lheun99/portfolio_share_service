import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row, Card, Button, Form } from "react-bootstrap";

function ProjectForm() {
    return (
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="학교 이름"
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="text" placeholder="전공" autoComplete="off" />
      </Form.Group>
      <div key={"inline-radio"} className="mb-3">
        <Form.Check
          inline
          label="재학중"
          name="position"
          type={"radio"}
          id={`inline-radio-1`}
        />
        <Form.Check
          inline
          label="학사졸업"
          name="position"
          type={"radio"}
          id={`inline-radio-2`}
        />
        <Form.Check
          inline
          label="석사졸업"
          name="position"
          type={"radio"}
          id={`inline-radio-3`}
        />
        <Form.Check
          inline
          label="박사졸업"
          name="position"
          type={"radio"}
          id={`inline-radio-4`}
        />
      </div>

      <div style={{ textAlign: "center" }}>
          <Button variant="primary" type="submit" className="me-3 btn btn-primary">
              제출
          </Button>
          <Button variant="secondary" type="button" className="btn btn-secondary">
              취소
          </Button>
      </div>
    
    </Form>
    );
}

export default ProjectForm;