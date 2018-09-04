require('dotenv').config();

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    bluebird = require('bluebird'),
    path = require('path'),
    passport = require('passport'),
    port = process.env.PORT || 3000;

/* Set mongoose  & global to use Bluebird promises */
global.Promise = bluebird;
mongoose.Promise = bluebird;
mongoose.connect(
    process.env.MONGODB_URI
        ? process.env.MONGODB_URI
        : 'mongodb://heroku_kpj537v3:2kb09vf00v7qd9baudppe28l7d@ds227325.mlab.com:27325/heroku_kpj537v3'
);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(passport.initialize());

/* Passport auth config */
require('./api/auth/passport');

/* Routes */
require('./api/routes/login')(app);
require('./api/routes/events')(app);
require('./api/routes/submissions')(app);

/* Models */
require('./api/models/Event');
require('./api/models/Submission');
require('./api/models/User');

app.get('/api/', function(req, res) {
    res.send({
        message: 'Hello from the API'
    });
});

// React config for production
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port);
console.log('Node gavel started at port' + port);
