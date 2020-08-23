const express = require("express");
const router = express.Router();

const Quiz = require("../../models/Quiz");
const Category = require("../../models/Category");
const _ = require("lodash");
/** @route GET api/quizes/all
 *  @desc Get all the quizes
 *  @access Public
 */
router.get("/all", (req, res) => {
  Quiz.find()
    .select("title description")
    .then((quizes) => {
      res.json(quizes);
    })
    .catch((err) => res.status(404).json("No quizes found"));
});

/** @route GET api/quizes/:quiz_id
 *  @desc Get quiz by id
 *  @access Public
 */
router.get("/:id", (req, res) => {
  Quiz.findById(req.params.id)
    .populate({
      path: "content",
      populate: {
        path: "questions",
      },
    })
    .then((quiz) => {
      res.json(quiz);
    })
    .catch((err) => res.status(404).json(err));
});

/** @route POST api/quizes/
 *  @desc Create quiz route
 *  @access Private
 */
router.post("/", (req, res) => {
  let categoryQuestionsMap = {};
  req.body.categories.map((category) => {
    categoryQuestionsMap[category.title] = category.questions.map(
      (question) => {
        return new Question({
          type: question.type,
          title: question.title,
          answerOptions: question.answerOptions,
          answer: question.answer,
        });
      }
    );
  });

  populateCategories = () => {
    return req.body.categories.map((category) => {
      return new Category({
        title: category.title,
        questions: categoryQuestionsMap[category.title].map((questions) => {
          return questions._id;
        }),
      });
    });
  };
  populateQuestions = () => {
    return _.flattenDeep(Object.values(categoryQuestionsMap));
  };

  categoriesArray = populateCategories();
  questionsArray = populateQuestions();

  const newQuiz = new Quiz({
    title: req.body.title,
    description: req.body.description,
    content: categoriesArray.map((category) => {
      return category._id;
    }),
  });

  Question.insertMany(questionsArray).then(
    Category.insertMany(categoriesArray).then(
      newQuiz.save().then((quiz) => res.json(quiz))
    )
  );
});

router.route("/").delete((req, res) => {
  Quiz.deleteMany()
    .then(() => res.json("all deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
