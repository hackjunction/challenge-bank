'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');
const Joi = require('joi');
const Promise = require('bluebird');
const uuid = require('uuid/v4');

function momentNow() {
    return moment.tz('Europe/Helsinki').toDate();
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    created: {
        type: Date,
        default: momentNow
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
