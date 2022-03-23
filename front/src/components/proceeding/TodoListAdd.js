import React, { useState, useEffect, useMemo, useContext } from "react";
import { Row, Col, Button, Card, ProgressBar, Form } from "react-bootstrap";
// import DatePicker from "react-datepicker";
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
        <Form style={{ margin: 10, padding: 10, }} onSubmit={handleSubmit}>
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
    const [check, setCheck] = useState(workitem.finish);
    const [todoEdit, setTodoEdit] = useState(false);
    useEffect(() => {
        setWorkItemList((current) => {
            const newList = [...current];
            newList[index].finish = check;
            return newList;
        })
    }, [check, setWorkItemList, index]);

    const handleCheck = (e) => {
        if (e.target.defaultChecked === true) {
            setPercent(current => current - (100 / itemLength))
            setCheck(current => !current);
        }
        else if (e.target.defaultChecked === false) {
            setPercent(current => current + (100 / itemLength))
            setCheck(current => !current);
        }
        console.log(workitem);
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
                <Col sm={1}>
                    <Form.Check
                        type='checkbox'
                        id='finish-checkbox'
                        label='완료'
                        defaultChecked={check}
                        disabled={!isEditable}
                        onClick={handleCheck}
                    />
                </Col>
                {isEditable && (
                        <>
                            <Col sm={1}>
                                <Button variant="outline-info" onClick={() => setTodoEdit(true)} size="sm">편집</Button>
                            </Col>
                            <Col sm={1}><Button variant="danger" size="sm" onClick={handleDelete}>삭제</Button></Col>
                        </>
                )}
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

    const handleDelete = async () => {
        await Api.delete('proceeding', proceeding.id);
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
    }

    useEffect(() => {
        Api.get('todolist', proceeding.id)
            .then(res => {
                setWorkItemList(res.data)
            });
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
            <Card>
                <Card.Body>
                    <Row>
                        {edit ? <ProceedingEdit proceeding={proceeding} setEdit={setEdit} setProceedingList={setProceedingList}></ProceedingEdit> : (
                            <>
                                <Col sm={9}>
                                    <Card.Title>{percent === 100 ? `${proceeding.title}(완료)` : proceeding.title}</Card.Title>
                                    <Card.Text>{`${proceeding.start_date} ~ ${proceeding.end_date}`}</Card.Text>
                                </Col>
                                {isEditable &&<Col sm={1}><Button variant="info" onClick={() => setEdit(true)}>편집</Button></Col>}
                                <Col sm={1}><Button variant="info" onClick={() => setIsWork(current => !current)}>할일</Button></Col>
                                {isEditable && <Col sm={1}><Button variant="danger" onClick={handleDelete}>삭제</Button></Col>}
                            </>
                        )}
                    </Row>
                    <ProgressBar style={{ marginTop: 10 }} animated now={percent} label={`${percent}%`} variant={percent === 100 ? "success" : ""} />
                    {isWork ? <> {workItemList.length > 0 ? workItemList.map((workitem, index) => <WorkItem key={index} workitem={workitem} setPercent={setPercent} itemLength={itemLength} index={index} setWorkItemList={setWorkItemList} isEditable={isEditable}></WorkItem>) :
                        <div style={{ textAlign: "center", marginTop: 10 }}>
                            <p>할 일 추가!!</p>
                        </div>}
                        {add && <TodoAddForm setAdd={setAdd} proceeding={proceeding} setWorkItemList={setWorkItemList}></TodoAddForm>}
                        <div style={{ textAlign: "center", marginTop: 10 }}><Card.Body>{isEditable && <Button size='sm' variant="primary" onClick={() => setAdd(true)}>+</Button>}</Card.Body></div></> : <></>}
                </Card.Body>
            </Card>
        </>
    )
}

export default TodoListAdd;
