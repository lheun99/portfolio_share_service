import { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'

// + 버튼 클릭 시 나타나는 create 폼 컴포넌트
const EducationForm = (props) => {
    const [schoolInput, setSchoolInput] = useState('')
    const [majorInput, setMajorInput] = useState('')


    // school value 값 변경 함수
    const changeHandler1 = (e) => {
        e.preventDefault()
        setSchoolInput(e.target.value)
        console.log(schoolInput)
    }

    // major value 값 변경 함수
    const changeHandler2 = (e) => {
        e.preventDefault()
        setMajorInput(e.target.value)
        console.log(majorInput)
    }


    // create 폼 제출 시 값 전달 및 폼 내부 초기화 / 추가 버튼 활성화
    const submitHandler = (e) => {
        e.preventDefault()

        let s = e.target.school.value
        let m = e.target.major.value
        let p = e.target.group.value

        if (s && m && p) {
            props.onCreate(s,m,p)
            props.clickHandler()
            setSchoolInput('')
            setMajorInput('')
        }
    }

    return (
        <Form style={{margin:10, padding: 10,}} onSubmit={submitHandler}>
            <Form.Group className="mb-3">
                <Form.Control 
                    type="text" 
                    name='school' 
                    value={schoolInput} 
                    onChange={changeHandler1} 
                    placeholder='학교 이름' 
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control 
                    type='text' 
                    name='major' 
                    value={majorInput} 
                    onChange={changeHandler2} 
                    placeholder='전공' 
                />
            </Form.Group>

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
                label="석사졸업"
                value="석사졸업"
                name="group"
                type="radio"
                id="inline-radio-2"
            />
            <Form.Check
                inline
                label="학사졸업"
                value="학사졸업"
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
                <Button size='sm' variant="secondary" onClick={() => props.clickHandler()}>
                    취소
                </Button>
            </Col>
            </Form.Group>
        </Form>
    );
};

export default EducationForm