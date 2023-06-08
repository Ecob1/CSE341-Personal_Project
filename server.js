const dotenv = require("dotenv");
var express = require("express");
var app = express();
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");
const passport = require("passport");
const axios = require("axios");
const session = require("express-session");
const port = process.env.PORT || 3000;
app.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

app.get("/login", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`
  );
});

app.get("/callback", (req, res) => {
  const {code} = req.query;
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  };
  const opts = {headers: {accept: "application/json"}};
  axios
    .post("https://github.com/login/oauth/access_token", body, opts)
    .then((_res) => {
      req.session.token = _res.data.access_token;
      // Log the entire response object to check what's being received      console.log(_res.data);
      return _res.data.access_token;
    })
    .then((token) => {
      console.log("My token:", token);

      res.redirect(`/api-docs`);
    })
    .catch((err) => res.status(500).json({err: err.message}));
});

app.get("/logout", (req, res) => {
  req.session.token = null;
  // add logout fixture later
  // req.session.token = null;
  res.redirect("/api-docs");
});
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
