const Submission = require('./model');
const _ = require('lodash');
const controller = {};
const moment = require('moment');

const EventController = require('../event/controller');
const ChallengeController = require('../challenge/controller');

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

    const challenge = await ChallengeController.getChallengeById(challengeId);

    if (!challenge) {
        throw new Error('Challenge not found!');
    }

    if (challenge.hasExactAnswer && challenge.answer) {
        const isCorrect = challenge.answer == answer;
        const submission = new Submission({
            event: user.event,
            user: user.username,
            challenge: challengeId,
            answer,
            reviewStatus: isCorrect ? 2 : 3,
            reviewFeedback: isCorrect
                ? 'Automatic grading bot says: correct!'
                : 'Automatic grading bot says: incorrect!'
        });
        return submission.save();
    } else {
        const submission = new Submission({
            event: user.event,
            user: user.username,
            challenge: challengeId,
            answer
        });

        return submission.save();
    }
};

controller.getAllSubmissionsForEvent = event => {
    return Submission.find({ event });
};

controller.reviewSubmission = (submissionId, feedback, status) => {
    return Submission.findById(submissionId).then(submission => {
        submission.reviewFeeback = feedback;
        submission.reviewStatus = status;
        return submission.save();
    });
};

module.exports = controller;
