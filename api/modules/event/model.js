'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicFieldsPlugin = require('../../common/plugins/publicFields');

const EventSchema = new Schema({
    name: {
        type: String,
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
    secretCode: {
        type: String,
        required: true
    },
    adminSecretCode: {
        type: String,
        required: true
    }
});

/** Public fields: everything but secretCode */
EventSchema.plugin(publicFieldsPlugin, {
    blacklist: ['secretCode', 'adminSecretCode']
});

EventSchema.set('timestamps', true);

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
