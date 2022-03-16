import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findById({ educationId }) {
    const education = await EducationModel.findOne({ id: educationId });
    return education;
  }

  static async findByUserId({ userId }) {
    console.log(userId);
    const educations = await EducationModel.find({ user_id: userId });
    return educations;
  }

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

  static async delete({ educationId }) {
    const deletedEducation = await EducationModel.deleteOne({ id: educationId });
    return deletedEducation;
  }
}

export { Education };
