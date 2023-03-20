var express = require('express');
var app = express();

app.set('view engine', 'ejs');
const ejs = require('ejs');






//const port = process.env.PORT || 5000;

app.get('/', function (req,res) {
    res.render('pages/index');
});
app.get('/collegiate_teams', function (req,res) {
    res.render('pages/collegiate_teams');
});
app.get('/settings', function (req,res) {
    res.render('pages/settings');
});
app.get('/coachFeed', function (req,res) {
    res.render('pages/coachFeed');
});

app.listen(3000);
console.log('3000 is the magic port');

/*app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); */
