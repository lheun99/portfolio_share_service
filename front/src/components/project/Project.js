import React, { useContext, useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { Card, Button} from "react-bootstrap";

import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import * as Api from '../../api';
import { UserStateContext } from "../../App";

// 프로젝트 목록 카드의 전체 틀
function Project() {
  const [formOpen, setFormOpen] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const userState = useContext(UserStateContext);
  const id = userState.user.id
  // 프로젝트 목록을 처음 읽어옴
  useEffect(() => {
    Api.get('projectlist', id)
      .then(res => setProjectList(res.data));
  }, [formOpen, id]);

  // 프로젝트 목록, 프로젝트 추가 하는 컴포넌트 반환
  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        {projectList && <ProjectList projectList={projectList}></ProjectList>}
        <div style={{ textAlign: "center" }}>
          <Card.Body><Button variant="primary" onClick={() => setFormOpen(true)}>+</Button></Card.Body>
        </div>
        {formOpen && <ProjectForm setFormOpen={setFormOpen}></ProjectForm>}
      </Card.Body>
    </Card>
  )
}
export default Project;