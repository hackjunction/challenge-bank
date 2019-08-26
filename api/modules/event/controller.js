const Event = require('./model');
const controller = {};

controller.findBySecretCode = async secretCode => {
    const event = await Event.findOne({ secretCode });
    if (!event) {
        return Event.findOne({ adminSecretCode: secretCode });
    } else {
        return event;
    }
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
