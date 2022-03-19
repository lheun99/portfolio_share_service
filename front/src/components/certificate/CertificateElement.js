import React, { useContext, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, ButtonGroup, Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from '../../api';
import { UserStateContext } from "../../App";

function CertificateEdit({ title, description, when_date, setEdit, id, setCertificateList }) {
    const userState = useContext(UserStateContext);
    const [utitle, setUtitle] = useState(title);
    const [udescription, setUdescription] = useState(description);
    const [uWhenDate, setUWhenDate] = useState(new Date(when_date));
    console.log(uWhenDate);
    // 프로젝트 편집 기능
    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            user_id: userState.user.id, title:utitle, description: udescription,
            when_date: uWhenDate.getFullYear() + '-' + (uWhenDate.getMonth() + 1) + '-' + uWhenDate.getDate(),
        }
        await Api.put(`certificates/${id}`, data);

        const res = await Api.get('certificatelist', userState.user.id)
        setCertificateList(res.data);

        setEdit(false);
    }

    return (
        <Form style={{ margin: 10, padding: 10, }} onSubmit={handleSubmit}>
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
                    <DatePicker selected={uWhenDate} onChange={date => setUWhenDate(date)}></DatePicker>
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
    )
}

function CertificateElement({ certificate, isEditable, setCertificateList }) {
    const [edit, setEdit] = useState(false);
    return (
        edit ? <CertificateEdit title={certificate.title} 
                            description={certificate.description} 
                            when_date={certificate.when_date} 
                            setEdit={setEdit}
                            id={certificate.id}
                            setCertificateList={setCertificateList}></CertificateEdit> : 
            <Container style={{ margin: 10, padding: 10, }}>
                <Row>
                    <Col sm={10}>
                        <Card.Subtitle>{certificate.title}</Card.Subtitle>
                        <Card.Text className="mb-2 text-muted">{certificate.description} <br /> {certificate.when_date}</Card.Text>
                    </Col>
                    {isEditable && (
                        <Col sm={2}>
                            <ButtonGroup style={{margin: 10,}} size='sm'>
                                <Button variant="outline-info" size="sm" onClick={() => setEdit(true)}>편집</Button>
                                <Button variant="outline-danger" size="sm">삭제</Button>
                            </ButtonGroup>
                        </Col>
                    )}
                </Row>
            </Container>
        )
}

export default CertificateElement;