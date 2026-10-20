const express = require("express");
const router = express.Router();

//then express checks to see if the url matches the route route it doesn't so this is skipped
router.get("/", (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render("index", { name });
  } else {
    res.redirect("/hello");
  }
});
//go to cards.js here ...

//then express checks to see if the url matches the route route it  so this is executed
router.get("/hello", (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect("/");
  } else {
    //Then render is called and the middleware terminates itself
    res.render("hello");
  }
});

router.post("/hello", (req, res) => {
  res.cookie("username", req.body.username);
  console.dir(req.body);
  res.redirect("/");
});
router.post("/goodbye", (req, res) => {
  res.clearCookie("username");
  res.redirect("/hello");
});

module.exports = router;
