const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EventSchema = new Schema({
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
  data: {
    type: String,
    required: true,
  },
});

module.exports = Event = mongoose.model("events", EventSchema);
