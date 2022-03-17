import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

educationRouter.post("/education/create", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    // req.currentId => login_required 에서 로그인 성공한 경우 유저의 id
    const user_id = req.currentUserId;
    const { school, major, position } = req.body;
    
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

educationRouter.get("/educationlist/:user_id", login_required, async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const userId = req.params.user_id;
    const education = await educationService.getEducation({ userId });
    
    res.status(200).json(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educations/:id", login_required, async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const educationId = req.params.id;
    const education = await educationService.getEducationInfo({ educationId });
    
    if (education?.message) {
      throw new Error(education.message);
    }
    
    res.status(200).json(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.put("/educations/:id", login_required, async function (req, res, next) {
    try {
      const educationId = req.params.id;
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const position = req.body.position ?? null;

      const toUpdate = { school, major, position };

      const updatedEducation = await educationService.updateEducation({ educationId, toUpdate });

      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }

      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.delete("/educations/:id", login_required, async function (req, res, next) {
  try {
    const educationId = req.params.id;
    const deletedEducation = await educationService.deleteEducation({ educationId });

    if (deletedEducation?.message) {
      throw new Error(deletedEducation.message);
    }

    res.status(200).send('success');
  } catch (error) {
    next(error);
  }
}
);



export { educationRouter };
