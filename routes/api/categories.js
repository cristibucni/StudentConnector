const express = require("express");
const passport = require("passport");

const router = express.Router();

const Category = require("../../models/Category");

/** @route GET api/quizes/all
 *  @desc Get all the quizes
 *  @access Public
 */
router.get("/all", (req, res) => {
  Category.find()
    .populate("questions")
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => res.status(404).json("No categories found"));
});

/** @route GET api/quizes/:quiz_id
 *  @desc Get quiz by id
 *  @access Public
 */
router.get("/:id", (req, res) => {
  Category.findOne({ id: req._id })
    .populate("questions")
    .then((category) => {
      res.json(category);
    })
    .catch((err) => res.status(404).json(err));
});

/** @route POST api/questions/
 *  @desc Create question route
 *  @access Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newCategory = new Category({
      name: req.body.type,
      questions: req.body.questions,
    });

    newCategory.save().then((category) => res.json(category));
  }
);
module.exports = router;
