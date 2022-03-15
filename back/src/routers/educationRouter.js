import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

educationRouter.post("/education/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { user_id, school, major, position } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newEducation = await educationService.addEducation({
      user_id,
      school,
      major,
      position
    });

    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educations/:id", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const user_id = req.params.id;
    const education = await educationService.getEducation({ user_id });
    
    // 학력 사항이 없을 때 에러?
    res.status(200).send(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.put("/educations/:id", login_required, async function (req, res, next) {
    try {
      const user_id = req.params.id;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const position = req.body.position ?? null;

      const toUpdate = { school, major, position };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedEducation = await educationService.updateEducation({ user_id, toUpdate });

      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }

      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

/* 학적 사항 전체 불러오기?
userAuthRouter.get(
  "/educationlist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);
*/


export { educationRouter };
