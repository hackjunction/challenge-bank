'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DifficultySchema = new Schema({
    contentful_id: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    value: {
        type: Number
    },
    description: {
        type: String
    },
    pointValue: {
        type: Number
    }
});

DifficultySchema.set('timestamps', true);

const Difficulty = mongoose.model('Difficulty', DifficultySchema);

module.exports = Difficulty;
