import React, { useState, useEffect, useContext } from "react";
import ProjectElement from './ProjectElement';
import * as Api from "../../api";
import { UserStateContext } from "../../App";

const ProjectList = ({ portfolioOwnerId, projectList, setProjectList, isEditable }) => {
    const [likes, setLikes] = useState([]);
    const userState = useContext(UserStateContext);

    useEffect(() => {
        Api.put(`users/${portfolioOwnerId}`, {projectNum: projectList.length});
        Api.get('likes', userState.user.id).then((res) => {
            let likeList = res.data;
            let myLikes = [];
            likeList.map((like) => {
                myLikes.push(like.project_id)
            })
            setLikes(myLikes)
        })
    },[portfolioOwnerId, projectList])

    return (
        projectList.map((project, index) => {
            const projectId = project.id
            let isLiked = false;
            if (likes.includes(projectId)) {
                isLiked = true;
            }
            return (
            <ProjectElement key={index} project={project} isEditable={isEditable} setProjectList={setProjectList} likes={likes}
            setLikes={setLikes} isLiked={isLiked} portfolioOwnerId={portfolioOwnerId}
            ></ProjectElement>
        )})
    );
}

export default ProjectList;