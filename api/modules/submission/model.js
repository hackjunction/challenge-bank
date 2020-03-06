"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
  answer: {
    type: String,
    required: true
  },
  challenge: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  reviewStatus: {
    type: Number,
    default: 0
  },
  reviewFeedback: {
    type: String,
    default: ""
  }
});

SubmissionSchema.set("timestamps", true);

const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = Submission;
