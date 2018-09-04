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
                    throw new Error('Code ' + secretCode + ' does not match any events');
                }

                const doc = {
                    username: username,
                    hash: md5(password + process.env.PASSWORD_SALT),
                    token: uuid(),
                    event: event._id
                };

                return mongoose.model('User').create(doc);
            })
            .catch(error => {
                console.log('ERROR', error);
                throw new Error('Oops, something went wrong... Please try again later.');
            });
    },

    getUser: (username, password) => {
        return mongoose
            .model('User')
            .findOne({
                username: username,
                hash: md5(password + process.env.PASSWORD_SALT)
            })
            .then(user => {
                if (!user) {
                    throw new Error('Invalid username or password');
                }

                return user;
            })
            .catch(error => {
                console.log('ERROR', error);
                throw new Error('Oops, something went wrong... Please try again later');
            });
    },

    getUserWithToken: token => {
        return mongoose.model('User').findOne({ token });
    }
};

module.exports = UserController;
