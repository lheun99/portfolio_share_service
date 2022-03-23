import { TodoModel } from "../schemas/todo";
import { UserModel } from "../schemas/user";
import {ProjectModel } from "../schemas/project";

class Todo {
  static async findUserById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async create({ newTodo }) {
    const createdNewTodo = await TodoModel.create(newTodo);
    return createdNewTodo;
  }

  static async findByUserId({ proceeding_id }) {
    const todos = await TodoModel.find({ proceeding_id });
    return todos;
  }
  static async findByTodoId({ todo_id }) {
    const todos = await TodoModel.find({ todo_id });
    return todos;
  }
  static async update({ todo_id, fieldToUpdate, newValue }) {
    const filter = { id: todo_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedTodo = await TodoModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedTodo;
  }

  static async deleteTodo({ todo_id }) {
    const deletedTodo = await TodoModel.deleteOne({
      id: todo_id,
    });
    return deletedTodo;

  }

}

export { Todo };
