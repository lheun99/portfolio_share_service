import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Modal, ButtonGroup } from "react-bootstrap";
import * as Api from '../../api';
import "./proceeding.css";
import TodoEdit from './TodoEdit';

const WorkItem = ({ workitem, setPercent, itemLength, index, setWorkItemList, isEditable }) => {
    const [check, setCheck] = useState();
    const [todoEdit, setTodoEdit] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setCheck(workitem.finish);
    }, [workitem])

    useEffect(() => {
        setWorkItemList((current) => {
            const newList = [...current];
            newList[index].finish = check;
            return newList;
        })

        return () => {
            setShow(false)
        }
    }, [check, setWorkItemList, index]);

    const handleCheck = (e) => {
        if (check === true) {
            setPercent(current => current - (100 / itemLength))
            setCheck(current => !current);
        }
        else if (check === false) {
            setPercent(current => current + (100 / itemLength))
            setCheck(current => !current);
        }
        const data = {todo:workitem.todo, finish:!workitem.finish}
        Api.put(`todo/${workitem.id}`, data);

        setTodoEdit(false);
    }
    const handleDelete = async () => {
        await Api.delete('todo', workitem.id);
        let del_idx = 0;
        
        setWorkItemList(current => {
            for (let i = 0; i < current.length; i++) {
                if (current[i].id === workitem.id) {
                    del_idx = i;
                    break;
                }
            }
            current.splice(del_idx, 1);
            const newTodo = [...current];
            return newTodo;
        })
        

        setShow(false);
    }

    return (
        <>
            {todoEdit ? <TodoEdit setTodoEdit={setTodoEdit} workitem={workitem} setWorkItemList={setWorkItemList}></TodoEdit> : (<Form>
            <Row style={{marginTop:10}}>
                <Col sm={9}>
                    <Form.Text className={check ? "checked" : undefined}>
                        {workitem.todo}
                    </Form.Text>
                </Col>
                <Col sm={3}>
                <ButtonGroup style={{ margin: 10, }} size='sm'>
                    {isEditable && (
                        <Button
                            variant="success"
                            size="sm"
                            onClick={handleCheck}
                            >
                            <span className="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>done</span>
                        </Button>
                    )}
                    {isEditable && (
                        <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setTodoEdit(true)}
                        >
                        <span className="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>edit</span>
                        </Button>
                    )}
                    {isEditable && (
                        <>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => setShow(true)}
                        >
                            <span className="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>delete</span>
                        </Button>
                        <Modal
                            show={show}
                            style={{zIndex:99999,}}
                        >
                        <Modal.Header>
                        <Modal.Title>해당 내용을 삭제하시겠습니까?</Modal.Title>
                        </Modal.Header>
                        <br />
                        <Modal.Footer style={{justifyContent:"center"}}>
                        <Button variant="danger" onClick={handleDelete}>
                            삭제
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={()=>setShow(false)}
                        >
                                취소
                            </Button>
                        </Modal.Footer>
                        </Modal>
                        </>
                    )}
                </ButtonGroup>

                </Col>
            </Row>
        </Form>)}
        </>
    )
}

export default WorkItem;