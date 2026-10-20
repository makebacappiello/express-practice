const express = require("express");
const router = express.Router();
const { data } = require("../data/flashCardData.json");
const { cards } = data;

//...(from index.js)...then express checks to see if the url matches the route route it doesn't so this is skipped also
router.get("/", (req, res) => {
  res.render("cards", {
    prompt: cards[0].question,
    hint: cards[0].hint,
  });
});

module.exports = router;
