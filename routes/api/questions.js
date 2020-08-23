const express = require("express");
const passport = require("passport");
const router = express.Router();

const Question = require("../../models/Question");

/** @route GET api/questions/all
 *  @desc Get all the questions
 *  @access Public
 */
router.get("/all", (req, res) => {
  Question.find()
    .then((questions) => {
      return res.json(questions);
    })
    .catch((err) => res.status(404).json("No questions found"));
});

/** @route GET api/questions/:question_id
 *  @desc Get question by id
 *  @access Public
 */
router.get("/:id", (req, res) => {
  Question.findById(req.params.id)
    .then((question) => res.json(question))
    .catch((err) => res.status(404).json("No question found with that ID"));
});

/** @route POST api/questions/
 *  @desc Create question route
 *  @access Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newQuestion = new Question({
      type: req.body.type,
      title: req.body.title,
      answerOptions: req.body.answerOptions,
      answer: req.body.answer,
    });

    newQuestion.save().then((question) => res.json(question));
  }
);
module.exports = router;
