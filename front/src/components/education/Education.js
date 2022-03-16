import { useState } from 'react';
import EducationCard from './EducationCard';
import EducationForm from './EducationForm';
import { Button } from "react-bootstrap";

const Education = () => {
    
    // 확인용
    const [topics, setTopics] = useState([
        {id:1, school:'서울고등학교', major:'인문계', position:'재학 중'},
        {id:2, school:'서울대학교', major:'컴퓨터공학과', position:'학사 졸업'},
      ]);

    const [nextId, setNextId] = useState(3)
    const [visible, setVisible] = useState(false)

    const createHandler = (school, major,position) => {
        const copied = [...topics]
        const newTopic = {id: nextId, school, major, position}
        copied.push(newTopic)
        setTopics(copied)
        setNextId(nextId+1)

        console.log(copied)
    }


    // 추가 버튼 활성화/비활성화
    const clickHandler = () => {

        setVisible(!visible)
        console.log(visible)
        
    }

    

    return (
        <div style={{padding: 10,border:'2px blue solid'}}>
            <h5>학력</h5>
            <EducationCard topics={topics} />
            {visible ? <EducationForm
            topics={topics} onCreate={createHandler} clickHandler={clickHandler} /> : 
            <div style={{textAlign: 'center'}}>
                <Button size='sm' style={{ fontSize: 15,}} onClick={clickHandler}>추가</Button>
            </div>}
        </div>
    )
}

export default Education