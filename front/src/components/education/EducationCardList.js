import EducationCard from "./EducationCard";

// 학력 정보 조회 상세 컴포넌트
const EducationCardList = ({topics, editHandler}) => {

    return (
        <div>
            {topics.map((item) => <EducationCard value={item} editHandler={editHandler}/>)}
        </div>        
    )

};

export default EducationCardList;