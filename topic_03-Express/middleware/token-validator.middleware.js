const { verifyAccessToken, verifyRefreshToken } = require("../const/jwt.const");
const User = require("../features/auth/auth.model");

const tokenValidator = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(403).json({ message: "Authorization header missing." });
    }
    const token = authorizationHeader.split(" ")[1];
    const { userId } = verifyRefreshToken(token);
    const user = User.findById(userId);
    if (!user) {
      return res.status(403).json({ message: "User does not exist." });
    }
    next();
  } catch (error) {
    res.status(403).json(error);
  }
};

module.exports = tokenValidator;
