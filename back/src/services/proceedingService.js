import { Proceeding } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class proceedingAuthService {
    static async addProceeding({ user_id, title, start_date, end_date }) {
        const user = await Proceeding.findUserById({ user_id });
        if (user.length === 0) {
            const errorMessage = "존재하지 않는 사용자";
            return { errorMessage };
        }

        const proceeding_id = uuidv4();
        
        const newProceeding = {
            id: proceeding_id,
            user_id,
            title,
            start_date,
            end_date,
        };
        const createdNewProceeding = await Proceeding.create({ newProceeding });
        createdNewProceeding.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
        
        return createdNewProceeding;
    }

    static async getProceedings({ user_id }) {
        const proceedings = await Proceeding.findByUserId({ user_id });
        return proceedings;
    }
    //   static async getProjectInfo({ project_id }) {
    //     const project = await Project.findByProjectId({ project_id });

    //     if (!project) {
    //       const errorMessage =
    //         "프로젝트가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
    //       return { errorMessage };
    //     }

    //     return project;
    //   }

      static async setProceeding({ proceeding_id, toUpdate }) {
        let proceeding = await Proceeding.findByProceedingId({ proceeding_id });

        if (!proceeding) {
          const errorMessage =
            "프로젝트가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
          return { errorMessage };
        }
        if (toUpdate.title) {
          const fieldToUpdate = "title";
          const newValue = toUpdate.title;
          proceeding = await Proceeding.update({ proceeding_id, fieldToUpdate, newValue });
        }
        if (toUpdate.start_date) {
          const fieldToUpdate = "start_date";
          const newValue = toUpdate.start_date;
          proceeding = await Proceeding.update({ proceeding_id, fieldToUpdate, newValue });
        }

        // project = await Project.update({ project_id, fieldToUpdate: "link", newValue: toUpdate.link });

        if (toUpdate.end_date) {
          const fieldToUpdate = "end_date";
          const newValue = toUpdate.end_date;
          proceeding = await Proceeding.update({ proceeding_id, fieldToUpdate, newValue });
        }

        return proceeding;
      }

  static async deleteProceeding({ proceeding_id }) {
    const deletedProceeding = await Proceeding.deleteProceeding({
      proceeding_id,
    });

    if (!deletedProceeding) {
      const errorMessage =
        "프로젝트 정보가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return deletedProceeding;
  }
}

export { proceedingAuthService };
