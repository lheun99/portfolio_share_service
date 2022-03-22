import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class projectAuthService {
  static async addProject({ user_id, title, description, link, from_date, to_date }) {
    const user = await Project.findUserById({ user_id });
    if (user.length === 0) {
      const errorMessage = "존재하지 않는 사용자";
      return { errorMessage };
    }

    const project_id = uuidv4();

    const newProject = {
      id: project_id,
      user_id,
      title,
      description,
      link,
      from_date,
      to_date,
    };

    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewProject;
  }

  static async getProjectInfo({ project_id }) {
    const project = await Project.findByProjectId({ project_id });

    if (!project) {
      const errorMessage =
        "프로젝트가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return project;
  }

  static async setProject({ project_id, toUpdate }) {
    let project = await Project.findByProjectId({ project_id });

    if (!project) {
      const errorMessage =
        "프로젝트가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }
    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.link) {
      const fieldToUpdate = "link";
      const newValue = toUpdate.link;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.from_date) {
      const fieldToUpdate = "from_date";
      const newValue = toUpdate.from_date;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.to_date) {
      const fieldToUpdate = "to_date";
      const newValue = toUpdate.to_date;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }
    return project;
  }

  static async getProjects({ user_id }) {
    const projects = await Project.findByUserId({ user_id });
    return projects;
  }

<<<<<<< HEAD
  static async deleteAllProject({ user_id }) {
    const deleteProjects = await Project.deleteAll({ user_id });
    return;
=======
  static async deleteProject({ project_id }) {
    const deletedProject = await Project.deleteProject({
      project_id,
    });

    if (!deletedProject) {
      const errorMessage =
        "프로젝트 정보가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return deletedProject;
>>>>>>> 2week-project-mvp-front
  }
}

export { projectAuthService };
