const express = require("express");
const router = express.Router();

const {
  generateQuestion,
  submitAnswer,
  getAllAttempts,
  getStats,
  generateResumeQuestions,
  askAnything,
} = require("../controllers/interview.controller");

const upload = require("../middleware/upload.middleware");
const { isAuthenticated } = require("../middleware/auth.middleware");

// Protect all routes

router.post("/generate-question", isAuthenticated, generateQuestion);
router.post("/submit-answer", isAuthenticated, submitAnswer);
router.get("/attempts", isAuthenticated, getAllAttempts);
router.get("/stats", isAuthenticated, getStats);
router.post("/ask-anything", isAuthenticated, askAnything);
router.post(
  "/resume-questions",
  isAuthenticated,
  upload.single("resume"),
  generateResumeQuestions
);

module.exports = router;