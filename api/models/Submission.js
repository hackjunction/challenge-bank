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

const SubmissionSchema = new Schema({
    answer: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: momentNow
    },
    challengeId: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewed: {
        type: Boolean,
        default: false
    },
    accepted: {
        type: Boolean,
        default: false
    }
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
