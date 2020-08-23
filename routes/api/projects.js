const express = require("express");
const passport = require("passport");
const RequestFormatter = require("../requestFormatter/RequestFormatter");

const router = express.Router();

/** Project model */
const Project = require("../../models/Project");
/** Project validation */
const validateProjectInput = require("../../validation/project");

/** @route GET api/projects/test
 *  @desc Tests projects route
 *  @access Public
 */
router.get("/test", (req, res) => res.json({ msg: "Projects Work" }));

/** @route GET api/projects/all
 *  @desc Get all the projects
 *  @access Public
 */
router.get("/all", (req, res) => {
  Project.find()
    .sort({ date: -1 })
    .then((projects) => res.json(projects))
    .catch((err) =>
      res.status(404).json({ noProjectFound: "No projects found" })
    );
});

/** @route GET api/projects
 *  @desc Get all the projects assigned to user/profile
 *  @access Private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.find({
      $or: [{ createdBy: req.user.name }, { members: req.user.name }],
    })
      .sort({ date: -1 })
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.status(404).json({ noProjectFound: "No projects found" })
      );
  }
);

/** @route GET api/projects/:project_id
 *  @desc Get project by id
 *  @access Public
 */
router.get("/:id", (req, res) => {
  Project.findById(req.params.id)
    .then((projects) => res.json(projects))
    .catch((err) =>
      res.status(404).json({ noProjectFound: "No project found with that ID" })
    );
});

/** @route PUT api/projects/:project_id
 *  @desc Update project by id
 *  @access Private
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Project.findOne({ _id: req.params.id }).then((project) => {
      if (project.createdBy === req.user.name) {
        RequestFormatter.createObject(project, req);
        project.save().then((project) => res.json(project));
      } else {
        return res
          .status(403)
          .json({
            forbidden: "You are not authorised to change this project.",
          });
      }
    });
  }
);

/** @route POST api/projects
 *  @desc Create projects route
 *  @access Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const project = {};

    Project.findOne({ name: req.body.name }).then((existingProject) => {
      if (existingProject) {
        return res
          .status(400)
          .json("Project already exists. Choose a diffrent name.");
      }

      RequestFormatter.createObject(project, req);
      project.createdAt = new Date().toISOString();
      project.createdBy = req.user.name;

      new Project(project).save().then((project) => res.json(project));
    });
  }
);

/** @route DELETE api/projects/:id
 *  @desc Delete project
 *  @access Private
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findOneAndRemove({ _id: req.params.id })
      .then((project) => {
        res.json(project);
      })
      .catch(() => {
        res.status(404).json({ error: "Project not found" });
      });
  }
);

module.exports = router;
