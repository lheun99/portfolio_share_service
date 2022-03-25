import React, { useState, useEffect, useMemo, useContext } from "react";
import { Row, Col, Button, Card, ProgressBar, Form, Container, Modal, ButtonGroup } from "react-bootstrap";
import * as Api from '../../api';
import { UserStateContext } from "../../App";
import ProceedingEdit from './ProceedingEdit';
import "./proceeding.css";

import TodoEdit from './TodoEdit';

const TodoAddForm = ({ setAdd, proceeding, setWorkItemList }) => {
    const [work, setWork] = useState('');
    const userState = useContext(UserStateContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (work === '') {
            alert('할 일을 입력하세요.');
            return;
        }

        const data = {
            user_id: userState.user.id,
            proceeding_id: proceeding.id,
            todo: work,
            finish: false
        }
        const res = await Api.post('todo/create', data);

        setWorkItemList(current => {
            const newTodo = [...current];
            newTodo.push(res.data);
            return newTodo;
        })
        setAdd(false);

    }

    return (
        <Form style={{ margin: 10, padding: 10}} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    value={work}
                    placeholder="할 일"
                    autoComplete="off"
                    onChange={(e) => setWork(e.target.value)}
                />
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                    <Button size='sm' variant="primary" type="submit" className="me-3 btn btn-primary">
                        확인
                    </Button>
                    <Button size='sm' variant="secondary" type="button" className="btn btn-secondary" onClick={() => setAdd(false)}>
                        취소
                    </Button>
                </Col>
            </Form.Group>

        </Form>
    )
}

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
                        <Button variant="outline-danger" onClick={handleDelete}>
                            삭제
                        </Button>
                        <Button
                            variant="outline-info"
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

const TodoListAdd = ({ proceeding, setProceedingList, isEditable }) => {
    const [isWork, setIsWork] = useState(false);
    const [add, setAdd] = useState(false);
    const [workItemList, setWorkItemList] = useState([]);
    const [percent, setPercent] = useState(0);
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false)

    const handleDelete = async () => {
        await Api.delete('proceedingtodo', proceeding.id);
        await Api.delete('proceedings', proceeding.id);
        let del_idx = 0;
        setProceedingList(current => {
            for (let i = 0; i < current.length; i++) {
                if (current[i].id === proceeding.id) {
                    del_idx = i;
                    break;
                }
            }
            current.splice(del_idx, 1);
            const newProceeding = [...current];
            return newProceeding;
        })
        setWorkItemList([]);

        setShow(false);
    }

    useEffect(() => {
        Api.get('todolist', proceeding.id)
            .then(res => {
                setWorkItemList(res.data)
            });
        return () => {
            setShow(false);
        }
    }, [proceeding.id])

    const itemLength = useMemo(() => {
        return workItemList.length;
    }, [workItemList]);
    useEffect(() => {
        let count = 0;
        for (let i = 0; i < workItemList.length; i++) {
            if (workItemList[i].finish === true) {
                count += 1;
            }
        }
        setPercent(0 + (100 / workItemList.length) * count);
    }, [workItemList])

    return (
        <>
            <Container style={{padding: 10, margin:"10px 0", borderBottom: "rgba(70, 65, 65, 0.2) dotted"}}>
                <Row>
                    {edit ? <ProceedingEdit proceeding={proceeding} setEdit={setEdit} setProceedingList={setProceedingList}></ProceedingEdit> : (
                        <>
                            <Col sm={9}>
                                <Card.Subtitle>{percent === 100 ? `${proceeding.title}(완료)` : proceeding.title}</Card.Subtitle>
                                <Card.Text className="text-muted">{`${proceeding.start_date} ~ ${proceeding.end_date}`}</Card.Text>
                            </Col>
                            <Col sm={3}>
                                <ButtonGroup style={{ margin: 10, }} size='sm'>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => setIsWork(current => !current)}
                                    >
                                        <span className="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>library_add_check</span>
                                    </Button>
                                    {isEditable && (
                                        <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => setEdit(true)}
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
                                        <Button variant="outline-danger" onClick={handleDelete}>
                                            삭제
                                        </Button>
                                        <Button
                                            variant="outline-info"
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
                        </>
                    )}
                </Row>
                <ProgressBar style={{ marginTop: 10 }} animated now={percent} label={`${percent}%`} variant={percent === 100 ? "success" : ""} />
                {isWork ? <> {workItemList.length > 0 ? workItemList.map((workitem, index) => <WorkItem key={index} workitem={workitem} setPercent={setPercent} itemLength={itemLength} index={index} setWorkItemList={setWorkItemList} isEditable={isEditable}></WorkItem>) :
                    <div style={{ textAlign: "center", marginTop: 10 }}>
                        <p>할 일이 없습니다.</p>
                    </div>}
                    {add && <TodoAddForm setAdd={setAdd} proceeding={proceeding} setWorkItemList={setWorkItemList}></TodoAddForm>}
                    <div style={{ textAlign: "center", marginTop: 10 }}><Card.Body>{isEditable && <Button size='sm' variant="secondary" style={{borderRadius:100,}} onClick={() => setAdd(true)}>+</Button>}</Card.Body></div></> : <></>}
            </Container>
        </>
    )
}

export default TodoListAdd;
