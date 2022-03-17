import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardService {
  static async addAward({ user_id, title, description }) {
    // 중복 내용인지 확인하는 기능 추가

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newAward = { id, user_id, title, description };

    // db에 저장
    const createdNewAward = await Award.create({ newAward });
    // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    createdNewAward.errorMessage = null; 

    return createdNewAward;
  }

  static async getAwardInfo({ id }) {
    // 이메일 db에 존재 여부 확인
    const award = await Award.findById({ id });
    if (!award) {
      const errorMessage =
        "해당 수상 내역이 존재하지 않습니다.";
      return { errorMessage };
    }

    return award;
  }

  static async getAwards({ user_id }) {
    const awards = await Award.findByUserId({ user_id });
    return awards;
  }

  static async updateAward({ id, toUpdate }) {
    let award = await Award.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage =
        "해당 수상 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      award = await Award.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Award.update({ id, fieldToUpdate, newValue });
    }

    return award;
  }

  static async deleteAward({ id }) {
    const deletedAward = await Award.delete({ id });
    return deletedAward;
  }
}

export { awardService };
