const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const DifficultyController = require('./controller');

const getAllDifficulties = asyncHandler(async (req, res) => {
    const difficulties = await DifficultyController.getAllDifficulties();
    return res.status(200).json(difficulties);
});

router.route('/').get(getAllDifficulties);

module.exports = router;
