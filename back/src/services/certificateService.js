import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class certificateAuthService {
  static async addCertificate({ user_id, title, description, when_date }) {
    const user = await Certificate.findUserById({ user_id });
    if (user.length === 0) {
      const errorMessage = "존재하지 않는 사용자";
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
    // db에 저장
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewCertificate;
  }

  static async getCertificateInfo({ certificate_id }) {
    const certificate = await Certificate.findByCertificateId({
      certificate_id,
    });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage =
        "자격증 정보가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return certificate;
  }
}

export { certificateAuthService };
