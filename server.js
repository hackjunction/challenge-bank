require('dotenv').config();

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    bluebird = require('bluebird'),
    path = require('path'),
    passport = require('passport'),
    port = process.env.PORT || 3000,
    sslRedirect = require('heroku-ssl-redirect');

/* Force SSL Redirect in production */
app.use(sslRedirect(['production'], 301));

/* Set mongoose  & global to use Bluebird promises */
global.Promise = bluebird;
mongoose.Promise = bluebird;
mongoose.connect(
    process.env.MONGODB_URI
        ? process.env.MONGODB_URI
        : 'mongodb://test_user:kymis123@ds227325.mlab.com:27325/heroku_kpj537v3'
);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(passport.initialize());

/* Passport auth config */
require('./api/auth/passport');

/* Routes */
require('./api/modules/routes')(app);

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
console.log('Challenge bank started on port ' + port);
