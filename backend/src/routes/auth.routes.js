const express = require("express");
const authController = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.get("/users", isAuthenticated, isAdmin, authController.getUsers);
router.delete("/delete/:userId", isAuthenticated, isAdmin, authController.removeUser);

module.exports = router;