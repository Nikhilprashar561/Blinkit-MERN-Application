import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.headers?.authorization.split(" ")[1];
      console.log("token", token)

      if(!token){
        return res.status(401).json({
          message: "No Token find"
        })
      }

      const decode = await jwt.verify(token, process.env.ACCESS_SECRET)

      if(!decode){
        return res.status(401).json({
          message: "Unauthorized Access",
          error: true,
          success: false
        })
      }

      req.userId = decode.id

      next()

  } catch (error) {
    return res
      .status(400)
      .json({ message: error.message || error, error: true, success: false });
  }
};

export { auth }