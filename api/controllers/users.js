const mongoose = require('mongoose');
const Promise = require('bluebird');
const Joi = require('joi');
const moment = require('moment-timezone');
const uuid = require('uuid/v4');
const md5 = require('md5');

const UserController = {
    createUser: (username, password, secretCode) => {
        return mongoose
            .model('Event')
            .findOne({
                secretCode
            })
            .then(event => {
                if (!event) {
                    throw new Error('INVALID_CODE');
                }

                return mongoose
                    .model('User')
                    .findOne({ username })
                    .then(user => {
                        if (user) {
                            throw new Error('USERNAME_TAKEN');
                        }

                        const doc = {
                            username: username,
                            hash: md5(password + process.env.PASSWORD_SALT),
                            token: uuid(),
                            event: event._id
                        };

                        return mongoose.model('User').create(doc);
                    });
            })
            .then(user => {
                return mongoose
                    .model('User')
                    .findById(user._id)
                    .populate('event');
            });
    },

    getUser: (username, password) => {
        return mongoose
            .model('User')
            .findOne({
                username: username,
                hash: md5(password + process.env.PASSWORD_SALT)
            })
            .populate('event')
            .then(user => {
                if (!user) {
                    throw new Error('INVALID_USERNAME_PASSWORD');
                }

                return user;
            });
    },

    getUserWithToken: token => {
        return mongoose
            .model('User')
            .findOne({ token })
            .populate('event');
    }
};

module.exports = UserController;
