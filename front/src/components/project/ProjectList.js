import React from "react";
import ProjectEdit from './ProjectEdit';

// 프로젝트 목록을 그려주는 컴포넌트
function ProjectList({projectList}) {
    return (
      (projectList.map((project, index) => (
            <ProjectEdit key={index} project={project} id={project.id}></ProjectEdit>
          )
        ))
    )
}

export default ProjectList;