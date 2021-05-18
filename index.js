const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");

const indexRouter = require('./routes/indexRouter');
const weatherRouter = require('./routes/weatherRouter');
const errRouter = require('./routes/errRouter');

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
    defaultLayout: "main",
    //Below are defaults, they are here for completeness. Used only if you wanted to change where files are located.
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);

app.set("view engine", ".hbs");
app.use(express.static(path.join(__dirname, "public")));

app.use('/', indexRouter);
app.use('/weather', weatherRouter);
app.use('*', errRouter);

app.get("/about", (req, res) => {
  res.render("about");
});



app.listen(3000, () => {
  console.log("Listening to port 3000");
});
