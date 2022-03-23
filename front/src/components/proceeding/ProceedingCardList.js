import React from "react";
import ProjectElement from './ProjectElement';

const ProjectList = ({ projectList, setProjectList, isEditable }) => {
    return (
        projectList.map((project, index) => (
            <ProjectElement key={index} project={project} isEditable={isEditable} setProjectList={setProjectList}></ProjectElement>
        ))
    );
}

export default ProjectList;