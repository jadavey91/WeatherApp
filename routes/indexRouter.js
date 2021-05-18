const express = require('express');
const router = express.Router();

const convertTime = require("../lib/timeconverter");
const getWeatherInfo = require("../lib/weatherinfo");


router.get("/", async (req, res) => {
    let data = await getWeatherInfo("Sandbach", "UK");
    //   console.log(data);
    let name = data.name;
    let temp = data.main.temp;
    let feels_like = data.main.feels_like;
    let description = data.weather[0].description;
    let sunRise = convertTime(data.sys.sunrise);
    let sunSet = convertTime(data.sys.sunset);
    res.render("index", { name, temp, feels_like, description, sunRise, sunSet });
  });

  module.exports = router;