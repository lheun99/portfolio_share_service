import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// 수정 버튼 클릭 시 나타나는 update용 form
const EducationEdit = ({ item, onUpdate, handleChanger }) => {
    const { user_id, id, school, major, position } = item;
    const [schoolInput, setSchoolInput] = useState(school);
    const [majorInput, setMajorInput] = useState(major);
    const [checking, setChecking]  = useState(position);



    const checkHandler = (e) => {
        e.preventDefault()
        setChecking(e.target.value)
    };



    // school value 값 수정 함수
    const changeHandler1 = (e) => {
        e.preventDefault()
        setSchoolInput(e.target.value)
        console.log(schoolInput)
    };

    // major value 값 수정 함수
    const changeHandler2 = (e) => {
        e.preventDefault()
        setMajorInput(e.target.value)
        console.log(majorInput)
    };



    // 폼 제출 시 값 update 함수
    const submitHandler = (e) => {
        e.preventDefault()

        let s = e.target.school.value
        let m = e.target.major.value
        let p = e.target.group1.value
        
        if (s && m && p) {
            handleChanger(user_id, id, s, m, p)
            onUpdate()
        }

    };

    return (
        <Form style={{margin:10, padding: 10,}} onSubmit={submitHandler}>
        <Form.Group className="mb-3">
            {/* <Form.Label>학교명</Form.Label> */}
            <Form.Control type="text" name='school' value={schoolInput} onChange={changeHandler1} placeholder='학교명' />
        </Form.Group>

        <Form.Group className="mb-3">
            {/* <Form.Label>전공명</Form.Label> */}
            <Form.Control type='text' name='major' value={majorInput} onChange={changeHandler2} placeholder='전공명' />
        </Form.Group>
        
        <div key={id} className="mb-3">
        <Form.Check
            inline
            label="재학중"
            value="재학중"
            name="group1"
            type="radio"
            id="inline-radio-1"
            checked={ checking === "재학중" ? true : false }
            onChange= {checkHandler}

        />
        <Form.Check
            inline
            label="석사졸업"
            value="석사졸업"
            name="group1"
            type="radio"
            id="inline-radio-2"
            checked={ checking === "석사졸업" ? true : false }
            onChange= {checkHandler}
        />
        <Form.Check
            inline
            label="학사졸업"
            value="학사졸업"
            name="group1"
            type="radio"
            id="inline-radio-3"
            checked={ checking === "학사졸업" ? true : false }
            onChange= {checkHandler}

        />
        <Form.Check
            inline
            label="박사졸업"
            value="박사졸업"
            name="group1"
            type="radio"
            id="inline-radio-4"
            checked={ checking === "박사졸업" ? true : false }
            onChange= {checkHandler}
        />
        </div>
        <div style={{textAlign: "center"}}>
            <Button size='sm' variant="primary" type="submit" style={{marginRight:8,}}>
                확인
            </Button>
            <Button size='sm' variant="danger" onClick={onUpdate} style={{marginLeft:8,}}>
                취소
            </Button>
        </div>
        </Form>
    )
};

export default EducationEdit;