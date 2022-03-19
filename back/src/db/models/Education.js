import { EducationModel } from "../schemas/education";

// Education DB CRUD 기능 구현
class Education {
  // 새로운 data를 추가
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  // data의 ID를 통해 검색
  static async findById({ educationId }) {
    const education = await EducationModel.findOne({ id: educationId });
    return education;
  }

  // user_id가 같은 모든 data 검색
  static async findByUserId({ userId }) {
    const educations = await EducationModel.find({ user_id: userId });
    return educations;
  }
  
  // filter에 맞는 data의 변경할 필드(fieldToUpdate)에 변경할 내용(newValue)을 업데이트
  static async update({ educationId, fieldToUpdate, newValue }) {
    const filter = { id: educationId };
    const toUpdate = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedEducation;
  }

  // id를 이용하여 data 삭제
  static async delete({ educationId }) {
    const deletedEducation = await EducationModel.deleteOne({ id: educationId });
    return deletedEducation;
  }
}

export { Education };
