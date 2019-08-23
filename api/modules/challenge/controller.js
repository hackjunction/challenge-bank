const Challenge = require('./model');
const controller = {};

controller.getAllChallenges = () => {
    return Challenge.find({}).then(response => {
        return Challenge.publicFields(response);
    });
};

module.exports = controller;
