const router = require("express").Router();
let Group = require("../../models/Group");
const passport = require("passport");
/** @route
 *  @desc
 *  @access
 */
router.route("/").get((req, res) => {
  Group.find()
    .then((groups) => res.json(groups))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").delete((req, res) => {
  Group.deleteMany()
    .then(() => res.json("all deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  Group.insertMany(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Group.findOne({ _id: req.params.id })
      .then((group) => {
        group.remove().then(() => res.json({ success: true }));
      })
      .catch((err) =>
        res
          .status(404)
          .json({ groupnotfound: "Group has already been deleted" })
      );
  }
);

router.route("/add").post((req, res) => {
  const nume = req.body.nume;
  const locatie = req.body.locatie;
  const detalii = req.body.detalii;
  const profesor = req.body.profesor;
  const lider = req.body.lider;
  const newGroup = new Group({ nume, locatie, detalii, profesor, lider });

  newGroup
    .save()
    .then((group) => res.json(group))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
