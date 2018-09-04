'use strict';
const status = require('http-status');
const EventController = require('../controllers/events');
const passport = require('passport');

module.exports = function(app) {
    //Admin routes for getting all event data
    app.get('/api/admin/events', passport.authenticate('admin', { session: false }), getEvents);
    app.get('/api/admin/events/:id', passport.authenticate('admin', { session: false }), getEvent);
    app.post('/api/admin/events', passport.authenticate('admin', { session: false }), createEvent);
    app.patch('/api/admin/events/:id', passport.authenticate('admin', { session: false }), updateEvent);
    app.delete('/api/admin/events/:id', passport.authenticate('admin', { session: false }), deleteEvent);

    //Public routes with no authentication
    app.get('/api/events', getEventsPublic);
    app.get('/api/events/:id', getEventPublic);
};

function getEventsPublic(req, res) {
    return EventController.getEventsPublic()
        .then(events => {
            return res.status(status.OK).send({
                status: 'success',
                data: events
            });
        })
        .catch(error => {
            return res.status(status.INTERNAL_SERVER_ERROR).send({
                status: 'error'
            });
        });
}

function getEventPublic(req, res) {
    return EventController.getEventPublic(req.params.id)
        .then(event => {
            return res.status(status.OK).send({
                status: 'success',
                data: event
            });
        })
        .catch(error => {
            return res.status(status.INTERNAL_SERVER_ERROR).send({
                status: 'error'
            });
        });
}

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
