const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await getAllCategories();
    return res.status(200).json(categories);
});

router.route('/').get(getAllCategories);

module.exports = router;
