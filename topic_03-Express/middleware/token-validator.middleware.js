const { verifyAccessToken } = require("../const/jwt.const");
const User = require("../features/auth/auth.model");

const tokenValidator = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(403).json({
        message: "You are not authorized!",
      });
    }
    // Using split because the token from the header looks like Bearer fgdldfgk45l
    // Removing Bearer
    const token = authorizationHeader.split(" ")[1];
    const { userId } = verifyAccessToken(token);
    const user = User.findById(userId);

    if (!user) {
      return res.status(403).json({ message: "User does not exist!" });
    }

    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = tokenValidator;
