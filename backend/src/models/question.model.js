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
  },

  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);