import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {
  isValidData,
  invalidCallback,
} from "../middlewares/validationMiddleware";

import { todoAuthService } from "../services/todoService";

const todoAuthRouter = Router();
todoAuthRouter.use(login_required);

todoAuthRouter.post(
  "/todo/create",
  isValidData("todo"),
  invalidCallback,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      const user_id = req.body.user_id;
      const proceeding_id = req.body.proceeding_id;
      const todo = req.body.todo;
      const finish = req.body.finish;


      const newTodo = await todoAuthService.addTodo({
        user_id,
        proceeding_id,
        todo,
        finish,
      });
      if (newTodo.errorMessage) {
        throw new Error(newTodo.errorMessage);
      }
      res.status(201).json(newTodo);
    } catch (error) {
      next(error);
    }
  }
);

todoAuthRouter.get("/todolist/:proceeding_id", async (req, res, next) => {
    try {
      const proceeding_id = req.params.proceeding_id;
      const todos = await todoAuthService.getTodos({ proceeding_id });
      res.status(200).send(todos);
    } catch (error) {
      next(error);
    }
  });

  todoAuthRouter.put("/todo/:id", async (req, res, next) => {
  try {
    const todo_id = req.params.id;

    const todo = req.body.todo ?? null;
    const finish = req.body.finish ?? null;

    const toUpdate = { todo, finish };

    const updatedTodo = await todoAuthService.setTodo({
      todo_id,
      toUpdate,
    });
    if (updatedTodo.errorMessage) {
      throw new Error(updatedTodo.errorMessage);
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
});

todoAuthRouter.delete("/todo/:id", async (req, res, next) => {
  try {
    const todo_id = req.params.id;
    const deletedTodo = await todoAuthService.deleteTodo({
      todo_id,
    });

    if (deletedTodo.errorMessage) {
      throw new Error(deletedTodo.errorMessage);
    }

    res.status(200).send("성공적으로 삭제가 완료되었습니다.");

  } catch (error) {
    next(error);
  }
});

export { todoAuthRouter };
