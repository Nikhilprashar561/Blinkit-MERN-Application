import { UserModel } from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../config/resendEmail.js";
import { verifyEmailTemplates } from "../utils/verifyEmailTemplates.js";
import dotenv from "dotenv";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { refreshAccessToken } from "../utils/generateRefreshTokens.js";
import { uploadImageCloudinary } from "../utils/uploadCloudinary.js";
import { generateOpt } from "../utils/generateOtp.js";
import { forgetPasswordTemplate } from "../utils/forgetPasswordTemplate.js";
import jwt from "jsonwebtoken";

dotenv.config();

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please Fill Email, Name, & Password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User Alerady Exist With this email",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = await UserModel(payload);
    const save = await newUser.save();

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`;

    const verifyEmail = await sendEmail({
      senTo: email,
      subject: "Verifying User via Email address",
      html: verifyEmailTemplates({
        name,
        url: verifyUrl,
      }),
    });

    return res.status(200).json({
      message: "User Register Success Fully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const verifyEmailController = async (req, res) => {
  try {
    const { code } = req.body;

    const user = await UserModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "You are not allowed Please Register again",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.updateOne(
      { _id: code },
      { verify_email: true }
    );
    await updateUser.save();

    return res.status(200).json({
      message: "User Email Verification is Success Fully",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.message || error, error: true, success: false });
  }
};

const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email & Password is Required",
      error: true,
      success: false,
    });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User Not Found With this Email",
      error: true,
      success: false,
    });
  }

  if (user.status !== "Active") {
    return res.status(400).json({
      message: "Contact With Admin",
      error: true,
      success: false,
    });
  }

  const checkPassword = await bcryptjs.compare(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({
      message: "Your Password is Wrong",
      error: true,
      success: false,
    });
  }

  const lastLogin = await UserModel.findByIdAndUpdate(user?._id, {
    last_login_date: new Date(),
  });

  user.save({ validateBeforeSave: false });

  const accessToken = await generateAccessToken(user._id);
  const refreshToken = await refreshAccessToken(user._id);

  const cookiesOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res.cookie("accessToken", accessToken, cookiesOptions);
  res.cookie("refreshToken", refreshToken, cookiesOptions);

  return res.status(200).json({
    message: "User Login SuccessFully",
    error: false,
    success: true,
    data: {
      accessToken,
      refreshToken,
    },
  });
};

const userLogOutController = async (req, res) => {
  try {
    const userid = req.userId;

    const cookiesOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    const removeRef = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return res
      .status(200)
      .clearCookie("accessToken", cookiesOptions)
      .clearCookie("refreshToken", cookiesOptions)
      .json({
        message: "User Logout SuccessFully",
        error: false,
        success: true,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.message || error, error: true, success: false });
  }
};

const uploadUserAvatar = async (req, res) => {
  try {
    const userId = req.userId; // Auth MiddleWare
    const image = req.file; // Multer MiddleWare

    const upload = await uploadImageCloudinary(image);

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });

    return res.status(200).json({
      message: "Avatar Image Upload SuccessFully",
      success: true,
      error : false,
      data: {
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const UpdateUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;

    let hashPassword = "";

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
    );

    return res.status(200).json({
      message: "User Update SuccessFully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const forgetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "Email Not Available",
        error: true,
        success: false,
      });
    }
    const otp = generateOpt();
    const expireTime = new Date() + 60 * 60 * 1000;

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forget_password_otp: otp,
      forget_password_expiry: new Date(expireTime).toISOString(),
    });

    await sendEmail({
      senTo: email,
      subject: "Forget Password from BlinkeyIt User",
      html: forgetPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    return res.status(200).json({
      message: "Check Your Email",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const verifyForgerPasswordOtp = async (req, res) => {fc 
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(200).json({
        message: "Fill the Email and Otp Field",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "Email Not Available",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();

    if (user.forget_password_expiry < currentTime) {
      return res.status(401).json({
        message: "OTP is Expired",
        error: true,
        success: false,
      });
    }

    if (otp !== user.forget_password_otp) {
      return res.status(401).json({
        message: "OTP is invalid",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      forget_password_otp: "",
      forget_password_expiry: null,
    });

    return res.status(200).json({
      message: "Otp Verifying SuccessFully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(401).json({
        message: "Provide Please All Fields",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email Not Found",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        message: "Your New and Confirm Password in Wrong",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    const update = await UserModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.status(200).json({
      message: "Password Reset SuccessFully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization.split(" ")[1];

    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized Access",
        error: true,
        success: false,
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET
    );

    if (!verifyToken) {
      return res.status(401).json({
        message: "Token Expired",
        error: true,
        success: false,
      });
    }

    const userId = verifyToken?._id;

    const newAccessToken = await generateAccessToken(userId);

    const cookiesOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookiesOptions);

    return res.status(200).json({
      message: "New Refresh Token Generated",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Get Logged In User Details From DataBase

const getUserDetails = async (req, res) => {
  try {
    const userId = req?.userId;

    const user = await UserModel.findById(userId).select(
      "-refresh_token -password"
    );

    if (!user) {
      return res.status(400).json({
        message: "Somethings Going Wrong",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "User Details",
      success: true,
      error: false,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Somethings Going Wrong",
      error: true,
      success: false,
    });
  }
};

export {
  registerController,
  verifyEmailController,
  userLoginController,
  userLogOutController,
  uploadUserAvatar,
  UpdateUserDetails,
  forgetPasswordController,
  verifyForgerPasswordOtp,
  resetPassword,
  refreshTokenController,

  // Get User Request ,
  getUserDetails,
};
