const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    // destructure jwtToken from request and see if it exists
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }
    // check if jwtToken is valid
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorized");
  }
};
