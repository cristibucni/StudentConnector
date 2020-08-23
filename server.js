const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const projects = require("./routes/api/projects");
const quizes = require("./routes/api/quizes");
const questions = require("./routes/api/questions");
const categories = require("./routes/api/categories");
const uploads = require("./routes/api/uploads");
const groups = require("./routes/api/groups");
const events = require("./routes/api/events");
const subjects = require("./routes/api/subjects");
const app = express();
app.use("/uploads", express.static("uploads"));

/** Body parser middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** DB Config */
const db = require("./config/keys").mongoURI;

/** Connect to MongoDB */
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/** Passport middleware*/
app.use(passport.initialize());

/** Passport config */
require("./config/passport")(passport);

/** USE Routes */
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/projects", projects);
app.use("/api/quizes", quizes);
app.use("/api/questions", questions);
app.use("/api/categories", categories);
app.use("/api/uploads", uploads);
app.use("/api/groups", groups);
app.use("/api/events", events);
app.use("/api/subjects", subjects);
const port = process.env.PORT || 5000;
console.log("PORT", process.env.PORT);
app.listen(port, () => console.log("Server running on port " + port));
