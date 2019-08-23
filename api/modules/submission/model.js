'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
    answer: {
        type: String,
        required: true
    },
    challengeId: {
        type: String,
        required: true
    },
    challengeDifficulty: {
        type: Number,
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewStatus: {
        type: Number,
        default: 0
    },
    reviewFeedback: {
        type: String,
        default: ''
    }
});

SubmissionSchema.set('timestamps', true);

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
