import { Button,ButtonGroup } from "react-bootstrap";
import { useState } from 'react';
import EducationEdit from './EducationEdit';

// 학력 정보 조회 상세 값 컴포넌트
const EducationCard = ({value, editHandler, deleteHandler}) => {
    const { user_id, id, school, major, position } = value;
    const [isEditing, SetIsEditing] = useState(false);

    const updateHandler = () => {
        SetIsEditing(!isEditing)
    };

    const handleDelete = (e) => {
        e.preventDefault()
        deleteHandler(id, e.target.value)
    }

    return (
        isEditing ? <EducationEdit item={value} editHandler={editHandler} onUpdate={updateHandler}/> : 
        <div key={user_id} style={{margin: '10px 0', display: 'flex',justifyContent: 'space-between'}}>
            <article>
                <span style={{fontWeight:'bold'}}>{school}</span><br/>
                <span style={{color: '#6c757d'}}>{major +  ` (${position})`}</span>
            </article>
            <ButtonGroup style={{margin: 10,}} size='sm'>
                <Button variant="secondary" onClick={updateHandler}>수정</Button>
                <Button variant="danger" onClick={handleDelete}>삭제</Button>
            </ButtonGroup>
        </div>
        )
};

export default EducationCard;