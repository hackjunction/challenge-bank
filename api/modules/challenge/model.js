'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicFieldsPlugin = require('../../common/plugins/publicFields');

const ChallengeSchema = new Schema({
    contentful_id: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    shortDescription: {
        type: String
    },
    description: {
        type: String
    },
    submissionInstructions: {
        type: String
    },
    exampleSolution: {
        type: String
    },
    difficulty: {
        type: String
    },
    category: {
        type: String
    },
    hasExactAnswer: {
        type: Boolean
    },
    answer: {
        type: String
    },
    gradingInstructions: {
        type: String
    }
});

ChallengeSchema.set('timestamps', true);

/** Public fields: everything except answer */
ChallengeSchema.plugin(publicFieldsPlugin, {
    blacklist: ['answer', 'gradingInstructions']
});

const Challenge = mongoose.model('Challenge', ChallengeSchema);

module.exports = Challenge;
