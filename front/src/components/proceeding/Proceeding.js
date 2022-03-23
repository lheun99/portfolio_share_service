import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ProceedingForm from './ProceedingForm';
import * as Api from '../../api';
import TodoListAdd from './TodoListAdd';

const Proceeding = ({ portfolioOwnerId, isEditable }) => {
    const [isForm, setIsForm] = useState(false);

    const [proceedingList, setProceedingList] = useState([]);

    useEffect(() => {
        Api.get('proceedinglist', portfolioOwnerId)
            .then(res => setProceedingList(res.data));
    }, [portfolioOwnerId]);

    return (
        <>
            {isEditable ? (
                <>  
                    {!isForm && <Button variant="primary" onClick={() => setIsForm(true)}>프로젝트 추가</Button>}
                    {proceedingList.map((proceeding, index) => (
                        <TodoListAdd key={index} proceeding={proceeding} setProceedingList={setProceedingList} isEditable={isEditable}></TodoListAdd>
                    ))}
                    {isForm && <ProceedingForm setIsForm={setIsForm} portfolioOwnerId={portfolioOwnerId} setProceedingList={setProceedingList}/>}
                </>
            ) : (
                <>
                    {proceedingList.map((proceeding, index) => (
                        <TodoListAdd key={index} proceeding={proceeding} setProceedingList={setProceedingList} isEditable={isEditable}></TodoListAdd>
                    ))}
                </>
            )}
        </>
    )
}

export default Proceeding;