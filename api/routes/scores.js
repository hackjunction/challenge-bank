'use strict';
const status = require('http-status');
const passport = require('passport');
const UserController = require('../controllers/users');

const mongoose = require('mongoose');
const _ = require('lodash');
const PointsMap = require('../constants/points');

module.exports = function(app) {
    app.get('/api/event-scores', getScoresForEvents);
    app.get('/api/user-scores', getScoresForUsers);
};

function getScoresForEvents(req, res) {
    return mongoose
        .model('Submission')
        .find({})
        .populate('event')
        .then(submissions => {
            const groupedByEvent = _.groupBy(submissions, 'event._id');
            const maxParticipants = _.maxBy(submissions, 'event.participantCount').event.participantCount;

            console.log('MAX', maxParticipants);

            const eventArray = [];

            _.forOwn(groupedByEvent, (submissions, eventId) => {
                const submissionCount = submissions.length;

                const event = submissions[0].event;

                const points = _.reduce(
                    submissions,
                    (sum, submission) => {
                        return sum + getPointsForSubmission(submission);
                    },
                    0
                );

                eventArray.push({
                    eventId,
                    eventName: event.eventName,
                    submissionCount,
                    weightedPoints: getWeightedScore(points, event.participantCount, maxParticipants)
                });
            });

            return eventArray;
        })
        .then(data => {
            return res.status(status.OK).send({
                status: 'success',
                data: _.reverse(_.sortBy(data, 'weightedPoints'))
            });
        });
}

//How much weight does participant difference have in score?
const SCALE_FACTOR = 0.28;

function getWeightedScore(points, participants, maxParticipants) {
    const ratio = (maxParticipants / participants - 1) * SCALE_FACTOR + 1;

    return Math.floor(10 * ratio * points) / 10;
}

function getScoresForUsers(req, res) {
    return mongoose
        .model('Submission')
        .find({})
        .populate('event user')
        .then(submissions => {
            const groupedByUser = _.groupBy(submissions, 'user._id');

            const userArray = [];

            _.forOwn(groupedByUser, (submissions, userId) => {
                const submissionCount = submissions.length;

                const points = _.reduce(
                    submissions,
                    (sum, submission) => {
                        return sum + getPointsForSubmission(submission);
                    },
                    0
                );

                userArray.push({
                    userId: userId,
                    username: submissions[0].user.username,
                    eventName: submissions[0].event.eventName,
                    submissionCount,
                    points
                });
            });

            return userArray;
        })
        .then(data => {
            return res.status(status.OK).send({
                status: 'success',
                data: _.reverse(_.sortBy(data, 'points'))
            });
        });
}

function getPointsForSubmission(submission) {
    const s = submission.reviewStatus;

    if (s === 0 || s === 1) {
        return 0;
    }

    const p = PointsMap[submission.challengeDifficulty] ? PointsMap[submission.challengeDifficulty] : 0;

    if (s === 2) {
        return p / 2;
    }

    if (s === 3) {
        return p;
    }
}
