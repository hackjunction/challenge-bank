'use strict';
const status = require('http-status');
const SubmissionController = require('../controllers/submissions');
const passport = require('passport');

module.exports = function(app) {
    // Requires admin auth
    app.get('/api/admin/submissions', passport.authenticate('admin', { session: false }), getSubmissions);
    app.get('/api/admin/submissions/:id', passport.authenticate('admin', { session: false }), getSubmissionById);

    // Requires token auth
    app.get('/api/user/submissions/', passport.authenticate('token', { session: false }), getUserSubmissions);
    app.get('/api/user/submissions/:id', passport.authenticate('token', { session: false }), getUserSubmissionById);
    app.post('/api/user/submissions', passport.authenticate('token', { session: false }), createSubmission);
};

function getSubmissions(req, res) {
    return SubmissionController.getSubmissions()
        .then(submissions => {
            return res.status(status.OK).send({
                status: 'success',
                data: submissions
            });
        })
        .catch(error => {
            console.log('ERROR', error);
            return res.status(status.INTERNAL_SERVER_ERROR).send({
                status: 'error'
            });
        });
}

function getSubmissionById(req, res) {
    return SubmissionController.getSubmissionById(req.params.id).then(submission => {
        return res
            .status(status.OK)
            .send({
                status: 'success',
                data: submission
            })
            .catch(error => {
                console.log('ERROR', error);
                return res.status(status.INTERNAL_SERVER_ERROR).send({
                    status: 'error'
                });
            });
    });
}

function getUserSubmissions(req, res) {
    return SubmissionController.getUserSubmissions(req.user)
        .then(submissions => {
            return res.status(status.OK).send({
                status: 'success',
                data: submissions
            });
        })
        .catch(error => {
            return res.status(status.INTERNAL_SERVER_ERROR).send({
                status: 'error'
            });
        });
}

function getUserSubmissionById(req, res) {
    return SubmissionController.getUserSubmissionById(req.user, req.params.id)
        .then(submission => {
            return res.status(status.OK).send({
                status: 'success',
                data: submission
            });
        })
        .catch(error => {
            return res.status(status.INTERNAL_SERVER_ERROR).send({
                status: 'error'
            });
        });
}

function createSubmission(req, res) {
    return SubmissionController.createSubmission(req.user, req.body.submission)
        .then(submission => {
            return res.status(status.OK).send({
                status: 'success',
                data: submission
            });
        })
        .catch(error => {
            console.log('ERROR', error);
            return res.status(status.INTERNAL_SERVER_ERROR).send({
                status: 'error'
            });
        });
}
