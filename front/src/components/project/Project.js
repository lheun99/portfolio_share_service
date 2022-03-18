import React from "react";
import ProjectCard from './ProjectCard';


function Project({portfolioOwnerId, isEditable}) {
    console.log(portfolioOwnerId);
    return (
        <>
            <ProjectCard portfolioOwnerId={portfolioOwnerId} isEditable={isEditable}></ProjectCard>
        </>
    )
}

export default Project;