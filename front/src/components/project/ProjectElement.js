import React, { useContext, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, ButtonGroup, Container, Row, Col, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from '../../api';
import { UserStateContext } from "../../App";

const ProjectEdit = ({ title, description, link, from_date, to_date, setEdit, id, setProjectList }) => {
    const userState = useContext(UserStateContext);
    // 프로젝트 편집 기능

    const [projectInfo, setProjectInfo] = useState({
        title:title,
        description:description,
        from_date:new Date(from_date),
        to_date:new Date(to_date),
        link:link
    })

    const handleOnChange = (data, name) => {
        setProjectInfo(current => ({
          ...current,
          [name] : data
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (projectInfo.title === '') {
            alert('제목을 입력하세요.');
            return;
        }
        else if (projectInfo.description === '') {
            alert('상세내역을 입력하세요');
            return;
        }
        else if (!(projectInfo.from_date < projectInfo.to_date)) {
            alert('옳지않은 기간입니다. 다시 입력하세요.');
            return;
        }
        const data = { user_id: userState.user.id, title:projectInfo.title, description:projectInfo.description, link:projectInfo.link,
            from_date: projectInfo.from_date.getFullYear()+'-'+(projectInfo.from_date.getMonth()+1)+'-'+projectInfo.from_date.getDate(), 
            to_date: projectInfo.to_date.getFullYear()+'-'+(projectInfo.to_date.getMonth()+1)+'-'+projectInfo.to_date.getDate() 
          }
        

        const res = await Api.put(`projects/${id}`, data);

        setProjectList(current => {
            const newProject = [...current];
            for (let i = 0; i < newProject.length; i++) {
                if (newProject[i].id === id) {
                    newProject[i] = {...res.data};
                    break;
                }
            }
            return newProject;
        });
        setEdit(false);
    }

    return (
        <Form style={{ margin: 10, padding: 10, }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    value={projectInfo.title}
                    placeholder="프로젝트 제목"
                    autoComplete="off"
                    onChange={(e) => (handleOnChange(e.target.value, 'title'))}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                    type="text"
                    value={projectInfo.description}
                    placeholder="상세내역"
                    autoComplete="off"
                    onChange={(e) => (handleOnChange(e.target.value, 'description'))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                    type="text"
                    value={projectInfo.link}
                    placeholder="프로젝트 링크"
                    autoComplete="off"
                    onChange={(e) => (handleOnChange(e.target.value, 'link'))} />
            </Form.Group>

            <Form.Group className="mt-3 row">
                <div className="col-auto">
                    <DatePicker selected={projectInfo.from_date} onChange={date => (handleOnChange(date, 'from_date'))}></DatePicker>
                </div>
                <div className="col-auto">
                    <DatePicker selected={projectInfo.to_date} onChange={date => (handleOnChange(date, 'to_date'))}></DatePicker>
                </div>
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                    <Button size='sm' variant="primary" type="submit" className="me-3 btn btn-primary">
                        확인
                    </Button>
                    <Button size='sm' variant="secondary" type="button" className="btn btn-secondary" onClick={() => setEdit(false)}>
                        취소
                    </Button>
                </Col>
            </Form.Group>

        </Form>
        // <h1>123123</h1>
    )
}

function ProjectElement({ project, isEditable, setProjectList, portfolioOwnerId }) {
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false)
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
                    <Col sm={10} style={{margin:"auto"}}>
                        <Card.Subtitle>{project.title}</Card.Subtitle>
                        <Card.Text className="text-muted">{project.description} <br /> {project.link && <a href={project.link}>{project.link}</a>} <br /> {project.from_date} ~ {project.to_date}</Card.Text>
                    </Col>
                    {isEditable && (
                        <Col sm={2} style={{margin:"auto"}}>
                            <ButtonGroup style={{margin: 10,}} size='sm'>
                                <Button variant="outline-info" size="sm" onClick={() => setEdit(true)}><span class="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>edit</span></Button>
                                <Button variant="outline-danger" size="sm" onClick={() => setShow(true)}><span class="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>delete</span></Button>
                            </ButtonGroup>
                            <Modal show={show}>
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