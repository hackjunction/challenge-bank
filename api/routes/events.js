'use strict';

const status = require('http-status');
const mongoose = require('mongoose');
const Promise = require('bluebird');

const EventController = require('../controllers/events');

module.exports = function(app) {
    app.route('/api/events').post(createEvent);

    // app.route('/api/teams/:teamId')
    //     .get(getTeamById)
    //     .delete(deleteTeamById); // Item.deleteById(req.id).then((item) => {
};

function createEvent(req, res) {
    return EventController.createEvent(req.body.event)
        .then(event => {
            return res.status(status.OK).send({
                status: 'success',
                data: event
            });
        })
        .catch(error => {
            console.log('ERROR', error);
            return res.status(status.INTERNAL_SERVER_ERROR).send({
                status: 'error',
                data: error.message
            });
        });
}
