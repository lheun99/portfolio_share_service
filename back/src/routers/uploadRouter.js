import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { upload, deleteImg } from "../middlewares/imageUploadMiddleware";

const uploadRouter = Router();

uploadRouter.post("/upload", login_required, upload.single('filename'), deleteImg, async (req, res) => {
    const profile = req.file.location;
    res.status(201).send(profile);
});

uploadRouter.delete("/deleteimg/:id", deleteImg, async (req, res) => {
    res.status(204).send("delete_success");
})

export { uploadRouter };