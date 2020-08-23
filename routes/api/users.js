const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

/** Load Input Validation */
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

/** Load User model */
const User = require("../../models/User");

/** @route GET api/users/test
 *  @desc Tests users route
 *  @access Public
 */
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

/** @route GET api/users
 *  @desc User list
 *  @access Private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.isAdmin) {
      User.find()
        .select("-password")
        .sort({ date: -1 })
        .then((users) => res.json(users))
        .catch((err) =>
          res.status(404).json({ noProjectFound: "No users found" })
        );
    } else {
      res.status(403).json({ forbidden: "You have no access to this area." });
    }
  }
);

/** @route GET api/users/register
 *  @desc User registration
 *  @access Public
 */
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm", // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password,
        completedQuizes: [],
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch();
        });
      });
    }
  });
});

/** @route POST api/users/login
 *  @desc Login User / Returning JWT Token
 *  @access Public
 */
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    /** Check for user */
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    /** Check Password */
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        /** User match & Create JWT Payload*/
        const payload = {
          id: user.id,
          isAdmin: user.isAdmin,
          name: user.name,
          avatar: user.avatar,
        };

        /** Sign token */
        jwt.sign(
          payload,
          keys.appSecret,
          { expiresIn: keys.expireIn },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "Password is incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

/** @route GET api/users/current
 *  @desc Return current user
 *  @access Private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      isAdmin: req.user.isAdmin,
      name: req.user.name,
      email: req.user.email,
      schedule: req.user.schedule,
      completedQuizes: req.user.completedQuizes,
      avatar: req.user.avatar,
    });
  }
);

router.get(
  "/current/completedQuizes",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .select("completedQuizes")
      .then((user) => {
        res.json(user);
      })
      .catch((err) => res.status(404).json(err));
  }
);

router.post(
  "/current/completedQuizes",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then((user) => {
      let exists = false;
      user.completedQuizes.forEach((quiz) => {
        if (quiz.quizId == req.body.quizId) {
          exists = true;
        }
      });
      if (!exists) {
        user.completedQuizes.push(req.body);
        user.save();
      }
    });
  }
);

router.get(
  "/current/tasks",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .select("tasks")
      .then((user) => {
        res.json(user);
      })
      .catch((err) => res.status(404).json(err));
  }
);

router.post(
  "/current/tasks",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then((user) => {
      let exists = false;
      user.tasks.forEach((task) => {
        if (task.name == req.body.name) {
          exists = true;
        }
      });
      if (!exists) {
        user.tasks.push(req.body);
        user.save().then((user) => res.json(user));
      }
    });
  }
);

router.put(
  "/current/tasks/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then((user) => {
      let newTasks = user.tasks.filter((task) => {
        return task._id != req.params.id;
      });
      user.tasks = newTasks;
      user.save().then((user) => res.json(user));
    });
  }
);

router.post(
  "/schedule",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    const schedule = req.body.schedule;
    const id = req.body.id.id;
    User.findOne({ _id: id }).then((user) => {
      user.schedule = schedule;
      user.save().then((user) => res.json(user));
    });
  }
);

module.exports = router;
