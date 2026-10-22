const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
//does nothing but it runs first
app.use(bodyParser.urlencoded({ extended: false }));

//runs second
app.use("/static", express.static("public"));
app.use(cookieParser());
app.set("view engine", "pug");

const mainRoutes = require("./routes");
const cardsRoutes = require("./routes/cards");

app.use(mainRoutes);
app.use("/cards", cardsRoutes);

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
  res.status(err.status || 500);
  res.render("error", err);
});
app.listen(3000, () => {
  console.log("The application is running on localhost:3000 ");
});
