import { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";

// 편집 버튼 클릭 시 나타나는 수정용 form
const CareerEdit = ({ item, onUpdate, editHandler }) => {
  const { user_id, id,company, job_position, achievement, from_date, to_date } = item;

  const [radioCheck, setRadioCheck] = useState(false)
  const [careerInfo, setCareerInfo] = useState({item})

  const handleOnChange = (data, name) => {
    setCareerInfo(current => ({
      ...current,
      [name] : data
    }))
  }



  // 폼 제출 시 값 update 함수
  const submitHandler = (e) => {
    e.preventDefault();

    let s = e.target.school.value;
    let m = e.target.major.value;
    let p = e.target.group1.value;

    // 폼 입력 값이 모두 존재할 때, Education 컴포넌트에서 받아온 PUT 요청 함수와 EducationCard에서 받아온 수정 form hide 처리용 함수를 실행
    if (s && m && p) {
      editHandler(user_id, id, s, m, p);
      onUpdate();
    };

  };

  return (
    <Form style={{ margin: 10, padding: 10, }} onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name='company'
          value={careerInfo.company}
          onChange={(e) => handleOnChange(e.target.value, 'company')}
          placeholder='회사 이름'
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type='text'
          name='job_positon'
          value={careerInfo.job_positon}
          onChange={(e) => handleOnChange(e.target.value, 'job_position')}
          placeholder='회사 직위 (직책, 근무 부서 등)'
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type='text'
          name='achievement'
          value={careerInfo.achievement}
          onChange={(e) => handleOnChange(e.target.value, 'achievement')}
          placeholder='담당 업무'
        />
      </Form.Group>
      

      <Form.Group className="mt-3 row">
        <div className="col-auto">
          <DatePicker selected={careerInfo.from_date} onChange={date => (handleOnChange(date, 'from_date'))}></DatePicker>
        </div> 
        <div className="col-auto">
          <DatePicker disabled={radioCheck} selected={radioCheck ? null : careerInfo.to_date} onChange={date => (handleOnChange(date, 'to_date'))}></DatePicker>
        </div>
        <Col style={{margin:"auto",}}>
          <Form.Check 
            type="switch"
            id="custom-switch"
            label="재직중"
            onChange={(e) => setRadioCheck(!radioCheck)}
            checked={radioCheck}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button size='sm' variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button size='sm' variant="secondary" onClick={onUpdate}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  )
};

export default CareerEdit;