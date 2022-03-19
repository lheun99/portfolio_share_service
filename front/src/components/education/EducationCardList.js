import EducationCard from "./EducationCard";

// 학력 정보 조회 list 컴포넌트
const EducationCardList = ({ topics, editHandler, deleteHandler, isEditable }) => {
  return (
    <>
      {topics
        .map((item) => 
          <EducationCard 
            key={item.id} 
            value={item} 
            editHandler={editHandler} 
            deleteHandler={deleteHandler} 
            isEditable={isEditable} 
          />)}
    </>
  );

};

export default EducationCardList;