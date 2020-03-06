const _ = require("lodash");
const Promise = require("bluebird");
const Challenge = require("../challenge/model");
const Difficulty = require("../difficulty/model");
const Category = require("../category/model");
const Event = require("../event/model");

const ContentHelpers = {
  parseField: value => {
    if (value.hasOwnProperty("sys")) {
      return value.sys.id;
    } else {
      return value;
    }
  },
  parseEntry: entry => {
    return {
      contentType: entry.sys.contentType.sys.id,
      entryId: entry.sys.id,
      entry: _.reduce(
        Object.keys(entry.fields),
        (res, field) => {
          res[field] = ContentHelpers.parseField(entry.fields[field]["en-US"]);
          return res;
        },
        {}
      )
    };
  },
  parseEntries: entries => {
    return entries.map(entry => ContentHelpers.parseEntry(entry));
  },
  getUpdatesByType: formattedEntries => {
    const updates = {};

    formattedEntries.forEach(entry => {
      const update = {
        updateOne: {
          filter: { contentful_id: entry.entryId },
          update: {
            ...entry.entry,
            contentful_id: entry.entryId
          },
          upsert: true
        }
      };
      if (updates.hasOwnProperty(entry.contentType)) {
        updates[entry.contentType].push(update);
      } else {
        updates[entry.contentType] = [update];
      }
    });

    return updates;
  },
  performUpdatesOfType: (type, updates) => {
    switch (type) {
      case "challenge":
        return Challenge.bulkWrite(updates);
      case "difficulty":
        return Difficulty.bulkWrite(updates);
      case "category":
        return Category.bulkWrite(updates);
      case "event":
        return Event.bulkWrite(updates);
      default:
        throw new Error("Invalid content type for updates");
    }
  },
  performUpdates: entries => {
    const formattedEntries = ContentHelpers.parseEntries(entries);

    const updates = ContentHelpers.getUpdatesByType(formattedEntries);

    const promises = Object.keys(updates).map(type => {
      return ContentHelpers.performUpdatesOfType(type, updates[type]);
    });

    return Promise.all(promises);
  },
  performDeletes: deletedEntries => {
    const deletedIds = deletedEntries.map(entry => entry.sys.id);
    const query = {
      contentful_id: {
        $in: deletedIds
      }
    };

    const promises = [
      Challenge.deleteMany(query),
      Category.deleteMany(query),
      Difficulty.deleteMany(query),
      Event.deleteMany(query)
    ];

    return Promise.all(promises);
  }
};

module.exports = ContentHelpers;
