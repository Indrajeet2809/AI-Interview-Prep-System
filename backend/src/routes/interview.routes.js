const express = require("express");
const router = express.Router();
const {generateQuestion , submitAnswer}  = require("../controllers/interview.controller");

router.post("/generate-question", generateQuestion);
router.post("/submit-answer", submitAnswer)

module.exports = router;