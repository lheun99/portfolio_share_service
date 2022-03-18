import React, { useContext, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from '../../api';
import { UserStateContext } from "../../App";

function CertificateEdit({ title, description, from_date, to_date, setEdit, id, setProjectList }) {
    // console.log(id);
    const userState = useContext(UserStateContext);
    const [utitle, setUtitle] = useState(title);
    const [udescription, setUdescription] = useState(description);
    const [uFromDate, setUFromDate] = useState(new Date(from_date));
    // 프로젝트 편집 기능
    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            user_id: userState.user.id, title, description: udescription,
            from_date: uFromDate.getFullYear() + '-' + (uFromDate.getMonth() + 1) + '-' + uFromDate.getDate(),
        }
        await Api.put(`certificates/${id}`, data);

        const res = await Api.get('certificatelist', userState.user.id)
        setProjectList(res.data);

        setEdit(false);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    value={utitle}
                    placeholder="프로젝트 제목"
                    autoComplete="off"
                    onChange={(e) => { setUtitle(e.target.value) }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                    type="text"
                    value={udescription}
                    placeholder="상세내역"
                    autoComplete="off"
                    onChange={(e) => { setUdescription(e.target.value) }} />
            </Form.Group>

            <Form.Group className="mt-3 row">
                <div className="col-auto">
                    <DatePicker selected={uFromDate} onChange={date => setUFromDate(date)}></DatePicker>
                </div>
            </Form.Group>
            <Form.Group style={{ textAlign: "center", marginTop: 10 }}>
                <Button variant="primary" type="submit" className="me-3 btn btn-primary">
                    확인
                </Button>
                <Button variant="secondary" type="button" className="btn btn-secondary" onClick={() => setEdit(false)}>
                    취소
                </Button>
            </Form.Group>

        </Form>
        // <h1>123123</h1>
    )
}

function ProjectElement({ project, isEditable, setProjectList }) {
    const [edit, setEdit] = useState(false);
    return (
        <Container>
            <Row>
                {edit ? <CertificateEdit title={project.title} 
                                 description={project.description} 
                                 from_date={project.from_date} 
                                 to_date={project.to_date} 
                                 setEdit={setEdit}
                                 id={project.id}
                                 setProjectList={setProjectList}></CertificateEdit> : (
                    <>
                        <Col sm={11}>
                            <Card.Subtitle>{project.title}</Card.Subtitle>
                            <Card.Text className="mb-2 text-muted">{project.description} <br /> {project.from_date} ~ {project.to_date}</Card.Text>
                        </Col>
                        {isEditable && (
                            <Col sm={1}>
                                <Button variant="outline-info" size="sm" onClick={() => setEdit(true)}>편집</Button>
                                <Button variant="outline-danger" size="sm">삭제</Button>
                            </Col>
                        )}
                    </>
                )}
            </Row>
        </Container>
    )
}

export default CertificateEdit;