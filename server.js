var express = require("express");
var app = express();
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const axios = require("axios");
const port = process.env.PORT || 3000;
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));
app.get("/auth", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});
app.get("/callback", ({query: {code}}, res) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  };
  const opts = {headers: {accept: "application/json"}};
  axios
    .post("https://github.com/login/oauth/access_token", body, opts)
    .then((_res) => {
      console.log(_res.data);
      // Log the entire response object to check what's being received      console.log(_res.data);
      return _res.data.access_token;
    })
    .then((token) => {
      // console.log(_res);
      console.log("My token:", token);

      res.redirect(`/?token=${token}`);
    })
    .catch((err) => res.status(500).json({err: err.message}));
});

app.get("/logout", (req, res) => {
  // add logout ficture later
  // req.session.token = null;
  res.redirect("/");
});
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
