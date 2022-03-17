import { useContext, useState, useEffect } from 'react';
import EducationCardList from './EducationCardList';
import EducationForm from './EducationForm';
import { Button } from "react-bootstrap";
import * as Api from '../../api'
import { UserStateContext } from '../../App'



const Education = () => {

    const [visible, setVisible] = useState(false);
    const [topics, setTopics] = useState([]);
    const userState = useContext(UserStateContext);
    const userId = userState.user.id

    useEffect(() => {
        Api.get('educationlist', userId)
            .then(res => {
                setTopics(res.data)
        });
    }, [visible, userId])

    // EducationCard에 추가할 값 push
    const createHandler = (school, major, position) => {
        const newTopic = {user_id: userId, school, major, position}
        Api.post('education/create', newTopic)
    }



    // 추가 버튼 활성화 및 비활성화
    const clickHandler = () => {

        setVisible(!visible)
        console.log(visible)
        
    }

    const handleChanger = (user_id, id, school, major, position) => {

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

    

    return (
        <div style={{padding:5,border: "1px solid lightgrey", borderRadius: "3px"}}>
            <h5>학력</h5>
            <EducationCardList topics={topics} handleChanger={handleChanger} />
            {visible ? <EducationForm
            topics={topics} onCreate={createHandler} clickHandler={clickHandler} /> : 
            <div style={{textAlign: 'center'}}>
                <Button size='sm' style={{ fontSize: 15,}} onClick={clickHandler}>+</Button>
            </div>}
        </div>
    )
}

export default Education