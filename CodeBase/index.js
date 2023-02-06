const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {//get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});//server responds by sending the index.html file to the client's browser
//the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/collegiate_teams', (req, res) => {//get requests to the profile page ("/profile") will route here
    res.sendFile('collegiate_teams.html', {root: __dirname});//server responds by sending the profile.html file to the client's browser
//the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/settings', (req, res) => {//get requests to the profile page ("/profile") will route here
    res.sendFile('settings.html', {root: __dirname});//server responds by sending the profile.html file to the client's browser
//the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 
