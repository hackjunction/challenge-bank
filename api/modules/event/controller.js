const Event = require('./model');
const controller = {};

controller.findBySecretCode = secretCode => {
    return Event.findOne({ secretCode });
};

controller.getAllEvents = () => {
    return Event.find({}).then(response => {
        return Event.publicFields(response);
    });
};

controller.getEventById = eventId => {
    return Event.findOne({
        contentful_id: eventId
    });
};

module.exports = controller;
