import { Button,ButtonGroup } from "react-bootstrap";

const EducationCard = ({topics}) => {

    return (
        <div>
            {topics && topics.map((item) => {
                return (
                    <div key={item.id} style={{borderBottom: 'dotted 2px grey'}}>
                        <article style={{display: 'inline-block'}}>
                            <p style={{fontWeight:'bold'}}>{item.school}</p>
                            <p>{item.major}</p>
                        </article>
                        <ButtonGroup style={{display: 'inline-block',float: 'right'}} size='sm'>
                            <Button variant="secondary">수정</Button>
                            <Button variant="danger">삭제</Button>
                        </ButtonGroup>
                    </div>       
                )

            })}
        </div>
    )

}

export default EducationCard