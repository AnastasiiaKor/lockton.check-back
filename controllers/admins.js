const { Admin } = require("../models/admin");
const { HttpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password)
    throw new HttpError(400, "Login and Password are required!");
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({
    login: req.body.login,
    password: hashedPassword,
  });
  if (admin) return res.status(201).send({ message: "Admin added" });
};

const login = async (req, res) => {
  const { login, password } = req.body;
  const admin = await Admin.findOne({ login });
  if (!admin) throw HttpError(404, "Wrong login or password");

  const check = await bcrypt.compare(password, admin.password);
  if (!check) throw HttpError(404, "Wrong login or password");

  const payload = {
    id: admin._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });

  await Admin.findByIdAndUpdate(admin._id, { token });
  res.status(200).json({
    token,
  });
};

const check = async (req, res) => {
  const { login } = req.admin;
  res.status(200).json({
    login,
  });
};

const logout = async (req, res) => {
  const { id } = req.admin;
  await Admin.findByIdAndUpdate(id, { token: null });
  res.status(204).json();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  check: ctrlWrapper(check),
  logout: ctrlWrapper(logout),
};
