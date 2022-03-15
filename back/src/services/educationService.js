import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
  static async addEducation({ user_id, school, major, position }) {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newEducation = { id, user_id, school, major, position };

    // db에 저장
    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewEducation;
  }

  static async updateEducation({ education_id, toUpdate }) {
    let education = await Education.findById({ education_id })

    if (!education) {
      const errorMessage = "해당 학력 정보가 존재하지 않습니다. 다시 시도해주세요.";
      return { errorMessage };
    }

    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    return education;
  }

  static async getEducation({ user_id }) {
    const education = await Education.findByUserId({ user_id });
    return education;
  }
}

export { educationService };
