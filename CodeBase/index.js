var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
const ejs = require('ejs');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
var pgp = require('pg-promise')();

const dbConfig = {
	host: 'mahmud.db.elephantsql.com',
	port: 5432,
	database: 'hidjkctp',
	user: 'hidjkctp',
	password: "a-1VzII_pxhCj07Ho7tt4mrvb8EkNrAC"
};

var db =  pgp(dbConfig);

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

/* TODO:

Login/Register: Login functionality, Stripe
Settings: Create page, allow user to:
                1. Delete Account
                2. If coach: unhide dancers, unfavorite dancers
                3.Change email
                4. Change payment info (3rd party link)
Explore Feed: Create dancer 'cards' dynamically. Fill each with user info and generate them uniform on same page. 
                1.   Allow for multi-page functionality (Max out how many cards can be on a page)
                2.   Hide This Dancer Feature
                3.   Favorite (and unfavorite) Functionality
                4.   Implement Filtering
                5.   Implement Sorting
                6.   Implement Searching
    Dancer Profile: Create Profile Page Template, 
                1. Dynamically Generate w/ info based on dancer coach clicks on (from feed) OR dancer that is logged in
                2. Allow dancer to edit entire page and save
                3. Allow dancer to view in 'preview mode' (same as coach mode)
Coach Profile: Need to ask Abbey if this is an expectation.
            ???

Other:
    Logout Button
    Show proper navbars based on role.


*/