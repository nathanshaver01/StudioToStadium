var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
var pgp = require('pg-promise')();
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const session = require('express-session');

// Use session middleware
app.use(session({
    secret: 'howdy',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Serialize the user by storing only the user's ID in the session
passport.serializeUser(function(user, done) {
    done(null, user.user_id);
});

// Deserialize the user by fetching the user's details from the database using the stored ID
passport.deserializeUser(function(user_id, done) {
    db.one('SELECT * FROM users WHERE user_id=$1', [user_id])
        .then(function(user) {
            done(null, user);
        })
        .catch(function(err) {
            done(err);
        });
});

const dbConfig = {
	host: 'mahmud.db.elephantsql.com',
	port: 5432,
	database: 'hidjkctp',
	user: 'hidjkctp',
	password: "a-1VzII_pxhCj07Ho7tt4mrvb8EkNrAC"
};

var db =  pgp(dbConfig);

var users = [];

db.any('SELECT * FROM users')
    .then(function(data) {
        console.log('Users:', data);
        users = data;
    })
    .catch(function(error) {
        console.log('Error:', error);
    });


passport.use(new LocalStrategy(
    function(username, password, done) {
        // Query the database for the user
        db.one('SELECT * FROM users WHERE first_name=$1', [username])
        .then(function(user) {
            // If the user is found, check the password
            if (password === user.password) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        })
        .catch(function(err) {
            // If there's an error, return it
            return done(err);
        });
    }
));
    

app.post('/submit-form', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/about',
        failureRedirect: '/',
        failureFlash: true
    }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/about');
        });
    })(req, res, next);
});

// Render pages
app.get('/', function (req,res) {
    res.render('pages/index');
});

app.get('/about', function (req,res) {
    res.render('pages/about');
});
app.get('/conferences', function (req,res) {
    res.render('pages/conferences');
});

app.get('/about', isLoggedIn, function (req, res) {
    var user_select = 'SELECT * FROM users;'
    db.task('get-everything', task => {
        return task.batch([
            task.any(user_select)
        ]);
    })
    .then(info => {
        console.log("Info:", info[0]);
        console.log('test');
        if (req.isAuthenticated()) {
            res.render('pages/about', {
                users: info[0]
            })
        } else {
            res.render('pages/about', {
                users: null
            })
        }
    })
    .catch(function (err) {
        console.log('error',err);
        res.render('pages/about', {
            users: null
        })
    })
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
app.get('/coachFeed', function (req,res) {
    res.render('pages/coachFeed');

});
app.get('/athlete_profile', function (req,res) {
    res.render('pages/athlete_profile');
});
app.get('/coach_profile', function (req,res) {
    res.render('pages/coach_profile');
});
app.get('/privacy_policy', function (req,res) {
    res.render('pages/privacy_policy');
});

app.get('/terms_and_conditions', function (req,res) {
    res.render('pages/terms_and_conditions');
});

//signup form actions
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/pages/index.ejs");
});
 
/* 
* Notes on Post
* this currently returns undefind for all values, indicating a parsing error
* however, if you delete the res.[...], causing the app to hang on the post
* and then try submitting the data again, it gets parsed and read correctly
*/
app.post('/signup_form', function (req, res) {
    console.log(req.body.first_name);
    console.log(req.body.last_name);
    console.log(req.body.username);
    console.log(req.body.phone_number)
    console.log(req.body.email);
    console.log(req.body.password);
    res.render('pages/athlete_profile')
});

app.listen(3000);
console.log('3000 is the magic port'); 
