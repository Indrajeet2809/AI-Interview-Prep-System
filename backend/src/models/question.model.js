const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  questionText: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);