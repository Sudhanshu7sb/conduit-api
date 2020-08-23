var jwt = require("jsonwebtoken");

exports.generateToken = async (user) => {
  return await jwt.sign({ userId: user.id }, "secret");
};

exports.verifyToken = async (req, res, next) => {
    // console.log(req);
    
  token = req.headers.authorization || "";
  try {
      if (token) {
      let payload = await jwt.verify(token, "secret");
      req.user = {
        userId: payload.userId,
        token,
      };

      return next();
    } else {
        res.status(400).json({msg: "Token required"})
    }
  } catch (error) {
    res.json({ error: "Invalid token" });
  }
};
