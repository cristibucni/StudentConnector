const router = require("express").Router();
let Event = require("../../models/Event");
const passport = require("passport");
/** @route
 *  @desc
 *  @access
 */
router.route("/").get((req, res) => {
  Event.find()
    .then((groups) => res.json(groups))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").delete((req, res) => {
  Event.deleteMany()
    .then(() => res.json("all deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  Event.insertMany(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Event.findOne({ _id: req.params.id })
      .then((group) => {
        group.remove().then(() => res.json({ success: true }));
      })
      .catch((err) =>
        res
          .status(404)
          .json({ groupnotfound: "Event has already been deleted" })
      );
  }
);

router.route("/add").post((req, res) => {
  const nume = req.body.nume;
  const locatie = req.body.locatie;
  const detalii = req.body.detalii;
  const data = req.body.data;
  const newEvent = new Event({ nume, locatie, detalii, data });

  newEvent
    .save()
    .then((group) => res.json(group))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
