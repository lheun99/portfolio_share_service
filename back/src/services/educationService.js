import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
  // 학력 사항 추가 기능
  static async addEducation({ user_id, school, major, position }) {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newEducation = { id, user_id, school, major, position };

    // db에 저장
    const createdNewEducation = await Education.create({ newEducation });
     // 문제 없이 db 저장 완료되었으므로 에러가 없음
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }

  // 학력 사항 수정 기능
  static async updateEducation({ educationId, toUpdate }) {
    let education = await Education.findById({ educationId })

    if (!education) {
      const errorMessage = "해당 학력 정보가 존재하지 않습니다. 다시 시도해주세요.";
      return { errorMessage };
    }

    // 수정 항목 반영
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    return education;
  }
  
  // 학력 사항 불러오기 기능
  static async getEducation({ userId }) {
    console.log("service: ", userId)
    const education = await Education.findByUserId({ userId });
    return education;
  }

  // 학력 사항 삭제 기능
  static async deleteEducation({ educationId }) {
    const deletedEducation = await Education.delete({ educationId });

    // console.log(deletedEducation); 디버깅

    if (deletedEducation.deletedCount === 1) return;

    // 삭제가 제대로 되지 않았을 경우
    const message = "삭제가 정상적으로 이루어지지 않았습니다."
    return { message };
  }
}

export { educationService };
