import React, { useContext, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from '../../api';
import { UserStateContext } from "../../App";

// 각각의 프로젝트 리스트마다 편집창을 열고 닫고, 수정을 할 수 있도록 해주는 컴포넌트
function Editor({title, description, from_date, to_date, setEditOpen, id}) {
    const userState = useContext(UserStateContext);
    const [utitle, setUtitle] = useState(title);
    const [udescription, setUdescription] = useState(description);
    const [uFromDate, setUFromDate] = useState(new Date(from_date));
    const [uToDate, setUToDate] = useState(new Date(to_date));
    // 프로젝트 편집 기능
    function handleSubmit(e) {
        e.preventDefault();
        const data = { user_id: userState.user.id, title, description: udescription, 
                       from_date: uFromDate.getFullYear()+'-'+uFromDate.getMonth()+'-'+uFromDate.getDate(), 
                       to_date: uToDate.getFullYear()+'-'+uToDate.getMonth()+'-'+uToDate.getDate() 
                    }
        Api.put(`projects/${id}`, data)
            .then(res => console.log(res));
        setEditOpen(false);
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
                <div className="col-auto">
                    <DatePicker selected={uToDate} onChange={date => setUToDate(date)}></DatePicker>
                </div>
            </Form.Group>
            <Form.Group style={{ textAlign: "center", marginTop: 10 }}>
                <Button variant="primary" type="submit" className="me-3 btn btn-primary">
                    확인
                </Button>
                <Button variant="secondary" type="button" className="btn btn-secondary" onClick={() => setEditOpen(false)}>
                    취소
                </Button>
            </Form.Group>

        </Form>
        // <h1>123123</h1>
    )
}


// 각각의 프로젝트 리스트를 그려준다.

function ProjectEdit({project, id}) {
    console.log("asdasdasd " + id);
    const [editOpen, setEditOpen] = useState(false);
    return (
        <>
            {editOpen ? (<Editor title={project.title} 
                                 description={project.description} 
                                 from_date={project.from_date} 
                                 to_date={project.to_date} 
                                 setEditOpen={setEditOpen}
                                 id={id}></Editor>): (
            <>
            <Container>
                <Row>
                    <Col sm={11}>
                        <Card.Subtitle>{project.title}</Card.Subtitle>
                        <Card.Text className="mb-2 text-muted">{project.description} <br /> {project.from_date} ~ {project.to_date}</Card.Text>
                    </Col>
                    <Col sm={1}>
                        <Button variant="outline-info" size="sm" onClick={() => setEditOpen(true)}>편집</Button>
                        <Button variant="outline-danger" size="sm">삭제</Button>
                    </Col>
                </Row>
            </Container>
            <br />
            </>)}
        </>
    );
}

export default ProjectEdit;