const Challenge = require('./model');
const controller = {};

controller.getAllChallenges = () => {
    return Challenge.find({}).then(response => {
        return Challenge.publicFields(response);
    });
};

controller.getAllChallengesAsAdmin = () => {
    return Challenge.find({});
};

controller.getChallengeById = challengeId => {
    return Challenge.findOne({ contentful_id: challengeId });
};

module.exports = controller;
