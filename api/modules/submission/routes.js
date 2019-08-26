const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const passport = require('passport');

const SubmissionsController = require('./controller');

const getSubmissions = asyncHandler(async (req, res) => {
    const submissions = await SubmissionsController.getUserSubmissions(req.user);
    return res.status(200).json(submissions);
});

const getSubmissionsForChallenge = asyncHandler(async (req, res) => {
    const submissions = await SubmissionsController.getUserSubmissionsForChallenge(req.user, req.params.challengeId);
    return res.status(200).json(submissions);
});

const createSubmissionForChallenge = asyncHandler(async (req, res) => {
    try {
        const submission = await SubmissionsController.createSubmission(
            req.user,
            req.params.challengeId,
            req.body.answer
        );
        return res.status(200).json(submission);
    } catch (e) {
        return res.status(403).json({
            message: e.message
        });
    }
});

router.route('/').get(passport.authenticate('token', { session: false }), getSubmissions);

router
    .route('/:challengeId')
    .get(passport.authenticate('token', { session: false }), getSubmissionsForChallenge)
    .post(passport.authenticate('token', { session: false }), createSubmissionForChallenge);

module.exports = router;
