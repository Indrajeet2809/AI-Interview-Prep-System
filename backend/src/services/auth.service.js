const User = require("../models/user.models");
const Answer = require("../models/answer.model");
const Question = require("../models/question.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { user, token };
};

const getAllUsers = async () => {
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 });

  return users;
};

const deleteUser = async (userId, loggedInUser) => {
  if (loggedInUser.id === userId) {
    throw new Error("Admin cannot delete own account");
  }

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new Error("User not found");
  }

  await Answer.deleteMany({ userId });
  await Question.deleteMany({ userId });

  return { message: "User deleted successfully" };
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
};