require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { createInstagramStoryImage } = require("./features/sharing/instagram-story");
const subscribe = require("./features/subscription/subscribe");
const getMonobankClientData = require("./features/donation-tracker/getMonobankClientInfo");

const indexRouter = require("./routes/index");
const sharingRouter = require("./features/sharing/routes");
const usersRouter = require("./features/subscription/router");
const ladderRouter = require("./features/ladder/routes");
const donationTrackerRouter = require("./features/donation-tracker/routes");
const nocache = require('nocache');
const { createTwitterPostImage } = require("./features/sharing/twitter-post");

const app = express();

// CORS
app.use(cors());
// disable cache
app.use(nocache());

app.set('etag', false);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ladder", ladderRouter);
app.use("/sharing", sharingRouter);
app.use("/webhook", usersRouter);
app.use("/donation-tracker", donationTrackerRouter);

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  next(createError(404));
});


getMonobankClientData()
  .then(createTwitterPostImage)
  .then(createInstagramStoryImage)
  .then(subscribe);


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log("error", err);
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
