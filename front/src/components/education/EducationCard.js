import { Row, Col, Container, Card, Button,ButtonGroup } from "react-bootstrap";
import { useState } from 'react';
import EducationEditForm from './EducationEditForm';

// 학력 정보 조회 상세 값 컴포넌트
const EducationCard = ({value, editHandler, deleteHandler, isEditable}) => {
    const { id, school, major, position } = value;
    const [isEditing, SetIsEditing] = useState(false);

    const updateHandler = () => {
        SetIsEditing(!isEditing)
    };

    const handleDelete = (e) => {
        e.preventDefault()
        deleteHandler(id, e.target.value)
    }

    return (
        isEditing ? 
        <EducationEditForm 
            item={value} 
            editHandler={editHandler} 
            onUpdate={updateHandler}/> : 
        <Container style={{margin:10, padding: 10,}}>
            <Row>
                <Col sm={10}>
                    <Card.Subtitle>{school}</Card.Subtitle>
                    <Card.Text className="text-muted">{major +  ` (${position})`}</Card.Text>
                </Col>

                {isEditable ? 
                    <Col sm={2}>
                        <ButtonGroup style={{margin: 10,}} size='sm'>
                            <Button variant="outline-info" onClick={updateHandler}>편집</Button>
                            <Button variant="outline-danger" onClick={handleDelete}>삭제</Button>
                        </ButtonGroup>
                    </Col> : <></>}
            </Row>
        </Container>
        )
};

export default EducationCard;