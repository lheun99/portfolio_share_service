import { Career, User } from "../db";
import { v4 as uuidv4 } from "uuid";

class careerService {
  static async addCareer({ user_id, company, job_position, achievement, from_date, to_date }) {
    // user 확인
    const user = await User.findById({ user_id });
    if (!user) {
      const errorMessage = "해당 유저가 존재하지 않습니다.";
      return { errorMessage };
    }

    const id = uuidv4();
    const newCareer = { id, user_id, company, job_position, achievement, from_date, to_date };

    const createdNewCareer = await Career.create({ newCareer });
    // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    createdNewCareer.errorMessage = null; 

    return createdNewCareer;
  }

  // 경력 사항 수정
  static async updateCareer({ career_id, toUpdate }) {
    let career = await Career.findById({ career_id })

    if (!career) {
      const errorMessage = "해당 경력 정보가 존재하지 않습니다. 다시 시도해주세요.";
      return { errorMessage };
    }
    
    if (!toUpdate.name) {
      delete toUpdate["company"];
    }

    if (!toUpdate.job_position) {
      delete toUpdate["job_position"];
    }

    if (!toUpdate.achievement) {
      delete toUpdate["achievement"];
    }

    if (!toUpdate.from_date) {
      delete toUpdate["from_date"];
    }

    if (!toUpdate.to_date) {
      delete toUpdate["to_date"];
    }
    
    career = await Career.update({ career_id, toUpdate });
    return career;
  }

  // 해당 유저의 경력 사항 불러오기
  static async getCareer({ user_id }) {
    const careers = await Career.findByUserId({ user_id });
    return careers;
  }

  // 해당 경력 사항의 상세 정보 불러오기
  static async getCareerInfo({ career_id }) {
    const career = await Career.findById({ career_id });

    if (!career) {
      const message = "해당 사항이 이미 삭제되었거나 존재하지 않습니다.";
      return { message };
    }
    return career;
  }

  // 경력 사항 삭제
  static async deleteCareer({ career_id }) {
    const deletedCareer = await Career.delete({ career_id });
    
    // 삭제가 정상적으로 된 경우
    if (deletedCareer.deletedCount === 1) return;

    // 삭제가 제대로 되지 않았을 경우
    const message = "삭제가 정상적으로 이루어지지 않았습니다.";
    return { message };
  }

  // 유저의 경력 사항 모두 삭제
  static async deleteAllCareer({ user_id }) {
    const deletedCareers = await Career.deleteAll({ user_id });
    
    return;
  }
}

export { careerService };
