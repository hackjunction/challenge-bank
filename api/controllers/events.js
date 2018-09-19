const mongoose = require('mongoose');
const Promise = require('bluebird');
const Joi = require('joi');
const moment = require('moment-timezone');

const EventController = {
    validate: eventData => {
        if (!eventData.timezone) {
            return Promise.reject('Timezone is required');
        }

        const startTime = moment.tz(eventData.eventStartTime, eventData.timezone);
        const endTime = moment.tz(eventData.eventEndTime, eventData.timezone);
        const platformOpens = moment.tz(eventData.platformOpens, eventData.timezone);
        const platformCloses = moment.tz(eventData.platformCloses, eventData.timezone);

        if (endTime.isBefore(startTime)) {
            return Promise.reject('Event end time must be later than start time');
        }

        if (platformCloses.isBefore(platformOpens)) {
            return Promise.reject('Platform closing time must be after opening time');
        }

        if (platformOpens.isBefore(startTime)) {
            return Promise.reject('Challenge platform cannot open before the event starts');
        }

        if (platformCloses.isAfter(endTime)) {
            return Promise.reject('Challenge platform must close before the event ends');
        }

        eventData.eventStartTime = startTime.toISOString();
        eventData.eventEndTime = endTime.toISOString();
        eventData.platformOpens = platformOpens.toISOString();
        eventData.platformCloses = platformCloses.toISOString();

        console.log('EVENT DATA', eventData);

        const schema = Joi.object().keys({
            eventName: Joi.string()
                .min(3)
                .max(30)
                .required(),
            locationName: Joi.string()
                .min(3)
                .max(100)
                .required(),
            locationAddress: Joi.string()
                .min(3)
                .max(200)
                .required(),
            eventStartTime: Joi.date()
                .iso()
                .required(),
            eventEndTime: Joi.date()
                .iso()
                .required(),
            platformOpens: Joi.date()
                .iso()
                .required(),
            platformCloses: Joi.date()
                .iso()
                .required(),
            timezone: Joi.string().required(),
            secretCode: Joi.string()
                .alphanum()
                .min(8)
                .max(20)
                .required(),
            participantCount: Joi.number().required(),
            isTechRace: Joi.boolean().required()
        });

        return schema.validate(eventData);
    },

    createEvent: eventData => {
        return EventController.validate(eventData)
            .then(validatedData => {
                return mongoose
                    .model('Event')
                    .create(validatedData)
                    .then(event => {
                        return event;
                    })
                    .catch(error => {
                        console.log('ERROR', error);
                        throw new Error('Event creation failed, please try again later');
                    });
            })
            .catch(error => {
                console.log('ERROR', error);
                throw new Error('Event validation failed');
            });
    },

    updateEvent: (eventData, eventId) => {
        return EventController.validate(eventData)
            .then(validatedData => {
                return mongoose
                    .model('Event')
                    .findByIdAndUpdate(eventId, { $set: validatedData }, { new: true })
                    .then(event => {
                        return event;
                    })
                    .catch(error => {
                        console.log('ERROR', error);
                        throw new Error(
                            'An unexpected error occurred while updating the event, please try again later'
                        );
                    });
            })
            .catch(error => {
                console.log('ERROR', error);
                throw new Error('Event validation failed');
            });
    },

    deleteEvent: id => {
        return mongoose
            .model('Event')
            .findByIdAndRemove(id)
            .then(event => {
                return event;
            })
            .catch(error => {
                console.log('ERROR', error);
                throw new Error('An unexpected error occurred while deleting the event, please try again later');
            });
    },

    getEvents: () => {
        return mongoose
            .model('Event')
            .find({})
            .then(events => {
                return events;
            })
            .catch(error => {
                console.log('ERROR', error);
                throw new Error('An unexpected error occurred while getting events, please try again later');
            });
    },

    getEvent: id => {
        return mongoose
            .model('Event')
            .findById(id)
            .then(event => {
                if (!event) {
                    throw new Error('An event with id ' + id + ' was not found');
                }
                return event;
            })
            .catch(error => {
                console.log('ERROR', error);
                throw new Error('An unexpected error occurred while getting the event, please try again later');
            });
    },

    getEventsPublic: () => {
        return mongoose
            .model('Event')
            .find({})
            .select('-secretCode')
            .then(events => {
                return events;
            })
            .catch(error => {
                console.log('ERROR', error);
                throw new Error('An unexpected error occurred while getting events, please try again later');
            });
    },

    getEventPublic: id => {
        return mongoose
            .model('Event')
            .findById(id)
            .select('-secretCode')
            .then(event => {
                if (!event) {
                    throw new Error('An event with id ' + id + ' was not found');
                }
                return event;
            })
            .catch(error => {
                console.log('ERROR', error);
                throw new Error('An unexpected error occurred while getting the event, please try again later');
            });
    }
};

module.exports = EventController;
