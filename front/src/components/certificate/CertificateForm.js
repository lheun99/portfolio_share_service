import React, { useContext, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from '../../api';

import { UserStateContext } from "../../App";

const CertificateForm = ({ setIsEditing, setCertificateList, portfolioOwnerId  }) => {
  const [title, setTitle] = useState('');
  const [prjbody, setPrjBody] = useState('');

  const [startDate, setStartDate] = useState(new Date());


  const userState = useContext(UserStateContext);
  // 프로젝트 리스트에 프로젝트 추가
  async function handleSubmit(e) {
    e.preventDefault();
    const data = { user_id: userState.user.id, title, description: prjbody, 
      when_date: startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate(), 
    }
    await Api.post('certificate/create', data);
    const res = await Api.get('certificatelist', portfolioOwnerId)
    setCertificateList(res.data);
    setIsEditing(false);
  }

  return (
    <Form style={{ margin: 10, padding: 10, }} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          value={title}
          placeholder="자격증"
          autoComplete="off"
          onChange={(e) => { setTitle(e.target.value) }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="text"
          value={prjbody}
          placeholder="상세내역"
          autoComplete="off"
          onChange={(e) => { setPrjBody(e.target.value) }} />
      </Form.Group>

      <Form.Group className="mt-3 row">
        <div className="col-auto">
          <DatePicker selected={startDate} onChange={date => setStartDate(date)}></DatePicker>
        </div>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button size= "sm" variant="primary" type="submit" className="me-3 btn btn-primary">
            확인
          </Button>
          <Button size= "sm" variant="secondary" type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>  
      </Form.Group>
    </Form>
  );
}

export default CertificateForm;