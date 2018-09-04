const mongoose = require('mongoose');
const Promise = require('bluebird');
const Joi = require('joi');
const moment = require('moment-timezone');

const SubmissionController = {
    getSubmissions: () => {
        return mongoose.model('Submission').find({});
    },

    getSubmissionById: submissionId => {
        return mongoose.model('Submission').findById(submissionId);
    },

    createSubmission: (user, data) => {
        data.user = user._id;
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
    },

    getUserSubmissions: user => {
        return mongoose
            .model('Submission')
            .find({
                user: user._id
            })
            .then(submissions => {
                return submissions;
            })
            .catch(error => {
                console.log('ERROR', error);
                throw new Error('Error getting user submissions');
            });
    },

    getUserSubmissionById: (user, submissionId) => {
        return mongoose
            .model('Submission')
            .find({
                user: user._id,
                _id: submissionId
            })
            .then(submission => {
                return submission;
            })
            .catch(error => {
                console.log('ERROR', error);
                throw new Error('Error getting user submission by id');
            });
    }
};

module.exports = SubmissionController;
