import { Todo } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class todoAuthService {
  static async addTodo({ user_id, proceeding_id, todo, finish }) {
    const user = await Todo.findUserById({ user_id });
    if (user.length === 0) {
      const errorMessage = "존재하지 않는 사용자";
      return { errorMessage };
    }

    const todo_id = uuidv4();
    const newTodo = {
      id: todo_id,
      user_id,
      proceeding_id,
      todo,
      finish
    };

    const createdNewTodo = await Todo.create({ newTodo });
    createdNewTodo.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    
    return createdNewTodo;
  }

  static async getTodos({ proceeding_id }) {
    const todos = await Todo.findByProceedingId({ proceeding_id });
      return todos;
  }

  static async setTodo({ todo_id, toUpdate }) {
    let todo = await Todo.findByTodoId({ todo_id });

    if (!todo) {
      const errorMessage =
          "할 일이 없습니다. 다시 한 번 확인해 주세요.";
        return { errorMessage };
    }
    // 수정해야하는 필드에 맞는 값을 업데이트
    const toUpdateField = Object.keys(toUpdate);

    toUpdateField.forEach(key => {
      if (!toUpdate[key]) delete toUpdate[key];
    });

    todo = await Todo.update({ todo_id, toUpdate });
    return todo;
  }

  static async deleteTodo({ todo_id }) {
    const deletedTodo = await Todo.deleteTodo({ todo_id });

    if (!deletedTodo) {
      const errorMessage =
        "프로젝트 정보가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return deletedTodo;
  }

  static async deleteAllTodo({ user_id }) {
    const deleteTodos = await Todo.deleteAll({ user_id });
    return;
  }
}

export { todoAuthService };
