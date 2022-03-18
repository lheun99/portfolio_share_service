import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import ProjectElement from './ProjectElement';

function ProjectList({ projectList, setProjectList, isEditable, portfolioOwnerId }) {
    console.log(projectList);
    return (
        projectList.map((project, index) => (
            <ProjectElement key={index} project={project} isEditable={isEditable} setProjectList={setProjectList}></ProjectElement>
        ))
    );
}

export default ProjectList;