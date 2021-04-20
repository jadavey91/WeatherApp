const express = require("express");
const hbs = require("express-handlebars");
// const getWeather = require("./lib/weather");
const path = require("path");
const getWeatherInfo = require("./lib/weatherinfo");
const convertTime = require("./lib/timeconverter");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);

app.set("view engine", ".hbs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  let data = await getWeatherInfo();
  //   console.log(data);
  let name = data.name;
  let temp = data.main.temp;
  let feels_like = data.main.feels_like;
  let description = data.weather[0].description;
  let sunRise = convertTime(data.sys.sunrise);
  let sunSet = convertTime(data.sys.sunset);
  res.render("index", { name, temp, feels_like, description, sunRise, sunSet });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
