const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/** Create Schema */
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  completedQuizes: [
    {
      quizId: {
        type: Schema.Types.ObjectId,
        ref: "quizes",
      },
      grade: {
        type: Number,
      },
    },
  ],
  schedule: {
    luni: [
      {
        name: String,
        startTs_endTs: String,
      },
    ],
    marti: [
      {
        name: String,
        startTs_endTs: String,
      },
    ],
    miercuri: [
      {
        name: String,
        startTs_endTs: String,
      },
    ],

    joi: [
      {
        name: String,
        startTs_endTs: String,
      },
    ],

    vineri: [
      {
        name: String,
        startTs_endTs: String,
      },
    ],
  },

  tasks: [
    {
      name: {
        type: String,
        required: false,
      },
      deadline: {
        type: String,
        required: false,
      },
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
