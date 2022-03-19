import { AwardModel } from "../schemas/award";

class Award {
  // 수상 내역 추가
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  // 수상 내역 조회
  static async findById({ award_id }) {
    const award = await AwardModel.findOne({ id: award_id });
    return award;
  }

  // 유저의 수상 내역 조회
  static async findByUserId({ user_id }) {
    const awards = await AwardModel.find({ user_id });
    return awards;
  }

  // 수상 내역 업데이트
  static async update({ award_id, fieldToUpdate, newValue }) {
    const filter = { id: award_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }

  // 수상 내역 삭제
  static async delete({ award_id }) {
    const deletedAward = await AwardModel.deleteOne({ id: award_id });
    return deletedAward;
  }
}

export { Award };
