const authService = require("../services/auth.service");
const { sendWelcomeEmail } = require("../services/email.service");


const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

      // SEND EMAIL HERE (after successful registration)
    sendWelcomeEmail(user.email, user.name);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await authService.loginUser(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


//logics for delete user
const removeUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await authService.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: result.message
    });

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

module.exports = { register, login, removeUser };