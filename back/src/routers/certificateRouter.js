import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateAuthService } from "../services/certificateService";

const certificateAuthRouter = Router();

certificateAuthRouter.post(
  "/certificate/create",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      // req (request) 에서 데이터 가져오기
      const user_id = req.body.user_id;
      const title = req.body.title;
      const description = req.body.description;
      const when_date = req.body.when_date;

      // 위 데이터를 유저 db에 추가하기
      const newCertificate = await certificateAuthService.addCertificate({
        user_id,
        title,
        description,
        when_date,
      });

      if (newCertificate.errorMessage) {
        throw new Error(newCertificate.errorMessage);
      }

      res.status(201).json(newCertificate);
    } catch (error) {
      next(error);
    }
  }
);

export { certificateAuthRouter };
