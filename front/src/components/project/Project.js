import React from "react";
import ProjectCard from './ProjectCard';


const Project = ({portfolioOwnerId, isEditable}) => {
    console.log(portfolioOwnerId);
    return (
        <>
            <ProjectCard portfolioOwnerId={portfolioOwnerId} isEditable={isEditable}></ProjectCard>
        </>
    )
}

export default Project;