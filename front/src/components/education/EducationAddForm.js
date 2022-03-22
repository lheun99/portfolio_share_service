import { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

// + 버튼 클릭 시 나타나는 create 폼 컴포넌트
const EducationForm = ({ onCreate, clickHandler }) => {
  const [schoolInput, setSchoolInput] = useState('');
  const [majorInput, setMajorInput] = useState('');
  
  const [selectUniv, setSelectUniv] = useState('');
  const [selectMajor, setSelectMajor] = useState('');

  // school value 값 변경 함수
  const changeHandler1 = (e) => {
    e.preventDefault();
    setSchoolInput(e.target.value);
    setSelectUniv('');
  }

  const handleSelectUniv = (e) => {
    e.preventDefault();
    setSelectUniv(e.target.value);
    setSchoolInput(e.target.value)
  }

  // major value 값 변경 함수
  const changeHandler2 = (e) => {
    e.preventDefault();
    setMajorInput(e.target.value);
    setSelectMajor('');
  }

  const handleSelectMajor = (e) => {
    e.preventDefault();
    setSelectMajor(e.target.value);
    setMajorInput(e.target.value)
  }


  // 추가 기능 함수
  const submitHandler = (e) => {
    e.preventDefault();

    let s = e.target.school.value;
    let m = e.target.major.value;
    let p = e.target.group.value;

    // 입력값이 모두 존재할 때, create 폼 제출 및 값 POST 요청, 폼 내부 초기화, "+" 버튼 show 처리
    if (s && m && p) {
      onCreate(s, m, p);
      clickHandler();
      setSchoolInput('');
      setMajorInput('');
    };
  };

  return (
    <Form style={{ margin: 10, padding: 10, }} onSubmit={submitHandler}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name='school'
              value={schoolInput}
              onChange={changeHandler1}
              placeholder='학교 이름'
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Select className="mb-3" value={selectUniv} onChange={handleSelectUniv}>
            <option value="">선택</option>
            <option>서울대학교</option>
            <option>연세대학교</option>
            <option>고려대학교</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control
              type='text'
              name='major'
              value={majorInput}
              onChange={changeHandler2}
              placeholder='전공'
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Select className="mb-3" value={selectMajor} onChange={handleSelectMajor}>
                <option value="">선택</option>
                <option>전자전기공학과</option>
                <option>컴퓨터공학과</option>
                <option>물리학과</option>
          </Form.Select>
        </Col>
      </Row>

      <div key={"inline-radio"} className="mb-3">
        <Form.Check
          inline
          label="재학중"
          value="재학중"
          name="group"
          type="radio"
          id="inline-radio-1"
        />
        <Form.Check
          inline
          label="학사졸업"
          value="학사졸업"
          name="group"
          type="radio"
          id="inline-radio-2"
        />
        <Form.Check
          inline
          label="석사졸업"
          value="석사졸업"
          name="group"
          type="radio"
          id="inline-radio-3"
        />
        <Form.Check
          inline
          label="박사졸업"
          value="박사졸업"
          name="group"
          type="radio"
          id="inline-radio-4"
        />
      </div>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button size='sm' variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button size='sm' variant="secondary" onClick={() => clickHandler()}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default EducationForm;