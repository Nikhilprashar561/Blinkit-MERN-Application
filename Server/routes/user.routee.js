import express from "express";
import {
  registerController,
  userLoginController,
  userLogOutController,
  verifyEmailController,
  uploadUserAvatar,
  UpdateUserDetails,
  verifyForgerPasswordOtp,
  resetPassword,
  refreshTokenController,
  forgetPasswordController,

  // Get User Request
  getUserDetails
} from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { forgetPasswordTemplate } from "../utils/forgetPasswordTemplate.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/verify-email", verifyEmailController);
router.post("/login", userLoginController);
router.get("/logout", auth, userLogOutController);
router.put("/upload-avatar", auth, upload.single("avatar"), uploadUserAvatar);
router.put("/update-user", auth, UpdateUserDetails);
router.put("/forget-password", forgetPasswordController);
router.put("/verify-forget-password-otp", verifyForgerPasswordOtp);
router.put("/reset-password", resetPassword);
router.post("/refresh-token", refreshTokenController);

// All Get User Details 

router.get("/user-details", auth, getUserDetails)

export default router;
