import { useContext, useState, useEffect } from 'react';
import EducationCardList from './EducationCardList';
import EducationForm from './EducationForm';
import { Button } from "react-bootstrap";
import * as Api from '../../api';
import { UserStateContext } from '../../App';

// 최상위 컴포넌트
const Education = () => {

    const [visible, setVisible] = useState(false);
    const [topics, setTopics] = useState([]);
    const userState = useContext(UserStateContext);
    
    // user_id 값
    const userId = userState.user.id;

    useEffect(() => {
        Api.get('educationlist', userId)
            .then(res => {
                setTopics(res.data)
        });
    }, [visible, userId]);

    // 추가 가능 구현 함수 (EducationCardList에 추가할 값 post로 요청)
    const createHandler = (school, major, position) => {
        const newTopic = {user_id: userId, school, major, position}
        Api.post('education/create', newTopic)
    };

    // "+"" 버튼 활성화 및 비활성화 함수
    const clickHandler = () => {
        setVisible(!visible)
        console.log(visible)
    }

    // 수정 기능 구현 함수
    const editHandler = (user_id, id, school, major, position) => {

        const editTopic = { user_id, id, school, major, position }
        Api.put(`educations/${id}`, editTopic)
            .then(res => console.log(res.data))
        
        const mapped = topics.map((v) => {
            if (v.id === id) {
                return { ...v, school, major, position }
            }
            else {
                return { ...v}
            }
        })
        console.log(mapped)
        setTopics(mapped)
    }

    // 삭제 기능 구현 함수
    const deleteHandler = (id,value) => {
        Api.delete(`educations/${id}`, value).then(res => console.log(res.data))
        const filtered = topics.filter((v) => v.id !== id)
        setTopics(filtered)
    }

    

    return (
        <div style={{padding:5,border: "1px solid lightgrey", borderRadius: "3px"}}>
            <h5>학력</h5>
            <EducationCardList topics={topics} editHandler={editHandler} deleteHandler={deleteHandler} />
            {visible ? <EducationForm
            topics={topics} onCreate={createHandler} clickHandler={clickHandler} /> : 
            <div style={{textAlign: 'center'}}>
                <Button size='sm' style={{ fontSize: 15,}} onClick={clickHandler}>+</Button>
            </div>}
        </div>
    )
}

export default Education