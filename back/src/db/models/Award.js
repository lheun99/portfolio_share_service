import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findById({ id }) {
    const award = await AwardModel.findOne({ id });
    return award;
  }

  static async findByUserId({ user_id }) {
    const awards = await AwardModel.find({ user_id });
    return awards;
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }

  static async delete({ id }) {
    const deletedAward = await AwardModel.deleteOne({ id });
    return deletedAward;
  }
}

export { Award };
