const express = require("express");
const router = express.Router();
const passport = require("passport");
const RequestFormatter = require("../requestFormatter/RequestFormatter");

/** Load Validation for Profile */
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

/** Load Profile Model */
const Profile = require("../../models/Profile");

/** Load User Model */
const User = require("../../models/User");

/** @route GET api/profile/test
 *  @desc Tests profile route
 *  @access Public
 */
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

/** @route GET api/profile
 *  @desc Get current users profile
 *  @access Private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/** @route GET api/profile/all
 *  @desc GET all profiles
 *  @access Private
 */
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    if (req.user.isAdmin) {
      Profile.find()
        .populate("user", ["name", "avatar"])
        .then((profiles) => {
          if (!profiles) {
            errors.noPorfiles = "There are no profiles";
            return res.status(404).json(errors);
          }
          res.json(profiles);
        })
        .catch((err) => res.status(404).json(err));
    } else {
      res.status(403).json({ forbidden: "You have no access to this area" });
    }
  }
);

/** @route GET api/profile/handle/:handle
 *  @desc GET profile by handle
 *  @access Public
 */
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noPorfile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

/** @route GET api/profile/user/:id
 *  @desc GET profile by user id
 *  @access Public
 */
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noPorfile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

/** @route POST api/profile
 *  @desc Create a profile for current user
 *  @access Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /** Check validation */
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    /** Get fields */
    const profileFields = {};
    profileFields.user = req.user.id;

    Object.entries(req.body).forEach(function (keyValuePair) {
      profileFields[keyValuePair[0]] = keyValuePair[1];
    });

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        /** Update */
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        /** Create */
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);

/** @route POST api/profile/:id
 *  @desc Update a profile
 *  @access Private
 */
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /** Check validation */
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    /** Get fields */
    const profileFields = {};

    Object.entries(req.body).forEach(function (keyValuePair) {
      profileFields[keyValuePair[0]] = keyValuePair[1];
    });

    Profile.findOne({ _id: req.params.id }).then((profile) => {
      if (req.user.isAdmin && profile) {
        /** Update */
        Profile.findOneAndUpdate(
          { _id: req.params.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        res.status(403).json({ forbidden: "You have no access to this area." });
      }
    });
  }
);

/** @route POST api/profile/experience
 *  @desc Add experience to profile
 *  @access Private
 */
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const experience = {};

    Profile.findOne({ user: req.user.id }).then((profile) => {
      RequestFormatter.createObject(experience, req);

      /** Add to experience array */
      profile.experience.unshift(experience);
      profile.save().then((profile) => res.json(profile));
    });
  }
);

/** @route POST api/profile/education
 *  @desc Add education to profile
 *  @access Private
 */
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const education = {};

    Profile.findOne({ user: req.user.id }).then((profile) => {
      RequestFormatter.createObject(education, req);

      /** Add to education array */
      profile.education.unshift(education);
      profile.save().then((profile) => res.json(profile));
    });
  }
);

/** @route DELETE api/profile/education/edu_id
 *  @desc Delete education to profile
 *  @access Private
 */
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);
      profile.education.splice(removeIndex, 1);
      profile.save().then((profile) => res.json(profile));
    });
  }
);

/** @route DELETE api/profile
 *  @desc Delete user and profile
 *  @access Private
 */
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
module.exports = router;
