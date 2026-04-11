const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },
  answerText: {
    type: String,
    required: true
  },
  score: {
    type: Number
  },
  feedback: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);