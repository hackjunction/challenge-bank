const Difficulty = require('./model');
const controller = {};

controller.getAllDifficulties = () => {
    return Difficulty.find({});
};

module.exports = controller;
