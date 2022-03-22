import React, { useContext, useState } from "react";
import { Card, Button, ButtonGroup, Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from '../../api';
import { UserStateContext } from "../../App";

const CertificateEdit = ({ title, description, when_date, setEdit, id, setCertificateList }) => {
    const userState = useContext(UserStateContext);
    const [certificateInfo, setCertificateInfo] = useState({
        title:title,
        description:description,
        when_date:new Date(when_date),
    });

    const handleOnChange = (data, name) => {
        setCertificateInfo(current => ({
          ...current,
          [name] : data
        }))
    }
    // 프로젝트 편집 기능
    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            user_id: userState.user.id, title:certificateInfo.title, description: certificateInfo.description,
            when_date: certificateInfo.when_date.getFullYear() + '-' + (certificateInfo.when_date.getMonth() + 1) + '-' + certificateInfo.when_date.getDate(),
        }
        const res = await Api.put(`certificates/${id}`, data);

        setCertificateList(current => {
            const newCertificate = [...current];
            for (let i = 0; i < newCertificate.length; i++) {
                if (newCertificate[i].id === id) {
                    newCertificate[i] = {...res.data};
                    break;
                }
            }
            return newCertificate;
        });

        setEdit(false);
    }

    return (
        <Form style={{ margin: 10, padding: 10, }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    value={certificateInfo.title}
                    placeholder="프로젝트 제목"
                    autoComplete="off"
                    onChange={(e) => (handleOnChange(e.target.value, 'title'))}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                    type="text"
                    value={certificateInfo.description}
                    placeholder="상세내역"
                    autoComplete="off"
                    onChange={(e) => (handleOnChange(e.target.value, 'description'))} />
            </Form.Group>

            <Form.Group className="mt-3 row">
                <div className="col-auto">
                    <DatePicker selected={certificateInfo.when_date} onChange={date => (handleOnChange(date, 'when_date'))}></DatePicker>
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

    const handleDelete = async (e) => {
        e.preventDefault();
        await Api.delete('certificates', certificate.id);
        let del_idx = 0;
        setCertificateList(current => {
            for (let i = 0; i < current.length; i++) {
                if (current[i].id === certificate.id) {
                    del_idx = i;
                    break;
                }
            }
            current.splice(del_idx, 1);
            const newCertificate = [...current];
            return newCertificate;
        })
    }



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
                                <Button variant="outline-danger" size="sm" onClick={handleDelete}>삭제</Button>
                            </ButtonGroup>
                        </Col>
                    )}
                </Row>
            </Container>
        )
}

export default CertificateElement;