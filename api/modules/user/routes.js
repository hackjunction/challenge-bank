const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const UserController = require('./controller');
const EventController = require('../event/controller');

const createUser = asyncHandler(async (req, res) => {
    const event = await EventController.findBySecretCode(req.body.secretCode);
    if (!event) {
        return res.status(404).send({
            message: 'Invalid event code'
        });
    }
    const existingUser = await UserController.findByUsername(req.body.username);
    if (existingUser) {
        return res.status(400).send({
            message: 'Username is already taken'
        });
    }

    const eventId = event.toJSON().contentful_id;

    const user = await UserController.createUser(req.body.username, req.body.password, eventId);
    return res.status(200).send(user);
});

const getUser = asyncHandler(async (req, res) => {
    const user = await UserController.getUserWithPassword(req.query.username, req.query.password);

    if (!user) {
        return res.status(401).send({
            message: 'Username or password is incorrect'
        });
    }

    return res.status(200).send(user);
});

router
    .route('/')
    .get(getUser)
    .post(createUser);

module.exports = router;
