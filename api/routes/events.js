'use strict';
const status = require('http-status');
const EventController = require('../controllers/events');

module.exports = function(app) {
    app.route('/api/events')
        .post(createEvent)
        .get(getEvents);

    app.route('/api/events/:id')
        .get(getEvent)
        .patch(updateEvent)
        .delete(deleteEvent);
};

function getEvent(req, res) {
    return EventController.getEvent(req.params.id)
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

function updateEvent(req, res) {
    return EventController.updateEvent(req.body.event)
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

function deleteEvent(req, res) {
    return EventController.deleteEvent(req.params.id)
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
