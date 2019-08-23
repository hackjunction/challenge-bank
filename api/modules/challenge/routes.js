const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const ChallengeController = require('./controller');

const getAllChallenges = asyncHandler(async (req, res) => {
    const challenges = await ChallengeController.getAllChallenges();
    return res.status(200).json(challenges);
});

router.route('/').get(getAllChallenges);
module.exports = router;
