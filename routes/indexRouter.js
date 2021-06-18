const express = require("express");
const router = express.Router();

const convertTime = require("../lib/timeconverter");
const getWeatherInfo = require("../lib/weatherinfo");

router.get("/", async (req, res) => {
  let data = await getWeatherInfo("Sandbach", "UK");
  //   console.log(data);
  let name = data.name;
  let temp = Math.round(data.main.temp);
  let feels_like = Math.round(data.main.feels_like);
  let description = data.weather[0].description;
  let descriptionIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let minTemp = Math.round(data.main.temp_min);
  let maxTemp = Math.round(data.main.temp_max);
  let sunRise = convertTime(data.sys.sunrise);
  let sunSet = convertTime(data.sys.sunset);
  res.render("index", {
    name,
    temp,
    feels_like,
    description,
    descriptionIcon,
    minTemp,
    maxTemp,
    sunRise,
    sunSet,
  });
});

module.exports = router;
