"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  contentful_id: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  color: {
    type: String
  }
});

CategorySchema.set("timestamps", true);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
