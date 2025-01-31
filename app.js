var createError = require("http-errors");
var express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressSession = require("express-session");
const flash = require("connect-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const passport = require("passport");

var app = express();

// Mongoose connection
mongoose
  .connect("mongodb://0.0.0.0:27017/test")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);  // Ensure the app doesn't continue running if connection fails
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Session and Passport setup
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "mySecreteKey",
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Correctly pass serialize and deserialize methods to passport
passport.serializeUser(usersRouter.serializeUser);
passport.deserializeUser(usersRouter.deserializeUser);

app.use(flash());

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Route handling
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

// Start server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
