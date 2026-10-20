const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
//does nothing but it runs first
app.use(bodyParser.urlencoded({ extended: false }));

//runs second
app.use(cookieParser());

app.set("view engine", "pug");

const mainRoutes = require("./routes");
const cardsRoutes = require("./routes/cards");

app.use(mainRoutes);
app.use("/cards", cardsRoutes);

// Runs logging out the console when next is called...
app.use((req, res, next) => {
  console.log("hello");
  const err = new Error("Oh noes!");
  err.status = 500;
  next(err);
});
//...this piece of middleware is executed
app.use((req, res, next) => {
  console.log("world");
  next();
});

app.use((req, res, next) => {
  const err = new Error("Not Found!");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error", err);
});
app.listen(3000, () => {
  console.log("The application is running on localhost:3000 ");
});
