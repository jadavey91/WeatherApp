const express = require('express');
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs({
    extname : 'hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req,res)=>{
    res.render('index');
});

app.get('/about', (req,res)=>{
    res.render('about');
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
});