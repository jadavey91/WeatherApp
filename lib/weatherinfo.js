const fetch = require("node-fetch");
require("dotenv").config();

const url = `http://api.openweathermap.org/data/2.5/weather?q=Sandbach,uk&units=metric&appid=${process.env.APPID}`;
console.log(url);

const getWeatherInfo = async () => {
  let data = await fetch(url);
  //   console.log(await data.json());
  return await data.json();
};

module.exports = getWeatherInfo;
