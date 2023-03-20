var express = require('express');
var app = express();

app.set('view engine', 'ejs');
const ejs = require('ejs');

//const port = process.env.PORT || 5000;

app.get('/', function (req,res) {
    res.render('pages/index');
});
app.get('/conferences', function (req,res) {
    res.render('pages/conferences');
});
app.get('/about', function (req,res) {
    res.render('pages/about');
});
app.get('/coachFeed', function (req,res) {
    res.render('pages/coachFeed');
});
app.get('/athlete_profile', function (req,res) {
    res.render('pages/athlete_profile');
});

app.listen(3000);
console.log('3000 is the magic port');

/*app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); */
