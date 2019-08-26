const Submission = require('./model');
const _ = require('lodash');
const controller = {};
const moment = require('moment');

const EventController = require('../event/controller');

controller.getUserSubmissions = user => {
    return Submission.find({
        user: user.username
    });
};

controller.getSubmissionsForChallenge = (user, challengeId) => {
    return Submission.find({
        user: user.username,
        challenge: challengeId
    });
};

controller.getActiveSubmissionForChallenge = (user, challengeId) => {
    return controller.getSubmissionsForChallenge(user, challengeId).then(submissions => {
        return _.find(submissions, submission => {
            return submission.reviewStatus === 0;
        });
    });
};

controller.createSubmission = async (user, challengeId, answer) => {
    const activeSubmission = await controller.getActiveSubmissionForChallenge(user, challengeId);

    if (activeSubmission) {
        throw new Error('You already have a submission pending review for this challenge');
    }

    const event = await EventController.getEventById(user.event);

    if (!event) {
        throw new Error('Unknown error');
    }

    if (!moment().isBetween(event.platformOpens, event.platformCloses)) {
        throw new Error('Submissions for this event are not open');
    }

    const submission = new Submission({
        event: user.event,
        user: user.username,
        challenge: challengeId,
        answer
    });

    return submission.save();
};

module.exports = controller;
