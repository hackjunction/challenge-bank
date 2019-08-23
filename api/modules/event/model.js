'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicFieldsPlugin = require('../../common/plugins/publicFields');

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    locationName: {
        type: String,
        required: true
    },
    locationAddress: {
        type: String,
        required: true
    },
    eventStartTime: {
        type: Date,
        required: true
    },
    eventEndTime: {
        type: Date,
        required: true
    },
    platformOpens: {
        type: Date,
        required: true
    },
    platformCloses: {
        type: Date,
        required: true
    },
    timezone: {
        type: String,
        required: true
    },
    secretCode: {
        type: String,
        required: true
    }
});

/** Public fields: everything but secretCode */
EventSchema.plugin(publicFieldsPlugin, {
    blacklist: ['secretCode']
});

EventSchema.set('timestamps', true);

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
