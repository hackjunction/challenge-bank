const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const TokenStrategy = require('passport-token').Strategy;
const mongoose = require('mongoose');
const UserController = require('../controllers/users');

//Admin route authentication
passport.use(
    'admin',
    new LocalStrategy(
        {
            usernameField: 'user',
            passwordField: 'pass'
        },
        function(username, password, done) {
            console.log(username);
            console.log(password);
            console.log('CORRECT USER', process.env.ADMIN_USERNAME);
            console.log('CORRECT PASS', process.env.ADMIN_PASSWORD);
            if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
                return done(null, {
                    user: {
                        admin: true
                    }
                });
            } else {
                return done(null, false, { message: 'Invalid admin username or password' });
            }
        }
    )
);

// User token authentication
passport.use(
    'token',
    new LocalStrategy(
        {
            usernameField: 'token',
            passwordField: 'token'
        },
        function(username, token, done) {
            UserController.getUserWithToken(token)
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                })
                .catch(error => {
                    return done(error);
                });
        }
    )
);
