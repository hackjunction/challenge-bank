const mongoose = require('mongoose');
const Promise = require('bluebird');
const Joi = require('joi');
const moment = require('moment-timezone');

const EventController = {
    createEvent: eventData => {
        console.log('Event data', eventData);

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

        const schema = Joi.object().keys({
            eventName: Joi.string()
                .min(3)
                .max(30)
                .required(),
            locationName: Joi.string()
                .min(3)
                .max(50)
                .required(),
            locationAddress: Joi.string()
                .min(3)
                .max(100)
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
                .required()
        });

        return schema
            .validate(eventData)
            .then(validatedData => {
                return mongoose
                    .model('Event')
                    .create(eventData)
                    .then(event => {
                        return event;
                    })
                    .catch(error => {
                        console.log('ERROR', error);
                        throw new Error('Event creation failed, please try again later');
                    });
            })
            .catch(error => {
                console.log('JOI ERROR', error);
                throw new Error('Event validation failed');
            });
    }
};

module.exports = EventController;
