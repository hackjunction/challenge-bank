'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
const Promise = require('bluebird');
const uuid = require('uuid/v4');

const SubmissionSchema = new Schema({
    answer: {
        type: String,
        required: true
    }
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
