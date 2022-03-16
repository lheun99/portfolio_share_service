import { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

const EducationForm = (props) => {
    const [schoolInput, setSchoolInput] = useState('')
    const [majorInput, setMajorInput] = useState('')

    const changeHandler1 = (e) => {
        e.preventDefault()
        setSchoolInput(e.target.value)
        console.log(schoolInput)
    }

    const changeHandler2 = (e) => {
        e.preventDefault()
        setMajorInput(e.target.value)
        console.log(majorInput)
    }


    const submitHandler = (e) => {
        e.preventDefault()
        setSchoolInput('')
        setMajorInput('')

        let s = e.target.school.value
        let m = e.target.major.value
        let p = e.target.group1.value
        props.onCreate(s,m,p)

        props.clickHandler()
        


    }

    return (
        
        <Form style={{margin:10, padding: 10, borderRadius: 3, border: 'black 2px solid'}} onSubmit={submitHandler}>
        <Form.Group className="mb-3">
            <Form.Label>학교명</Form.Label>
            <Form.Control type="text" name='school' value={schoolInput} onChange={changeHandler1} placeholder='학교명을 입력해주세요' />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>전공명</Form.Label>
            <Form.Control type='text' name='major' value={majorInput} onChange={changeHandler2} placeholder='전공명을 입력해주세요' />
        </Form.Group>
        <div key={"inline-radio"} className="mb-3">
        <Form.Check
            inline
            label="재학 중"
            value="재학 중"
            name="group1"
            type="radio"
            id="inline-radio-1"
            onChange= {(e) => {console.log(e.target.label)}}
        />
        <Form.Check
            inline
            label="졸업 예정"
            value="졸업 예정"
            name="group1"
            type="radio"
            id="inline-radio-2"
            onChange= {(e) => {console.log(e.target.value)}}
        />
        <Form.Check
            inline
            label="학사 졸업"
            value="학사 졸업"
            name="group1"
            type="radio"
            id="inline-radio-3"
            onChange= {(e) => {console.log(e.target.value)}}
        />
        <Form.Check
            inline
            label="박사 졸업"
            value="박사 졸업"
            name="group1"
            type="radio"
            id="inline-radio-4"
            onChange= {(e) => {console.log(e.target.value)}}
        />
        </div>

        <Button size='sm' variant="primary" type="submit">
            확인
        </Button>
        <Button size='sm' variant="danger" onClick={() => props.clickHandler()}>
            취소
        </Button>
        </Form>
    )
}

export default EducationForm