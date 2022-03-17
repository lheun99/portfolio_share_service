import EducationCard from "./EducationCard";

// 학력 정보 조회 list 컴포넌트
const EducationCardList = ({topics, editHandler, deleteHandler}) => {

    return (
        <div>
            {topics.map((item) => <EducationCard value={item} editHandler={editHandler} deleteHandler={deleteHandler}/>)}
        </div>        
    )

};

export default EducationCardList;