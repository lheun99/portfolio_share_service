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
        props.onCreate(s,m)

        props.clickHandler()
        


    }

    return (
        
        <Form style={{margin:10, padding: 10, borderRadius: 3, border: 'black 2px solid'}} onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>학교명</Form.Label>
            <Form.Control type="text" name='school' value={schoolInput} onChange={changeHandler1} placeholder='학교명을 입력해주세요' />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>전공명</Form.Label>
            <Form.Control type='text' name='major' value={majorInput} onChange={changeHandler2} placeholder='전공명을 입력해주세요' />
        </Form.Group>
        <Button size='sm' variant="primary" type="submit">
            확인
        </Button>
        <Button size='sm' variant="danger" onClick={() => props.clickHandler()}>
            취소
        </Button>
        </Form>




        // <form onSubmit={submitHandler}>
        //     학교: <input type='text' name='school' value={schoolInput} onChange={changeHandler1} placeholder='학교명을 입력해주세요'></input>
        //     전공: <input type='text' name='major' value={majorInput} onChange={changeHandler2} placeholder='전공명을 입력해주세요'></input>    
        //     <input type='submit' value='추가'></input>
        // </form>
    )
}

export default EducationForm