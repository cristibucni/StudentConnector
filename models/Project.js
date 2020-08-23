const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/** Create Schema */
const ProjectSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    ref: "users",
  },
  deadline: {
    type: Date,
  },
  description: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  technologyStack: {
    type: [String],
    default: [],
  },
  members: {
    type: [String],
    default: [],
  },
});

module.exports = Project = mongoose.model("project", ProjectSchema);
