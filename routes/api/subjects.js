const router = require("express").Router();
let Subject = require("../../models/Subject");

/** @route
 *  @desc
 *  @access
 */
router.route("/").get((req, res) => {
  Subject.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  console.log(req.body);
  let newSubjects = [];
  req.body.forEach((subject) => {
    newSubjects.push({
      title: subject,
    });
  });
  Subject.insertMany(newSubjects)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Subject.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Subject.findByIdAndDelete(req.params.id)
    .then(() => res.json("Subject deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
