'use strict';
const status = require('http-status');
const passport = require('passport');
const UserController = require('../controllers/users');

module.exports = function(app) {
    app.get('/api/login/admin', passport.authenticate('admin', { session: false }), success);
    app.post('/api/login/', getUser);
    app.post('/api/signup', createUser);
};

function success(req, res) {
    return res.status(status.OK).send({
        status: 'success'
    });
}

function createUser(req, res) {
    const { username, password, secret } = req.body;

    UserController.createUser(username, password, secret)
        .then(user => {
            return res.status(status.OK).send({
                status: 'success',
                data: user
            });
        })
        .catch(error => {
            let statusCode = null;
            switch (error.message) {
                case 'INVALID_CODE':
                    statusCode = status.BAD_REQUEST;
                    break;
                case 'USERNAME_TAKEN':
                    statusCode = status.FORBIDDEN;
                    break;
                case 'INTERNAL_ERROR':
                    statusCode = status.INTERNAL_SERVER_ERROR;
                    break;
                default:
                    statusCode = status.INTERNAL_SERVER_ERROR;
                    break;
            }
            return res.status(statusCode).send({
                status: 'error',
                message: error.message
            });
        });
}

function getUser(req, res) {
    const { username, password } = req.body;

    UserController.getUser(username, password)
        .then(user => {
            return res.status(status.OK).send({
                status: 'success',
                data: user
            });
        })
        .catch(error => {
            if (error.message === 'INVALID_USERNAME_PASSWORD') {
                return res.status(status.UNAUTHORIZED).send({
                    status: 'error',
                    message: error.message
                });
            }

            return res.status(status.INTERNAL_SERVER_ERROR).send({
                status: 'error',
                message: error.message
            });
        });
}
