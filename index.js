const express = require('express');
const hbs = require('express-handlebars');
const getWeather = require('./lib/weather');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', hbs({
    extname : 'hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req,res)=>{
    let data = getWeather();
    res.render('index', {data});
});

app.get('/about', (req,res)=>{
    res.render('about');
});

app.get("*", (req,res) => {
    res.render("404");
})

app.listen(3000, () => {
    console.log("Listening to port 3000");
});

