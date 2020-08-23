const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Question = require("./Question");
const QuizSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  content: [
    {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
  ],
});

module.exports = Quiz = mongoose.model("quizes", QuizSchema);
