const Category = require('./model');
const controller = {};

controller.getAllCategories = () => {
    return Category.find({});
};

module.exports = controller;
