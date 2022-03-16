import { CertificateModel } from "../schemas/certificate";
import { UserModel } from "../schemas/user";

class Certificate {
  static async findUserById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findByCertificateId({ certificate_id }) {
    const certificate = await CertificateModel.findOne({ id: certificate_id });
    return certificate;
  }

  static async update({ certificate_id, fieldToUpdate, newValue }) {
    const filter = { id: certificate_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }
}

export { Certificate };
