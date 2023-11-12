import jwt from "jsonwebtoken";
import "dotenv/config";

export const tokenAuth = (req, res, next) => {
  try {
    //Fetch token
    const tokenKeyFetch = req.headers.authorization.split(" ")[1];

    //Verify token
    const tokenVerify = jwt.verify(tokenKeyFetch, process.env.TOKEN_KEY);

    if (!tokenVerify?.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.email = tokenVerify.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
