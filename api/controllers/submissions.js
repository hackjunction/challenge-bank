const mongoose = require('mongoose');
const Promise = require('bluebird');
const Joi = require('joi');
const moment = require('moment-timezone');

const SubmissionController = {
    getSubmissions: () => {
        return mongoose.model('Submission').find({});
    },

    getSubmissionsForEvent: eventId => {
        return mongoose
            .model('Submission')
            .find({
                event: eventId
            })
            .populate('user');
    },

    getSubmissionById: submissionId => {
        return mongoose.model('Submission').findById(submissionId);
    },

    reviewSubmission: (submissionId, decision, feedback) => {
        if ([0, 1, 2, 3].indexOf(decision) === -1) {
            throw new Error('Invalid decision');
        }

        return mongoose
            .model('Submission')
            .findByIdAndUpdate(submissionId, { reviewStatus: decision, reviewFeedback: feedback }, { new: true });
    },

    createSubmission: (user, data) => {
        data.user = user._id;
        data.event = user.event;

        const now = moment().tz(user.event.timezone);
        const startTime = moment(event.platformOpens).tz(event.timezone);
        const endTime = moment(event.platformCloses).tz(event.timezone);

        if (now.isBefore(startTime) || now.isAfter(endTime)) {
            return Promise.reject('Submissions not open');
        }

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
