require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { createInstagramStoryImage } = require("./features/social-sharing/instagram-story");
const subscribe = require("./features/subscription/subscribe");
const getMonobankClientData = require("./features/donation-tracker/getMonobankClientInfo");

const indexRouter = require("./routes/index");
const socialSharingRouter = require("./features/social-sharing/routes");
const usersRouter = require("./features/subscription/router");
const ladderRouter = require("./features/ladder/routes");
const donationTrackerRouter = require("./features/donation-tracker/routes");
const app = express();

// CORS
app.use(cors());

// cache for 60 second to reduce load to server for all requests
app.use((_, res, next) => {
  res.set("Cache-control", "public, max-age=60");
  next();
});

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
app.use("/social-sharing", socialSharingRouter);
app.use("/webhook", usersRouter);
app.use("/donation-tracker", donationTrackerRouter);

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  next(createError(404));
});

getMonobankClientData()
  .then((jar) => {
    console.log('1 JARRR', jar)
    return createInstagramStoryImage(jar);
  })
  .then(() => {
    console.log('2 JARRR')
    subscribe()
  });

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
