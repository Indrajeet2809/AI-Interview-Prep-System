const authService = require("../services/auth.service");
const { sendWelcomeEmail } = require("../services/email.service");

const cookieOptions = {
  httpOnly: true,
  secure: false, 
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    sendWelcomeEmail(user.email, user.name);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const data = await authService.loginUser(req.body);

    res
      .cookie("token", data.token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: {
          _id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        },
      });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsers();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await authService.deleteUser(userId, req.user);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getUsers,
  removeUser,
};
