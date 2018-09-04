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
            return res.status(status.INTERNAL_SERVER_ERROR).send({
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
            return res.status(status.INTERNAL_SERVER_ERROR).send({
                status: 'error',
                message: error.message
            });
        });
}
