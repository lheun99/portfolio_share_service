import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class certificateAuthService {
  static async addCertificate({ user_id, title, description, when_date }) {
    const user = await Certificate.findUserById({ user_id });
    if (user.length === 0) {
      const errorMessage = "존재하지 않는 사용자입니다.";
      return { errorMessage };
    }

    const certificate_id = uuidv4();

    const newCertificate = {
      id: certificate_id,
      user_id,
      title,
      description,
      when_date,
    };

    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewCertificate;
  }

  static async getCertificateInfo({ certificate_id }) {
    const certificate = await Certificate.findByCertificateId({
      certificate_id,
    });

    if (!certificate) {
      const errorMessage =
        "자격증 정보가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return certificate;
  }

  static async setCertificate({ certificate_id, toUpdate }) {
    let certificate = await Certificate.findByCertificateId({ certificate_id });

    if (!certificate) {
      const errorMessage =
        "자격증 정보가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 수정해야하는 필드에 맞는 값을 업데이트
    const toUpdateField = Object.keys(toUpdate);

    toUpdateField.forEach(key => {
      if (!toUpdate[key]) delete toUpdate[key];
    });

    certificate = await Certificate.update({ certificate_id, toUpdate });
    return certificate;
  }

  static async getCertificates({ user_id }) {
    const certificates = await Certificate.findByUserId({ user_id });
    return certificates;
  }

  static async deleteAllCertificate({ user_id }) {
    const deleteCertificates = await Certificate.deleteAll({ user_id });
    return;
  }
  
  static async deleteCertificate({ certificate_id }) {
    const deletedCertificate = await Certificate.deleteCertificate({
      certificate_id,
    });

    if (!deletedCertificate) {
      const errorMessage =
        "자격증 정보가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return deletedCertificate;

  }
}

export { certificateAuthService };
