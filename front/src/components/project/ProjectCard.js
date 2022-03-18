import React, { useContext, useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import * as Api from '../../api';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';

function ProjectCard({ portfolioOwnerId, isEditable }) {

    const [projectList, setProjectList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        Api.get('projectlist', portfolioOwnerId)
            .then(res => setProjectList(res.data));
    }, [portfolioOwnerId]);

    return (<Card>
        <Card.Body>
            <Card.Title>프로젝트</Card.Title>
            <ProjectList projectList={projectList} setProjectList={setProjectList} isEditable={isEditable} portfolioOwnerId={portfolioOwnerId}></ProjectList>
            {isEditable && (
                <div style={{ textAlign: "center" }}>
                    <Card.Body><Button variant="primary" onClick={() => setIsEditing(true)}>+</Button></Card.Body>
                    {isEditing && <ProjectForm setIsEditing={setIsEditing}></ProjectForm>}
                </div>
            )}
        </Card.Body>
    </Card>)
}
export default ProjectCard;