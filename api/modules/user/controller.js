const User = require('./model');
const controller = {};

const uuid = require('uuid/v4');
const md5 = require('md5');

controller.findByUsername = username => {
    return User.findOne({ username });
};

controller.createUser = (username, password, eventId, admin = false) => {
    const user = new User({
        username,
        hash: md5(password + process.env.PASSWORD_SALT),
        token: uuid(),
        event: eventId,
        admin
    });

    return user.save();
};

controller.getUserWithPassword = (username, password) => {
    const hash = md5(password + process.env.PASSWORD_SALT);

    return User.findOne({ username, hash });
};

controller.getUserWithToken = token => {
    return User.findOne({ token });
};

module.exports = controller;
