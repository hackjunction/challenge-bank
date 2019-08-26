const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const HeaderStrategy = require('passport-http-header-strategy').Strategy;
const UserController = require('../modules/user/controller');

//Admin route authentication
passport.use(
    'admin',
    new LocalStrategy(
        {
            usernameField: 'user',
            passwordField: 'pass'
        },
        function(username, password, done) {
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
    new HeaderStrategy(
        {
            header: 'x-access-token',
            passReqToCallback: true
        },
        function(req, token, done) {
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
