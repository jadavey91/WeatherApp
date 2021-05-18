const fetch = require("node-fetch");
require("dotenv").config();

const getWeatherInfo = async (city, countryCode) => {
  let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${process.env.APPID}`);
  //   console.log(await data.json());
  return await data.json();
};

module.exports = getWeatherInfo;
