const express = require("express");
const router = express.Router();
const {generateQuestion , submitAnswer ,
     getAllAttempts, getStats,
     generateResumeQuestions,
     askAnything,
     }  = require("../controllers/interview.controller");

   
const upload = require("../middleware/upload.middleware")
router.post("/generate-question", generateQuestion);
router.post("/submit-answer", submitAnswer);
router.get("/attempts", getAllAttempts);
router.get("/stats", getStats);
router.post("/ask-anything", askAnything);
router.post("/resume-questions", upload.single("resume"), generateResumeQuestions);

module.exports = router;