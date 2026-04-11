const express = require("express");
const router = express.Router();
const {generateQuestion , submitAnswer , getAllAttempts , getStats}  = require("../controllers/interview.controller");

router.post("/generate-question", generateQuestion);
router.post("/submit-answer", submitAnswer);
router.get("/attempts", getAllAttempts);
router.get("/stats", getStats);

module.exports = router;