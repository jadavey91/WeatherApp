const express = require("express");
const router = express.Router();

const convertTime = require("../lib/timeconverter");
const getWeatherInfo = require("../lib/weatherinfo");

router.get("/:city/:code", async (req, res) => {
  const city = req.params.city;
  const code = req.params.code;
  let data = await getWeatherInfo(city, code);

  if (data.cod == "404") {
    res.render("weather", { err: "city doesn't exist" });
    return;
  }

  let name = data.name;
  let temp = `${data.main.temp}°C`;
  let feels_like = `${data.main.feels_like}°C`;
  let description = data.weather[0].description;
  let sunRise = `${convertTime(data.sys.sunrise)} (GMT)`;
  let sunSet = `${convertTime(data.sys.sunset)} (GMT)`;
  res.render("weather", {
    name, temp, feels_like, description, sunRise, sunSet,
    listExists: true,
  });
});

router.get("/", (req, res) => {
  res.render("weather");
});

router.post("/", async (req, res) => {
  let location = req.body.city;
  let countryCode = req.body.countryCode;
  let data = await getWeatherInfo(location, countryCode);
  if (data.cod == "404") {
    res.render("weather", {
      err: `The provided location doesn't exist ${location}, ${countryCode}`,
    });
    return;
  }
  let name = data.name;
  let description = data.weather[0].description;
  let temp = `${data.main.temp}°C`;
  let feels_like = `${data.main.feels_like}°C`;
  let sunRise = `${convertTime(data.sys.sunrise)} (GMT)`;
  let sunSet = `${convertTime(data.sys.sunset)} (GMT)`;
  res.render("weather", {
    name, temp, feels_like, description, sunRise, sunSet,
    listExists: true,
  });
});

module.exports = router;
