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

  static async findByUserId({ user_id }) {
    const certificates = await CertificateModel.find({ user_id });
    return certificates;
  }


  // user_id를 이용하여 data 삭제
  static async deleteAll({ user_id }) {
    const deletedCertificates = await CertificateModel.deleteMany({ user_id: user_id });
    return deletedCertificates;
  }
  static async deleteCertificate({ certificate_id }) {
    const deletedCertificate = await CertificateModel.deleteOne({
      id: certificate_id,
    });
    return deletedCertificate;

  }
}

export { Certificate };
