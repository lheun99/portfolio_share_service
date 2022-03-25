import React, { useState } from "react";
import { Card, Button, ButtonGroup, Container, Row, Col, Modal } from "react-bootstrap";
import * as Api from '../../api';
import ProjectEdit from './ProjectEdit';

function ProjectElement({ project, isEditable, setProjectList, portfolioOwnerId, setLikes, isLiked }) {
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [check, setCheck] = useState(isLiked);

    const clickHandler = (e) => {
        e.preventDefault();
        setCheck(current => !current);
        Api.post('setlike', { user_id: portfolioOwnerId, project_id: project.id})
            .then((res) => {
                if (res.status === 201) {
                    setLikes(current => {
                        return { ...current, [res.data.project_id]: true }
                    })
                } else {
                    setLikes(current => {
                        const newList = { ...current };
                        delete newList[res.data.project_id];
                        return newList;
                    })
                }
            })
            .catch((err) => console.log(err.message));
    }

    const handleDelete = (e) => {
        e.preventDefault();
        Api.delete('projects', project.id);
        let del_idx = 0;
        setProjectList(current => {
            for (let i = 0; i < current.length; i++) {
                if (current[i].id === project.id) {
                    del_idx = i;
                    break;
                }
            }
            current.splice(del_idx, 1);
            const newProject = [...current];
            return newProject;
        })
        setShow(false)

    }

    return (
        edit ? <ProjectEdit title={project.title}
            description={project.description}
            link={project.link}
            from_date={project.from_date}
            to_date={project.to_date}
            setEdit={setEdit}
            id={project.id}
            setProjectList={setProjectList}></ProjectEdit> :
            <Container style={{padding: 10, margin:"10px 0", borderBottom: "rgba(70, 65, 65, 0.2) dotted"}}>
                <Row>
                    <Col>
                        <Card.Subtitle>{project.title}</Card.Subtitle>
                        <Card.Text className="text-muted">{project.description} <br /> {project.link && <a href={project.link}>{project.link}</a>} <br /> {project.from_date} ~ {project.to_date}</Card.Text>
                        <Card.Text style={{display:"flex", flexDirection:"row", alignItems:"center",justifyContent:"space-between",padding:16,}}>
                            <div>
                                <button onClick={clickHandler} style={{ border: "none", backgroundColor:"transparent" }}>
                                    <i className="fa-solid fa-heart" style={{ color: check ? "red" : "gray" }}/></button>
                                {project.likes}
                            </div>
                        </Card.Text>
                    </Col>
                    {isEditable && (
                        <Col sm={2} style={{margin:"auto"}}>
                            <ButtonGroup style={{margin: 10,}} size='sm'>
                                <Button variant="secondary" size="sm" onClick={() => setEdit(true)}><span className="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>edit</span></Button>
                                <Button variant="danger" size="sm" onClick={() => setShow(true)}><span className="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>delete</span></Button>
                            </ButtonGroup>
                            <Modal show={show} style={{zIndex:99999,}}>
                            <Modal.Header>
                            <Modal.Title>해당 내용을 삭제하시겠습니까?</Modal.Title>
                            </Modal.Header>
                            <br />
                            <Modal.Footer style={{justifyContent:"center"}}>
                            <Button variant="outline-danger" onClick={handleDelete}>
                                삭제
                            </Button>
                            <Button variant="outline-info" onClick={()=>setShow(false)}>
                                    취소
                                </Button>
                            </Modal.Footer>
                            </Modal>
                        </Col>
                    )}
                </Row>
            </Container>     
    )
}

export default ProjectElement;