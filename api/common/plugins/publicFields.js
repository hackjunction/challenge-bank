const _ = require('lodash');

/**
 * Adds a new static method, getPublic, which returns only a subset of fields on the document.
 * If 'whitelist' is defined, 'blacklist' is ignored.
 *
 * Usage: MySchema.plugin(publicFieldsPlugin, {
 *   whitelist: ['userId', 'avatar', 'firstName', 'lastName', 'email']
 * });
 *
 * OR
 *
 * Usage: MySchema.plugin(publicFieldsPlugin, {
 *   blacklist: ['secret']
 * });
 */

function publicFieldsPlugin(schema, { whitelist = [], blacklist = [] } = {}) {
    schema.statics.publicFields = function(docs) {
        if (whitelist.length > 0) {
            if (Array.isArray(docs)) {
                return docs.map(doc => {
                    return _.pick(doc.toJSON(), whitelist);
                });
            }
            return _.pick(docs.toJSON(), whitelist);
        } else {
            if (Array.isArray(docs)) {
                return docs.map(doc => {
                    return _.omit(doc.toJSON(), blacklist);
                });
            }
            return _.omit(docs.toJSON(), blacklist);
        }
    };
}

module.exports = publicFieldsPlugin;
