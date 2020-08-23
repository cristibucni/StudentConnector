const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GroupSchema = new Schema({
  nume: {
    type: String,
    required: true,
  },
  locatie: {
    type: String,
    required: true,
  },
  detalii: {
    type: String,
    required: true,
  },
  profesor: {
    type: String,
    required: true,
  },
  lider: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = Group = mongoose.model("groups", GroupSchema);
