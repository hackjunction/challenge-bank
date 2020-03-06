const passport = require("passport");
const HeaderStrategy = require("passport-http-header-strategy").Strategy;
const UserController = require("../modules/user/controller");

//Admin route authentication
passport.use(
  "admin",
  new HeaderStrategy(
    {
      header: "x-access-token",
      passReqToCallback: true
    },
    function(req, token, done) {
      UserController.getUserWithToken(token)
        .then(user => {
          if (!user && !user.admin) {
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

// User token authentication
passport.use(
  "token",
  new HeaderStrategy(
    {
      header: "x-access-token",
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
