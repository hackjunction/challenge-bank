const mongoose = require('mongoose');
const Promise = require('bluebird');
const Joi = require('joi');
const moment = require('moment-timezone');

const SubmissionController = {
    getSubmissions: () => {
        return mongoose.model('Submission').find({});
    },

    createSubmission: data => {
        return mongoose
            .model('Submission')
            .create(data)
            .then(submission => {
                return submission;
            })
            .catch(error => {
                console.log('ERROR', error);
                throw new Error('Submission failed, please try again later');
            });
    }
};

module.exports = SubmissionController;
