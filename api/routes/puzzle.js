"use strict";
const status = require("http-status");

const words = [
  "foobar",
  "voodoo",
  "moustache",
  "whitehat",
  "hackerman",
  "heckermen",
  "avocado",
  "doublewhopper",
  "volume",
  "legend",
  "fistcake",
  "counter",
  "feature",
  "yogibear",
  "donaldduck",
  "garlic",
  "molecule",
  "remunerate",
  "gradient",
  "restless",
  "eject",
  "reptile",
  "secular",
  "voyage",
  "exception",
  "almost",
  "there",
  "borrow",
  "secretary",
  "ignorant",
  "shaft",
  "gradient",
  "steel",
  "virgin",
  "disappear",
  "refer",
  "progress",
  "grief",
  "tragedy",
  "deck",
  "jackhunction"
];

module.exports = function(app) {
  app.get("/api/banana", function(req, res) {
    return res.status(status.OK).send({
      status: "success",
      current: "/",
      next: "/" + words[0]
    });
  });

  app.get("/api/banana/:word", function(req, res) {
    const { word } = req.params;

    if (words.indexOf(word) === -1) {
      return res.status(status.OK).send({
        status: "success",
        data: {
          current: "/" + word,
          next: "/" + words[0]
        }
      });
    } else if (words.indexOf(word) === words.length - 1) {
      return res.status(status.OK).send({
        status: "success",
        data: {
          current: "/" + word,
          next: null,
          secret: "SUPERSECRETCODE1234"
        }
      });
    } else {
      return res.status(status.OK).send({
        status: "success",
        data: {
          current: "/" + word,
          next: "/" + words[words.indexOf(word) + 1]
        }
      });
    }
  });
};
