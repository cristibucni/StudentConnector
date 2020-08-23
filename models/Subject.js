const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = Category = mongoose.model("subjects", SubjectSchema);
