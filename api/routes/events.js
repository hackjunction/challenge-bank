'use strict';
const status = require('http-status');
const EventController = require('../controllers/events');

module.exports = function(app) {
    app.route('/api/events')
        .post(createEvent)
        .get(getEvents);
};

function getEvents(req, res) {
    return EventController.getEvents(req.body.event)
        .then(events => {
            return res.status(status.OK).send({
                status: 'success',
                data: events
            });
        })
        .catch(error => {
            return res.status(status.INTERNAL_SERVER_ERROR).send({
                status: 'error',
                data: error.message
            });
        });
}

function createEvent(req, res) {
    return EventController.createEvent(req.body.event)
        .then(event => {
            return res.status(status.OK).send({
                status: 'success',
                data: event
            });
        })
        .catch(error => {
            return res.status(status.INTERNAL_SERVER_ERROR).send({
                status: 'error',
                data: error.message
            });
        });
}
