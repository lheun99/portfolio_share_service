import { ProjectModel } from "../schemas/project";
import { UserModel } from "../schemas/user";

class Project {
  static async findUserById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }
}

export { Project };
