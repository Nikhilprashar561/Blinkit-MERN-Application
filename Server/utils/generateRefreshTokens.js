import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.models.js";

const refreshAccessToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, process.env.REFRESH_SECRET, {
    expiresIn: "30d",
  });

  const updateRefreshToken = await UserModel.updateOne(
    { _id: userId },
    { refresh_token: token }
  );

  return updateRefreshToken;
};

export { refreshAccessToken };
