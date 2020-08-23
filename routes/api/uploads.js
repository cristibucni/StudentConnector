const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
const UploadFile = require("../../models/UploadFile");

/** @route GET api/quizes/all
 *  @desc Get all the quizes
 *  @access Public
 */

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UploadFile.find({ owner: req.user.id })
      .then((files) => res.json(files))
      .catch((err) => res.status(404).json({ noFilesFound: "No files found" }));
  }
);

/** @route POST api/questions/
 *  @desc Create question route
 *  @access Private
 */
router.post("/", upload.single("file"), (req, res) => {
  const newUpload = new UploadFile({
    name: req.file.originalname,
    owner: req.body.owner,
    url: req.file.path,
  });

  newUpload.save().then((upload) => res.json(upload));
});

router.delete("/", (req, res) => {
  UploadFile.deleteMany()
    .then((response) => {
      res.json(response);
    })
    .catch(() => {
      res.status(404).json({ error: "Project not found" });
    });
});

module.exports = router;
