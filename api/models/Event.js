"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventName: {
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
  },
  isTechRace: {
    type: Boolean,
    required: true
  },
  participantCount: {
    type: Number,
    required: true
  }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
