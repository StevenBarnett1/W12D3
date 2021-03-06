const express = require("express");
const morgan = require("morgan");
const { environment } = require('./config');
const app = express();
const tweetsRouter = require("./routes/tweets")
const indexRouter = require("./routes/index")
const userRoter = require("./routes/user")
const cors = require('cors')
app.use(cors({ origin: "http://localhost:4000" }));
app.use(morgan("dev"));
app.use(express.json())
app.use('/tweets',tweetsRouter)
app.use("/users",userRoter)
app.use("/",indexRouter)


// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// Custom error handlers.

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    status:err.status,
    message: err.message,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
