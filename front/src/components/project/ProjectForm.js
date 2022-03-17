import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from '../../api';

import { UserStateContext } from "../../App";

function ProjectForm({ setFormOpen }) {
  const [title, setTitle] = useState('');
  const [prjbody, setPrjBody] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  const userState = useContext(UserStateContext);
  // 프로젝트 리스트에 프로젝트 추가
  function handleSubmit(e) {
    e.preventDefault();
    const data = { user_id: userState.user.id, title, description: prjbody, 
      from_date: startDate.getFullYear()+'-'+startDate.getMonth()+'-'+startDate.getDate(), 
      to_date: endDate.getFullYear()+'-'+endDate.getMonth()+'-'+endDate.getDate() 
    }
    Api.post('project/create', data);
    setFormOpen(false);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          value={title}
          placeholder="프로젝트 제목"
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
        <div className="col-auto">
          <DatePicker selected={endDate} onChange={date => setEndDate(date)}></DatePicker>
        </div>
      </Form.Group>
      <Form.Group style={{ textAlign: "center", marginTop: 10 }}>
        <Button variant="primary" type="submit" className="me-3 btn btn-primary">
          제출
        </Button>
        <Button variant="secondary" type="button" className="btn btn-secondary" onClick={() => setFormOpen(false)}>
          취소
        </Button>
      </Form.Group>

    </Form>
  );
}

export default ProjectForm;