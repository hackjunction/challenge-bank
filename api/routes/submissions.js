'use strict';
const status = require('http-status');
const SubmissionController = require('../controllers/submissions');

module.exports = function(app) {
    app.route('/api/submissions')
        .get(getSubmissions)
        .post(createSubmission);
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

function createSubmission(req, res) {
    return SubmissionController.createSubmission(req.body.submission)
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
