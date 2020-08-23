const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  answerOptions: {
    type: [String],
    required: true,
  },
  answer: {
    type: Schema.Types.Mixed,
    required: true,
  },
});
module.exports = Question = mongoose.model("questions", QuestionSchema);
