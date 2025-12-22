import express from "express"
import { auth } from "../middlewares/auth.middleware.js"
import { uploadImageController } from "../controllers/uploadImage.controllers.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router()

router.post("/upload-image", auth, upload.single("image") ,uploadImageController)

export default router