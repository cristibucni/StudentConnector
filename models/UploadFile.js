var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UploadFileSchema = new Schema(
  {
    name: String,
    url: String,
    owner: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

module.exports = UploadFile = mongoose.model("uploads", UploadFileSchema);
