const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const authentication = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("Token is not provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id, username } = decoded;

    // We created a new object in the request
    req.user = { id, username };

    // We Pass the request to the next middleware => dashboard {set in app.js}
    next();
  } catch (error) {
    throw new CustomAPIError("NOT Autrhorized to access", 401);
  }
};

module.exports = authentication;
