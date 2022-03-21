import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import ProjectForm from './ProjectForm';

function Project() {

    return (
        <Card>
            <Card.Body>
              <Card.Title>프로젝트</Card.Title>
              <div style={{ textAlign: "center" }}>
                <Card.Body><Button variant="primary">+</Button></Card.Body>
              </div>
            <ProjectForm></ProjectForm>
            </Card.Body>
        </Card>
    )
}
export default Project;