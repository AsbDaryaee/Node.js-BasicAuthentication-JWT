const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Please Provide Username and Password", 400);
  }

  id = new Date().getTime();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "Login Successful", token: token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hey ${req.user.username}`,
    secret: `This is your Lucky Number: ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
