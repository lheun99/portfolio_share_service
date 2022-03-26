import React, { useState, useEffect } from "react";
import ProjectElement from './ProjectElement';
import * as Api from "../../api";

const ProjectList = ({ portfolioOwnerId, projectList, setProjectList, isEditable }) => {
    const [likes, setLikes] = useState({});

    useEffect(() => {
        Api.put(`users/${portfolioOwnerId}`, {projectNum: projectList.length});
        Api.get('likes', portfolioOwnerId).then((res) => {
            let likeList = res.data;
            const likeObj = likeList.reduce((acc, cur) => {
                const projectId = cur.project_id;
                acc[projectId] = true;
                return acc;
            }, {});
            setLikes(likeObj);
        })
    },[portfolioOwnerId, projectList])

    return (
        projectList.map((project, index) => {
            const projectId = project.id
            let isLiked = false;
            if (likes.hasOwnProperty(projectId)) {
                isLiked = true;
            }
            return (
            <ProjectElement key={index} project={project} isEditable={isEditable} setProjectList={setProjectList}
            setLikes={setLikes} isLiked={isLiked} portfolioOwnerId={portfolioOwnerId}
            ></ProjectElement>
        )})
    );
}

export default ProjectList;